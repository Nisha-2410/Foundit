import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Send, Search, Clock, Brain, Shield, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  const popularSearches = [
    "Best air purifiers under ₹10k",
    "Laptop for video editing under ₹70k", 
    "Best smartphones under ₹20,000 for gaming",
    "Washing machine for family of 5",
    "Budget DSLR camera for beginners",
    "Office chair for back support"
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Input",
      description: "Tell us what you're looking for in natural language"
    },
    {
      step: "2", 
      title: "AI Recommends",
      description: "Our AI analyzes your needs and finds perfect matches"
    },
    {
      step: "3",
      title: "You Buy",
      description: "Get personalized recommendations with explanations"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Saves Time with AI",
      description: "Skip hours of research. Get instant, intelligent recommendations tailored to your exact needs."
    },
    {
      icon: Brain,
      title: "Personalized to Your Intent", 
      description: "Our AI understands context, budget, and preferences to find products that truly match your requirements."
    },
    {
      icon: Shield,
      title: "Trusted Results with Explanations",
      description: "Every recommendation comes with clear reasoning so you understand why it's perfect for you."
    }
  ];

  const testimonials = [
    {
      name: "Priya K.",
      text: "Found the perfect laptop in 2 minutes! The AI explanation was spot-on.",
      rating: 5
    },
    {
      name: "Rajesh M.", 
      text: "Amazing how it understood my specific needs. Saved me hours of research.",
      rating: 5
    },
    {
      name: "Anita S.",
      text: "The recommendations are incredibly accurate. Trust their AI completely!",
      rating: 5
    }
  ];

const handleSearch = (query?: string) => {
  const finalQuery = (query ?? searchQuery).trim();
  if (finalQuery) {
    navigate(`/results?q=${encodeURIComponent(finalQuery)}`);
  }
};


  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - ChatGPT Style */}
      <main className="max-w-4xl mx-auto px-4">
        <div className="py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            What are you looking to 
            <span className="gradient-text"> buy today?</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Get AI-powered product recommendations that understand your exact needs, budget, and preferences.
          </p>

          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Input
              placeholder="e.g., Best laptop under ₹50k for students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="h-16 text-lg pl-6 pr-16 rounded-2xl modern-input glow-effect"
            />
            <Button 
              onClick={() => handleSearch()}
              size="lg" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl h-12 w-12 p-0 glow-effect"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>

          {/* Popular Searches */}
          <div className="mb-16">
            <p className="text-muted-foreground mb-4 text-sm">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="search-bubble"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <section className="py-16 border-t border-border">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 glow-effect" 
                     style={{ background: 'var(--gradient-primary)' }}>
                  <span className="text-white font-bold text-xl">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute left-full top-8 w-8 h-0.5 bg-border transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why Foundit */}
        <section className="py-16 border-t border-border">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-12">
            Why Foundit?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="h-full glass-card">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" 
                       style={{ background: 'var(--gradient-accent)' }}>
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground flex-1">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 border-t border-border">
          <h2 className="text-3xl font-semibold text-center text-foreground mb-12">
            What Our Users Say
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-lg text-muted-foreground mb-4 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <p className="font-semibold text-foreground">
                  {testimonials[currentTestimonial].name}
                </p>
              </CardContent>
            </Card>
            
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 rounded-full w-10 h-10 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 rounded-full w-10 h-10 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 border-t border-border">
          <Card className="glass-card border-primary/30">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Start your search with confidence — it's free.
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Join thousands of smart shoppers who find exactly what they need with AI-powered recommendations.
              </p>
              <Button 
                size="lg" 
                className="rounded-xl glow-effect" 
                style={{ background: 'var(--gradient-primary)' }}
                onClick={() => document.querySelector('input')?.focus()}
              >
                Try Foundit
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
