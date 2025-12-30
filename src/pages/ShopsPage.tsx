import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShopCard } from "@/components/home/ShopCard";
import { Button } from "@/components/ui/button";
import { Search, Filter, MapPin, SlidersHorizontal } from "lucide-react";

const allShops = [
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
  {
    id: 3,
    name: "PrintEasy Solutions",
    address: "789 Indiranagar, 12th Main",
    distance: "1.5 km",
    rating: 4.7,
    isOpen: true,
    isHighTraffic: false,
    estimatedTime: "8-12 min",
  },
  {
    id: 4,
    name: "CopyWorld Express",
    address: "321 HSR Layout, Sector 7",
    distance: "2.0 km",
    rating: 4.3,
    isOpen: false,
    isHighTraffic: false,
    estimatedTime: "Closed",
  },
  {
    id: 5,
    name: "DocuPrint Pro",
    address: "555 Whitefield, ITPL Road",
    distance: "2.5 km",
    rating: 4.9,
    isOpen: true,
    isHighTraffic: false,
    estimatedTime: "10-15 min",
  },
  {
    id: 6,
    name: "Swift Print Station",
    address: "888 Electronic City, Phase 1",
    distance: "3.0 km",
    rating: 4.6,
    isOpen: true,
    isHighTraffic: true,
    estimatedTime: "20-25 min",
  },
];

const ShopsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredShops = allShops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

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

          {/* Search & Filter Bar */}
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
            <Button
              variant="outline"
              className="gap-2 h-12"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="default" className="gap-2 h-12">
              <MapPin className="w-4 h-4" />
              Use My Location
            </Button>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="bg-card rounded-xl border border-border p-6 mb-8 animate-fade-in">
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Distance
                  </label>
                  <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                    <option>Within 1 km</option>
                    <option>Within 2 km</option>
                    <option>Within 5 km</option>
                    <option>Any distance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Rating
                  </label>
                  <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                    <option>4+ Stars</option>
                    <option>3+ Stars</option>
                    <option>Any rating</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Availability
                  </label>
                  <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                    <option>Open Now</option>
                    <option>Low Traffic</option>
                    <option>Any</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sort By
                  </label>
                  <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                    <option>Nearest First</option>
                    <option>Highest Rated</option>
                    <option>Fastest Service</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mb-4 text-muted-foreground">
            {filteredShops.length} shops found
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                {...shop}
                onSelect={() => navigate(`/upload?shop=${shop.id}`)}
              />
            ))}
          </div>

          {filteredShops.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">
                No shops found matching your search
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShopsPage;
