'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, Clock, Zap } from 'lucide-react';

const mockShops = [
    {
        id: 1,
        name: "Quick Print Hub",
        address: "123 MG Road, Koramangala",
        distance: "0.8 km",
        rating: 4.8,
        isOpen: true,
        isHighTraffic: false,
        estimatedTime: "5-10 min",
    },
    {
        id: 2,
        name: "Rapid Xerox Center",
        address: "456 Brigade Road, Near Metro",
        distance: "1.2 km",
        rating: 4.5,
        isOpen: true,
        isHighTraffic: true,
        estimatedTime: "15-20 min",
    },
];

export default function HomePage() {
    const [showShops, setShowShops] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/5 to-transparent rounded-full" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                    <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8 animate-fade-in">
                            <Zap className="w-4 h-4 text-accent" />
                            <span className="text-white/90 text-sm font-medium">Fast & Reliable Printing</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in stagger-1">
                            <span className="text-3d">Printing should be</span>
                            <br />
                            <span className="text-3d">boring.</span>{" "}
                            <span className="text-accent">It isn&apos;t.</span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl md:text-2xl text-white/70 mb-10 animate-fade-in stagger-2">
                            So we fixed the boring part.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                            <Link href="/shops">
                                <Button variant="hero" size="lg">
                                    Find Nearby Shops
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/upload">
                                <Button variant="heroOutline" size="lg">
                                    Upload Documents
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/60 text-sm animate-fade-in stagger-4">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-accent" />
                                <span>Secure Documents</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-accent" />
                                <span>5-Min Printing</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-accent" />
                                <span>100+ Partner Shops</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle">
                    <span className="text-white/40 text-sm">Scroll to explore</span>
                    <ChevronRight className="w-5 h-5 text-white/40 rotate-90" />
                </div>
            </section>

            {/* Security Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                            Are my documents stored & handled securely?
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            Your documents are automatically deleted from our servers within 16 hours after upload.
                            We use end-to-end encryption and never store your files longer than necessary.
                        </p>
                        <Link href="/about">
                            <Button variant="outline">
                                Learn More About Security
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t border-border">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>© 2026 PrintEasy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
