import { Link } from "react-router-dom";
import { Printer, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  product: [
    { name: "How it Works", path: "/#how-it-works" },
    { name: "Find Shops", path: "/shops" },
    { name: "Upload & Print", path: "/upload" },
    { name: "Pricing", path: "/pricing" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Enterprise", path: "/enterprise" },
    { name: "Careers", path: "/careers" },
    { name: "Blog", path: "/blog" },
  ],
  support: [
    { name: "Help Center", path: "/help" },
    { name: "Contact Us", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-white/10">
                <Printer className="w-6 h-6 text-accent" />
              </div>
              <span className="font-display font-bold text-2xl">
                xer<span className="text-accent">service</span>
              </span>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              Making printing simple, fast, and reliable. Upload your documents and get them printed at a nearby shop in minutes.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
            <a href="mailto:hello@xerservice.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              hello@xerservice.com
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              +91 98765 43210
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Bangalore, India
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} XerService. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
