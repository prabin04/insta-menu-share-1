import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Instagram, Sparkles, Zap, Users, TrendingUp, QrCode } from "lucide-react";
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
                Restaurant Dashboard
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/qr-scanner')}
                className="h-14 px-8 text-lg"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Scan QR Code
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

      {/* Customer Section */}
      <section className="py-24 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">For Customers</h2>
              <p className="text-xl text-muted-foreground">
                Scan a QR code at your favorite restaurant to create stunning Instagram Stories
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Share Your Dining Experience</h3>
                <p className="text-muted-foreground mb-6">
                  When you scan a QR code on a menu item, instantly generate beautiful Instagram Stories 
                  with AI-powered captions, hashtags, and professional styling. Perfect for food bloggers 
                  and social media enthusiasts!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                      <QrCode className="w-4 h-4 text-pink-600" />
                    </div>
                    <span>Scan QR code on menu</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-pink-600" />
                    </div>
                    <span>AI generates your story</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                      <Instagram className="w-4 h-4 text-pink-600" />
                    </div>
                    <span>Share on Instagram</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/qr-scanner')}
                  className="mt-6 h-12 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-opacity"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Try QR Scanner
                </Button>
              </div>
              
              <div className="flex justify-center">
                <div className="relative w-64 h-96 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-sm font-bold">BV</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Bella Vista</p>
                        <p className="text-xs opacity-75">New York, NY</p>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center items-center text-center">
                      <div className="w-24 h-24 rounded-2xl bg-white/20 mb-4 flex items-center justify-center overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&q=80" 
                          alt="Truffle Arancini"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-lg font-bold mb-2">Truffle Arancini</h4>
                      <p className="text-sm opacity-90 mb-2">Delicate truffle arancini with aged parmesan</p>
                      <p className="text-sm font-semibold text-yellow-300">$24.00</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-bold mb-2">✨ Exquisite Truffle Arancini ✨</p>
                      <div className="flex flex-wrap justify-center gap-1">
                        <span className="text-xs opacity-75 bg-white/20 rounded-full px-2 py-1">#BellaVista</span>
                        <span className="text-xs opacity-75 bg-white/20 rounded-full px-2 py-1">#Foodie</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')}
                className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/qr-scanner')}
                className="h-14 px-8 text-lg"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Try as Customer
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
