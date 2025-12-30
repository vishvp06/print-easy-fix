import { MapPin, Star, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShopCardProps {
  name: string;
  address: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  isHighTraffic?: boolean;
  estimatedTime: string;
  onSelect: () => void;
}

export const ShopCard = ({
  name,
  address,
  distance,
  rating,
  isOpen,
  isHighTraffic,
  estimatedTime,
  onSelect,
}: ShopCardProps) => {
  return (
    <div className="group bg-card rounded-2xl border border-border p-5 card-hover shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            {isHighTraffic && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-destructive/10 text-destructive animate-pulse">
                High Traffic
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{address}</span>
            <span className="text-border mx-1">•</span>
            <span className="font-medium text-primary">{distance}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="font-semibold text-sm">{rating}</span>
            </div>
            
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isOpen ? "text-success" : "text-muted-foreground"
            )}>
              <span className={cn(
                "w-2 h-2 rounded-full",
                isOpen ? "bg-success animate-pulse" : "bg-muted-foreground"
              )} />
              {isOpen ? "Open" : "Closed"}
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{estimatedTime}</span>
            </div>
          </div>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={onSelect}
          className="flex-shrink-0 gap-1"
        >
          <Zap className="w-4 h-4" />
          Select
        </Button>
      </div>
    </div>
  );
};
