import { Smartphone, QrCode, Gift, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AppPromo = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-br from-primary via-primary-dark to-[hsl(240,50%,12%)] rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
                <Printer className="w-5 h-5 text-accent" />
                <span className="text-white font-medium text-sm">xerservice</span>
              </div>
              
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Get the XerService App
              </h2>
              
              <p className="text-white/70 text-lg mb-6 max-w-md mx-auto lg:mx-0">
                Download now for exclusive offers and discounts, specially curated for you!
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-white/90">
                  <Gift className="w-5 h-5 text-accent" />
                  <span>Exclusive discounts</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Smartphone className="w-5 h-5 text-accent" />
                  <span>Track orders easily</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="lg">
                  Download for iOS
                </Button>
                <Button variant="heroOutline" size="lg">
                  Download for Android
                </Button>
              </div>
            </div>

            {/* QR Code & Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Phone mockup with QR */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <div className="text-center mb-4">
                    <QrCode className="w-6 h-6 text-white/70 mx-auto mb-2" />
                    <p className="text-white/70 text-sm">Scan to download</p>
                  </div>
                  
                  {/* QR Code placeholder */}
                  <div className="w-48 h-48 bg-white rounded-2xl p-4 mx-auto">
                    <div className="w-full h-full bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-5 gap-1">
                        {[...Array(25)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-sm ${
                              Math.random() > 0.3 ? "bg-white" : "bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white text-center mt-4 font-medium">
                    xerservice.app/download
                  </p>
                </div>

                {/* Floating printer illustration */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-accent/20 rounded-2xl backdrop-blur-sm border border-accent/30 flex items-center justify-center float">
                  <Printer className="w-12 h-12 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
