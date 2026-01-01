'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function EnterprisePage() {
    return (
        <div className="min-h-screen bg-background">
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Enterprise Solutions
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8">
                            Scalable printing solutions for businesses of all sizes.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h2 className="font-display text-2xl font-bold mb-3">Features</h2>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Bulk printing capabilities</li>
                                    <li>Dedicated account manager</li>
                                    <li>Custom pricing plans</li>
                                    <li>Priority support</li>
                                    <li>Advanced security features</li>
                                </ul>
                            </div>

                            <div className="pt-6">
                                <Link href="/">
                                    <Button variant="default">
                                        Contact Sales
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
