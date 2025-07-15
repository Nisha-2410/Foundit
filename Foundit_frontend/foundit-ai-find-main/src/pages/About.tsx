import { Sparkles, Target, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Intelligence",
      description: "Built with GPT + comprehensive product data + intelligent ranking engine to understand your exact needs"
    },
    {
      icon: Target,
      title: "Personalized Matching",
      description: "Every recommendation is tailored to your specific requirements, budget, and preferences"
    },
    {
      icon: Users,
      title: "Trusted by Thousands",
      description: "Join thousands of smart shoppers who make confident purchases with our AI guidance"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Foundit
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Foundit helps users find the best products tailored to their needs using AI. 
            We simplify how people shop and help them make trusted choices.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="border-0 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                To simplify how people shop and make trusted choices using AI. 
                We believe everyone deserves personalized, intelligent recommendations 
                that save time and ensure satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground text-center mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                1
              </div>
              <h3 className="font-medium text-foreground mb-2">Advanced AI Processing</h3>
              <p className="text-sm text-muted-foreground">
                Built with GPT technology to understand your natural language queries
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                2
              </div>
              <h3 className="font-medium text-foreground mb-2">Comprehensive Data</h3>
              <p className="text-sm text-muted-foreground">
                Analyzes vast product databases, reviews, and market trends
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
                3
              </div>
              <h3 className="font-medium text-foreground mb-2">Intelligent Ranking</h3>
              <p className="text-sm text-muted-foreground">
                Smart algorithms match products to your specific needs and budget
              </p>
            </div>
          </div>
        </div>

        {/* Early Users Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Trusted by Smart Shoppers
          </h2>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <span className="text-muted-foreground text-xs">User</span>
            </div>
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <span className="text-muted-foreground text-xs">Brand</span>
            </div>
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <span className="text-muted-foreground text-xs">Partner</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;