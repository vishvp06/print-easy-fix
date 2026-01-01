'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { getShops } from '@/lib/api';
import { toast } from 'sonner';

export default function ShopsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [shops, setShops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const data = await getShops();
                setShops(data);
            } catch (error) {
                toast.error('Failed to fetch shops');
            } finally {
                setIsLoading(false);
            }
        };
        fetchShops();
    }, []);

    const filteredShops = shops.filter(
        (shop) =>
            shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shop.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                            Find Xerox Shops
                        </h1>
                        <p className="text-muted-foreground">
                            Discover nearby printing shops with real-time availability
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name or location..."
                                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                        </div>
                        <Button variant="default" className="gap-2 h-12">
                            <MapPin className="w-4 h-4" />
                            Use My Location
                        </Button>
                    </div>

                    {/* Results */}
                    <div className="mb-4 text-muted-foreground">
                        {filteredShops.length} shops found
                    </div>

                    {isLoading ? (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground">Loading shops...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                            {filteredShops.map((shop) => (
                                <div
                                    key={shop.id}
                                    className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all"
                                >
                                    <h3 className="font-semibold text-lg mb-2">{shop.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{shop.address}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">{shop.distance}</span>
                                        <Link href={`/upload?shop=${shop.id}`}>
                                            <Button size="sm">Select Shop</Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {filteredShops.length === 0 && !isLoading && (
                        <div className="text-center py-16">
                            <p className="text-muted-foreground text-lg mb-4">
                                No shops found matching your search
                            </p>
                            <Button variant="outline" onClick={() => setSearchQuery('')}>
                                Clear Search
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
