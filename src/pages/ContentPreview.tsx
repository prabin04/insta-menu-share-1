import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Instagram, Download, Copy, RefreshCw, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  course: string;
  name: string;
  description: string;
  price: string;
}

interface GeneratedContent {
  caption: string;
  hashtags: string[];
  story_caption: string;
}

const ContentPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [selectedPost, setSelectedPost] = useState<'post' | 'story'>('post');

  useEffect(() => {
    if (location.state?.menuItems) {
      setMenuItems(location.state.menuItems);
      
      // Simulate AI content generation
      setTimeout(() => {
        const mockContent: GeneratedContent = {
          caption: `🍽️ Experience our exquisite 5-course tasting menu at Bella Vista!\n\nFrom our delicate truffle arancini to our decadent chocolate soufflé, each course is crafted with passion and the finest ingredients.\n\n✨ Tonight's featured courses showcase the best of Italian fine dining with a modern twist. Book your table and embark on a culinary journey that will awaken your senses.\n\n#BellaVista #ItalianCuisine #FoodieExperience`,
          hashtags: [
            "#BellaVista", "#ItalianCuisine", "#FoodieExperience", "#FineDining", 
            "#TastingMenu", "#CulinaryArt", "#TruffleArancini", "#ChocolateSoufflé",
            "#RestaurantLife", "#ChefSpecial", "#FoodLovers", "#DiningExperience"
          ],
          story_caption: "🔥 Tonight's 5-course journey awaits! Which course are you most excited to try? Comment below! 👇✨"
        };
        setGeneratedContent(mockContent);
        setIsGenerating(false);
      }, 2000);
    } else {
      navigate('/menu-builder');
    }
  }, [location.state, navigate]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Content copied successfully",
    });
  };

  const regenerateContent = () => {
    setIsGenerating(true);
    // Simulate regeneration
    setTimeout(() => {
      const alternativeContent: GeneratedContent = {
        caption: `🌟 Indulge in culinary excellence at Bella Vista!\n\nOur carefully curated 5-course menu takes you on a gastronomic adventure through authentic Italian flavors with contemporary flair.\n\n👨‍🍳 Each dish tells a story, from farm-fresh ingredients to time-honored techniques passed down through generations.\n\nReservations available - don't miss this extraordinary dining experience!`,
        hashtags: [
          "#BellaVistaRestaurant", "#AuthenticItalian", "#CulinaryExcellence", "#FarmToTable",
          "#GastronomicAdventure", "#ItalianTradition", "#ModernCuisine", "#ExquisiteDining",
          "#FoodArt", "#ChefCrafted", "#ReservationRequired", "#UnforgettableExperience"
        ],
        story_caption: "✨ Behind the scenes: Our chef preparing tonight's signature dishes! What's your favorite Italian dish? 🍝❤️"
      };
      setGeneratedContent(alternativeContent);
      setIsGenerating(false);
    }, 1500);
  };

  const simulateInstagramPost = () => {
    toast({
      title: "Posted to Instagram! 📸",
      description: "Your content has been shared successfully",
    });
  };

  const downloadContent = () => {
    if (!generatedContent) return;
    
    const content = `Caption:\n${generatedContent.caption}\n\nHashtags:\n${generatedContent.hashtags.join(' ')}\n\nStory Caption:\n${generatedContent.story_caption}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'instagram-content.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!generatedContent && !isGenerating) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/menu-builder')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">AI-Generated Content</h1>
              <p className="text-sm text-muted-foreground">Ready-to-share Instagram content for your menu</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Menu Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Your 5-Course Menu</CardTitle>
              <CardDescription>Menu items used for content generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.course}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generated Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Generated Content
                  </CardTitle>
                  <CardDescription>AI-powered Instagram ready content</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={regenerateContent} disabled={isGenerating}>
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadContent} disabled={isGenerating}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="text-center py-12">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
                  <p className="text-lg font-semibold mb-2">Generating Content...</p>
                  <p className="text-sm text-muted-foreground">AI is crafting the perfect captions and hashtags</p>
                </div>
              ) : generatedContent && (
                <div className="space-y-6">
                  {/* Post/Story Toggle */}
                  <div className="flex gap-2">
                    <Button 
                      variant={selectedPost === 'post' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPost('post')}
                    >
                      Instagram Post
                    </Button>
                    <Button 
                      variant={selectedPost === 'story' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPost('story')}
                    >
                      Instagram Story
                    </Button>
                  </div>

                  {/* Content Display */}
                  {selectedPost === 'post' ? (
                    <div className="space-y-4">
                      {/* Caption */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-semibold">Caption</label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(generatedContent.caption)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50 border">
                          <p className="text-sm whitespace-pre-line">{generatedContent.caption}</p>
                        </div>
                      </div>

                      {/* Hashtags */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-semibold">Hashtags</label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyToClipboard(generatedContent.hashtags.join(' '))}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50 border">
                          <div className="flex flex-wrap gap-2">
                            {generatedContent.hashtags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold">Story Caption</label>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(generatedContent.story_caption)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50 border">
                        <p className="text-sm">{generatedContent.story_caption}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={simulateInstagramPost}
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Post to Instagram
                    </Button>
                    <Button variant="outline" onClick={downloadContent}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContentPreview;