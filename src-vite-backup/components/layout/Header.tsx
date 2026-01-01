import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Printer, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Upload & Print", path: "/upload" },
  { name: "Find Shops", path: "/shops" },
  { name: "Enterprise", path: "/enterprise" },
  { name: "About", path: "/about" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHeroPage = location.pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHeroPage ? "bg-transparent" : "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={cn(
              "p-2 rounded-xl transition-all duration-300 group-hover:scale-110",
              isHeroPage ? "bg-white/10" : "bg-primary"
            )}>
              <Printer className={cn(
                "w-5 h-5 md:w-6 md:h-6",
                isHeroPage ? "text-white" : "text-primary-foreground"
              )} />
            </div>
            <span className={cn(
              "font-display font-bold text-xl md:text-2xl tracking-tight",
              isHeroPage ? "text-white" : "text-foreground"
            )}>
              xer<span className="text-accent">service</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
                  location.pathname === link.path
                    ? isHeroPage
                      ? "bg-white/20 text-white"
                      : "bg-primary/10 text-primary"
                    : isHeroPage
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant={isHeroPage ? "heroOutline" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <User className="w-4 h-4" />
              Sign In
            </Button>
            <Button
              variant={isHeroPage ? "hero" : "default"}
              size="sm"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isHeroPage ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"
            )}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={cn(
            "lg:hidden py-4 border-t animate-fade-in",
            isHeroPage ? "border-white/10" : "border-border"
          )}>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg font-medium transition-all duration-200",
                    location.pathname === link.path
                      ? isHeroPage
                        ? "bg-white/20 text-white"
                        : "bg-primary/10 text-primary"
                      : isHeroPage
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/20">
                <Button variant={isHeroPage ? "heroOutline" : "outline"} className="w-full">
                  Sign In
                </Button>
                <Button variant={isHeroPage ? "hero" : "default"} className="w-full">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
