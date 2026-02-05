import { 
    Globe, Github, Youtube, Twitter, Instagram, Facebook, Linkedin, 
    Mail, Link as LinkIcon, Download, ShoppingBag, Music, Video, 
    Camera, Book, Calendar, MapPin, Phone, Star, Heart, User, 
    Briefcase, Code, Coffee, Image, FileText, Smartphone, Laptop 
} from "lucide-react";

export const iconMap: Record<string, any> = {
    "Globe": Globe,
    "Website": Globe,
    "Github": Github,
    "GitHub": Github,
    "Youtube": Youtube,
    "YouTube": Youtube,
    "Twitter": Twitter,
    "X": Twitter,
    "Instagram": Instagram,
    "Facebook": Facebook,
    "Linkedin": Linkedin,
    "LinkedIn": Linkedin,
    "Email": Mail,
    "Mail": Mail,
    "Contact": Mail,
    "Link": LinkIcon,
    "Download": Download,
    "Store": ShoppingBag,
    "Shop": ShoppingBag,
    "Music": Music,
    "Spotify": Music,
    "Soundcloud": Music,
    "Video": Video,
    "Twitch": Video,
    "Camera": Camera,
    "Photo": Camera,
    "Portfolio": Image,
    "Book": Book,
    "Blog": FileText,
    "Article": FileText,
    "Calendar": Calendar,
    "Booking": Calendar,
    "Location": MapPin,
    "Map": MapPin,
    "Phone": Phone,
    "Call": Phone,
    "Star": Star,
    "Heart": Heart,
    "User": User,
    "About": User,
    "Work": Briefcase,
    "Code": Code,
    "Dev": Code,
    "Coffee": Coffee,
    "Support": Heart,
    "App": Smartphone,
    "Tech": Laptop
};

export const getIcon = (name: string) => {
    // Try direct match
    if (iconMap[name]) return iconMap[name];
    
    // Try case-insensitive
    const lowerName = name.toLowerCase();
    const key = Object.keys(iconMap).find(k => k.toLowerCase() === lowerName);
    if (key) return iconMap[key];

    // Default
    return null;
};
