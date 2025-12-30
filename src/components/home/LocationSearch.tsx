import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Loader2 } from "lucide-react";

interface LocationSearchProps {
  onLocationFetched: (location: string) => void;
  onSearch: (query: string) => void;
}

export const LocationSearch = ({ onLocationFetched, onSearch }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  const fetchLocation = async () => {
    setIsLoading(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // Simulate reverse geocoding
            const locationName = "Koramangala, Bangalore";
            setLocation(locationName);
            onLocationFetched(locationName);
            setIsLoading(false);
          },
          () => {
            setLocation("Location access denied");
            setIsLoading(false);
          }
        );
      }
    } catch {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass rounded-2xl p-2 shadow-elevated">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Location Button */}
          <Button
            variant="heroOutline"
            size="lg"
            onClick={fetchLocation}
            disabled={isLoading}
            className="flex-shrink-0 bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <MapPin className="w-5 h-5" />
            )}
            {location || "Fetch Location"}
          </Button>

          {/* Search Input */}
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for xerox shops near you..."
                className="w-full h-14 pl-12 pr-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>
            <Button
              variant="hero"
              size="lg"
              onClick={handleSearch}
              className="flex-shrink-0 px-8"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
