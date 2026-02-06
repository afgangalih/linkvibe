import { useState, useRef } from "react";
import { Camera, Loader2, User, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

import { ConfirmModal } from "@/components/ui/confirm-modal";

interface AvatarUploadProps {
    avatarUrl?: string | null;
    onUploadComplete: (url: string | null) => void;
}

export function AvatarUpload({ avatarUrl, onUploadComplete }: AvatarUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB
            alert("File size must be less than 2MB.");
            return;
        }

        setIsUploading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user logged in");

            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}/${Date.now()}.${fileExt}`;

            // Upload
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file, { upsert: true });

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            onUploadComplete(publicUrl);

            // Also update profile immediately in DB to enforce consistent state
             await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);

        } catch (error) {
            console.error("Upload Error:", error);
            alert("Failed to upload avatar.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (avatarUrl) setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
             const { data: { user } } = await supabase.auth.getUser();
             if (!user) return;

             // 1. Try to delete from storage (Safe Fail)
             if (avatarUrl) {
                 try {
                     // Extract path from URL: .../avatars/USER_ID/FILENAME
                     const path = avatarUrl.split('/avatars/')[1];
                     if (path) {
                         const { error: storageError } = await supabase.storage
                            .from('avatars')
                            .remove([path]);
                         
                         if (storageError) {
                             console.warn("Storage delete failed (non-blocking):", storageError.message);
                         }
                     }
                 } catch (err) {
                     console.warn("Storage path parsing failed:", err);
                 }
             }
             
             // 2. Clear from Database (Always proceed)
             await supabase.from('profiles').update({ avatar_url: null }).eq('id', user.id);
             
             // 3. Update State
             onUploadComplete(null);
             setShowDeleteModal(false);

        } catch (error) {
             console.error("Remove Error:", error);
             alert("Failed to remove avatar. Please try again.");
        } finally {
             setIsDeleting(false);
        }
    };

    return (
        <div className="flex justify-center mb-6">
            <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div 
                    className="w-24 h-24 rounded-full border-2 border-zinc-800 overflow-hidden bg-zinc-900 relative"
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {avatarUrl ? (
                        <img 
                            src={avatarUrl} 
                            alt="Avatar" 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600">
                            <User className="w-8 h-8" />
                        </div>
                    )}

                    {/* Loading Overlay */}
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <AnimatePresence>
                        {isHovered && !isUploading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 gap-2"
                            >
                                <Camera className="w-5 h-5 text-white/80" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                {/* Remove Button - Positioned absolute relative to the group */}
                <AnimatePresence>
                     {isHovered && avatarUrl && !isUploading && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8, x: 10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: 10 }}
                            onClick={handleRemoveClick}
                            className="absolute -right-2 top-0 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 p-1.5 rounded-full backdrop-blur-sm transition-colors"
                            title="Remove Avatar"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </motion.button>
                     )}
                </AnimatePresence>

                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                />
            </div>

            <ConfirmModal 
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Remove Avatar"
                description="Are you sure you want to remove your profile picture? This action cannot be undone."
                confirmText="Remove"
                isDestructive
                isLoading={isDeleting}
            />
        </div>
    );
}
