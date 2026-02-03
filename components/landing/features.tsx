import { Component, Palette, Smartphone, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
    {
        title: "Drag & Drop Editor",
        description: "Reorder your links effortlessly with our intuitive editor.",
        icon: Component,
    },
    {
        title: "Live Mobile Preview",
        description: "See your changes instantly on a mock mobile device.",
        icon: Smartphone,
    },
    {
        title: "Custom Themes",
        description: "Personalize your page with darker, premium themes.",
        icon: Palette,
    },
    {
        title: "Fast Performance",
        description: "Built on Next.js for lightning-fast load times.",
        icon: Zap,
    },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                Designed for Professionals
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
                Everything you need to showcase your content, without the clutter.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
                <Card key={index} className="bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition-colors duration-300">
                    <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center mb-4 text-blue-500 border border-zinc-800">
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl text-white font-medium">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-zinc-500">{feature.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
