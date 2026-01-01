'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                            About PrintEasy
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            PrintEasy is revolutionizing the printing industry by connecting users with nearby xerox shops
                            for instant, secure document printing.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h2 className="font-display text-2xl font-bold mb-3">Our Mission</h2>
                                <p className="text-muted-foreground">
                                    To make printing as easy as a few clicks, eliminating the hassle of finding reliable
                                    printing services and ensuring your documents are handled securely.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-display text-2xl font-bold mb-3">Security & Privacy</h2>
                                <p className="text-muted-foreground mb-4">
                                    Your privacy is our top priority. All uploaded documents are:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Encrypted during transmission</li>
                                    <li>Stored securely in our database</li>
                                    <li>Automatically deleted after 16 hours</li>
                                    <li>Never shared with third parties</li>
                                </ul>
                            </div>

                            <div className="pt-6">
                                <Link href="/">
                                    <Button variant="default">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
