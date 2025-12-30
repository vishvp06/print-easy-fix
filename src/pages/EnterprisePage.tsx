import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Server, Shield, Building2, Users, Lock, Cloud, Headphones, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Server,
    title: "Private Infrastructure",
    description: "Your documents stay on your own secure servers. Complete control over data retention and access policies.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II compliant. End-to-end encryption, SSO integration, and audit logging.",
  },
  {
    icon: Building2,
    title: "White-Label Solution",
    description: "Brand the platform as your own. Custom domain, logos, and color schemes.",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Role-based access control. Manage departments, teams, and individual permissions.",
  },
  {
    icon: Lock,
    title: "Compliance Ready",
    description: "GDPR, HIPAA, and industry-specific compliance support out of the box.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "24/7 priority support with dedicated account manager and SLA guarantees.",
  },
];

const plans = [
  {
    name: "Institution",
    description: "For schools, colleges, and educational institutions",
    price: "₹15,000",
    period: "/month",
    features: [
      "Up to 500 users",
      "10 connected printers",
      "Basic analytics",
      "Email support",
      "Custom branding",
    ],
  },
  {
    name: "Organization",
    description: "For businesses and corporate offices",
    price: "₹35,000",
    period: "/month",
    popular: true,
    features: [
      "Unlimited users",
      "Unlimited printers",
      "Advanced analytics",
      "Priority support",
      "API access",
      "SSO integration",
      "Custom workflows",
    ],
  },
  {
    name: "Enterprise",
    description: "For large enterprises with custom needs",
    price: "Custom",
    period: "",
    features: [
      "Everything in Organization",
      "On-premise deployment",
      "Dedicated infrastructure",
      "Custom SLA",
      "Professional services",
      "Compliance assistance",
    ],
  },
];

const EnterprisePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-hero-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
              <Building2 className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Enterprise Solutions</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto">
              Private Printing Infrastructure for Your Organization
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Keep your documents on your own servers. Full control, complete security, 
              and seamless integration with your existing systems.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="hero" size="lg">
                Schedule a Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="lg">
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Everything You Need for Enterprise Printing
              </h2>
              <p className="text-muted-foreground text-lg">
                A complete solution designed for organizations that prioritize security and control.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border p-6 card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Plans for Every Size
              </h2>
              <p className="text-muted-foreground text-lg">
                From small institutions to large enterprises, we have a plan that fits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-card rounded-2xl border p-6 relative ${
                    plan.popular ? "border-accent shadow-glow" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="font-display font-semibold text-xl text-foreground mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-display text-3xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                          <Cloud className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-3xl p-8 md:p-12 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Schedule a demo with our team to see how XerService Enterprise 
                can transform your organization's printing workflow.
              </p>
              <Button variant="hero" size="lg">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EnterprisePage;
