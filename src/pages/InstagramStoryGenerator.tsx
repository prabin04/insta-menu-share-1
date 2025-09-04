import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Sparkles, Camera, Download, Instagram, Palette, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import InstagramStoryMockup from "@/components/InstagramStoryMockup";

interface StoryData {
  menuItem: string;
  description: string;
  price: string;
  restaurantName: string;
  location: string;
  stylePreference: string;
  brandColors: string;
  image?: string;
}

const themes = [
  { id: "minimal", name: "Minimal", description: "Clean and simple design" },
  { id: "elegant", name: "Elegant", description: "Sophisticated and refined" },
  { id: "bold", name: "Bold", description: "Vibrant and eye-catching" },
  { id: "playful", name: "Playful", description: "Fun and energetic" },
];

const InstagramStoryGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [storyData, setStoryData] = useState<StoryData>({
    menuItem: "",
    description: "",
    price: "",
    restaurantName: "",
    location: "",
    stylePreference: "elegant",
    brandColors: "#FF6B6B,#4ECDC4",
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleInputChange = (field: keyof StoryData, value: string) => {
    setStoryData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setStoryData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateStory = async () => {
    if (!storyData.menuItem || !storyData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in the menu item name and description",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockGeneratedStory = {
        tagline: generateTagline(storyData.menuItem, storyData.stylePreference),
        caption: generateCaption(storyData),
        hashtags: generateHashtags(storyData),
        style: storyData.stylePreference,
        colors: storyData.brandColors.split(','),
        image: uploadedImage || generatePlaceholderImage(storyData.menuItem),
      };
      
      setGeneratedStory(mockGeneratedStory);
      setIsGenerating(false);
      
      toast({
        title: "Story Generated!",
        description: "Your Instagram Story is ready to share",
      });
    }, 2000);
  };

  const generateTagline = (menuItem: string, style: string) => {
    const taglines = {
      minimal: [`${menuItem}`, `Simple. Delicious.`, `Taste the difference`],
      elegant: [`Exquisite ${menuItem}`, `Culinary perfection`, `A masterpiece on your plate`],
      bold: [`🔥 ${menuItem} 🔥`, `Bold flavors await!`, `This will blow your mind!`],
      playful: [`✨ ${menuItem} magic ✨`, `Yum alert! 🚨`, `Foodie heaven incoming!`],
    };
    
    const styleTaglines = taglines[style as keyof typeof taglines] || taglines.elegant;
    return styleTaglines[Math.floor(Math.random() * styleTaglines.length)];
  };

  const generateCaption = (data: StoryData) => {
    const baseCaptions = [
      `Just tried the most amazing ${data.menuItem} at ${data.restaurantName}! 🤤`,
      `This ${data.menuItem} is absolutely incredible! ${data.restaurantName} never disappoints ✨`,
      `Foodie alert! The ${data.menuItem} at ${data.restaurantName} is a must-try! 🍽️`,
      `Can't stop thinking about this ${data.menuItem} from ${data.restaurantName}! 😍`,
    ];
    
    return baseCaptions[Math.floor(Math.random() * baseCaptions.length)];
  };

  const generateHashtags = (data: StoryData) => {
    const baseHashtags = [
      `#${data.restaurantName?.replace(/\s+/g, '')}`,
      `#${data.menuItem?.replace(/\s+/g, '')}`,
      "#Foodie",
      "#Delicious",
      "#Restaurant",
      "#Food",
      "#Yum",
      "#InstaFood",
    ];
    
    return baseHashtags.slice(0, 6);
  };

  const generatePlaceholderImage = (menuItem: string) => {
    // Generate a placeholder image URL based on menu item
    const foodImages = [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=600&fit=crop&q=80'
    ];
    return foodImages[Math.floor(Math.random() * foodImages.length)];
  };

  const downloadStory = () => {
    // This would implement actual download functionality
    toast({
      title: "Download Started",
      description: "Your Instagram Story is being prepared for download",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">Instagram Story Generator</h1>
              <p className="text-sm text-muted-foreground">Create AI-powered Instagram Stories for your menu items</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Story Creation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-500" />
                Story Details
              </CardTitle>
              <CardDescription>Fill in the details to generate your Instagram Story</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Menu Item Name */}
              <div className="space-y-2">
                <Label htmlFor="menuItem">Menu Item Name *</Label>
                <Input
                  id="menuItem"
                  placeholder="e.g., Truffle Arancini"
                  value={storyData.menuItem}
                  onChange={(e) => handleInputChange('menuItem', e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your dish..."
                  value={storyData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="$24.00"
                  value={storyData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </div>

              {/* Restaurant Name */}
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Restaurant Name</Label>
                <Input
                  id="restaurantName"
                  placeholder="e.g., Bella Vista"
                  value={storyData.restaurantName}
                  onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., New York, NY"
                  value={storyData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              {/* Style Preference */}
              <div className="space-y-2">
                <Label htmlFor="style">Theme/Style</Label>
                <Select value={storyData.stylePreference} onValueChange={(value) => handleInputChange('stylePreference', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem key={theme.id} value={theme.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{theme.name}</span>
                          <span className="text-sm text-muted-foreground">{theme.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Colors */}
              <div className="space-y-2">
                <Label htmlFor="brandColors">Brand Colors (comma-separated)</Label>
                <Input
                  id="brandColors"
                  placeholder="#FF6B6B,#4ECDC4"
                  value={storyData.brandColors}
                  onChange={(e) => handleInputChange('brandColors', e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Upload Image</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Choose Image
                  </Button>
                  {uploadedImage && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Camera className="w-3 h-3 mr-1" />
                      Image uploaded
                    </Badge>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <Button 
                onClick={generateStory} 
                className="w-full" 
                disabled={isGenerating || !storyData.menuItem || !storyData.description}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Story...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Instagram Story
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Story Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Story Preview</CardTitle>
                  <CardDescription>Your Instagram Story mockup</CardDescription>
                </div>
                {generatedStory && (
                  <Button onClick={downloadStory} size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!generatedStory ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Instagram className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Generate your story to see the preview</p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <InstagramStoryMockup 
                    storyData={{
                      ...storyData,
                      ...generatedStory,
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstagramStoryGenerator;
