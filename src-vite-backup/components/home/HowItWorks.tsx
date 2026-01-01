import { Store, Upload, Eye, Package } from "lucide-react";

const steps = [
  {
    icon: Store,
    title: "Select a Shop",
    description: "Browse nearby xerox shops, check ratings, and availability in real-time.",
    color: "from-accent to-blue-600",
  },
  {
    icon: Upload,
    title: "Upload Your Files",
    description: "Drop your PDFs, images, or documents. We support all popular formats.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: Eye,
    title: "Preview & Customize",
    description: "Set your print preferences - color, size, duplex, and more with live preview.",
    color: "from-indigo-600 to-primary",
  },
  {
    icon: Package,
    title: "Collect Your Print",
    description: "Pay online and pick up from the shop. Or get it delivered to your doorstep.",
    color: "from-primary to-purple-700",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Get your documents printed in just 4 simple steps. No queues, no waiting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-border to-border/50" />
              )}
              
              <div className="bg-card rounded-2xl p-6 border border-border card-hover relative overflow-hidden">
                {/* Step Number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-display font-bold text-muted-foreground text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
