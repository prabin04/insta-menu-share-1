import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Instagram, Sparkles, Zap, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ChefHat,
      title: "5-Course Menu Builder",
      description: "Create stunning restaurant menus with our intuitive builder"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Content",
      description: "Generate captions and hashtags automatically with AI"
    },
    {
      icon: Instagram,
      title: "Instagram Integration",
      description: "Share posts and stories directly to your Instagram"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "From menu to post in under 3 minutes"
    },
    {
      icon: Users,
      title: "Engagement Boost",
      description: "Optimize your content for maximum engagement"
    },
    {
      icon: TrendingUp,
      title: "Analytics Ready",
      description: "Track performance and optimize your strategy"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Restaurant Marketing</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Menu to Instagram
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              in Minutes
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your restaurant's 5-course menu into stunning Instagram content with AI-powered captions, hashtags, and professional formatting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')}
                className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <ChefHat className="w-5 h-5 mr-2" />
                Start Creating
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="h-14 px-8 text-lg"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, powerful tools designed specifically for restaurant social media marketing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Restaurant's Social Media?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join restaurants worldwide who are already using AI to create engaging Instagram content
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
