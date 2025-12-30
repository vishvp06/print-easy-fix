import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Printer, Target, Heart, Lightbulb, Users, MapPin } from "lucide-react";

const team = [
  { name: "Arun Kumar", role: "Founder & CEO", image: "AK" },
  { name: "Priya Sharma", role: "CTO", image: "PS" },
  { name: "Rahul Verma", role: "Head of Operations", image: "RV" },
  { name: "Sneha Patel", role: "Design Lead", image: "SP" },
];

const values = [
  {
    icon: Target,
    title: "Simplicity First",
    description: "We believe printing should take seconds, not minutes. Every feature we build is designed to reduce friction.",
  },
  {
    icon: Heart,
    title: "Customer Obsessed",
    description: "From students rushing to submit assignments to businesses needing urgent documents, we understand the urgency.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description: "We're constantly exploring new ways to make printing smarter, faster, and more accessible.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Printer className="w-4 h-4 text-accent" />
                <span className="text-accent text-sm font-medium">Our Story</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                We're Making Printing{" "}
                <span className="text-accent">Effortless</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Born from a simple frustration: why is getting a document printed 
                in 2024 still such a hassle? We set out to fix that.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  The Problem We Saw
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    It started in a college campus. Every exam season, students would rush 
                    to the same few xerox shops, wait in long queues, deal with format issues, 
                    and pray their documents printed correctly.
                  </p>
                  <p>
                    For shop owners, it was equally frustrating. Managing orders, handling 
                    multiple file formats, and dealing with peak-hour chaos made running a 
                    print shop exhausting.
                  </p>
                  <p>
                    We realized both sides of this equation could be dramatically improved 
                    with the right technology. That's how XerService was born.
                  </p>
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="font-display text-4xl font-bold text-accent mb-2">50K+</div>
                    <div className="text-muted-foreground">Documents Printed</div>
                  </div>
                  <div>
                    <div className="font-display text-4xl font-bold text-accent mb-2">100+</div>
                    <div className="text-muted-foreground">Partner Shops</div>
                  </div>
                  <div>
                    <div className="font-display text-4xl font-bold text-accent mb-2">15K+</div>
                    <div className="text-muted-foreground">Happy Users</div>
                  </div>
                  <div>
                    <div className="font-display text-4xl font-bold text-accent mb-2">5</div>
                    <div className="text-muted-foreground">Cities Covered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Drives Us
              </h2>
              <p className="text-muted-foreground text-lg">
                Our values shape every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet the Team
              </h2>
              <p className="text-muted-foreground text-lg">
                A small but passionate team dedicated to solving printing
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border p-6 text-center card-hover"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-4">
                    <span className="font-display font-bold text-2xl text-white">
                      {member.image}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-3xl p-8 md:p-12 text-center">
              <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Based in Bangalore
              </h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                We're headquartered in the heart of India's tech capital, 
                but we're expanding rapidly across the country.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="hero">
                  <Users className="w-4 h-4 mr-2" />
                  Join Our Team
                </Button>
                <Button variant="heroOutline">
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
