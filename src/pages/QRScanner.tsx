import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QrCode, Camera, Instagram, Sparkles, Upload, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import InstagramPostMockup from "@/components/InstagramPostMockup";

interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  restaurantName: string;
  location: string;
}

const QRScanner = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [menuItem, setMenuItem] = useState<MenuItemData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<any>(null);
  const [stylePreference, setStylePreference] = useState("elegant");
  const [brandColors, setBrandColors] = useState("#FF6B6B,#4ECDC4");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock menu item data - in real app, this would come from QR code scan
  const mockMenuItems: MenuItemData[] = [
    {
      id: "1",
      name: "Truffle Arancini",
      description: "Delicate truffle arancini with aged parmesan and micro herbs",
      price: "$24.00",
      image: "/menu.webp",
      restaurantName: "Svang",
      location: "New York, NY"
    },
    {
      id: "2", 
      name: "Wagyu Beef Tenderloin",
      description: "Pan-seared wagyu beef with cherry gastrique and seasonal vegetables",
      price: "$68.00",
      image: "/menu.webp",
      restaurantName: "Svang",
      location: "New York, NY"
    },
    {
      id: "3",
      name: "Chocolate Lava Cake",
      description: "Decadent chocolate soufflé with vanilla bean ice cream",
      price: "$18.00",
      image: "/menu.webp",
      restaurantName: "Svang", 
      location: "New York, NY"
    }
  ];

  const themes = [
    { id: "minimal", name: "Minimal", description: "Clean and simple design" },
    { id: "elegant", name: "Elegant", description: "Sophisticated and refined" },
    { id: "bold", name: "Bold", description: "Vibrant and eye-catching" },
    { id: "playful", name: "Playful", description: "Fun and energetic" },
  ];

  useEffect(() => {
    // Simulate QR code scan - in real app, this would parse QR code data
    const itemId = searchParams.get('item') || '1';
    const foundItem = mockMenuItems.find(item => item.id === itemId);
    
    if (foundItem) {
      setMenuItem(foundItem);
      setUploadedImage(foundItem.image || null);
    }
    
    setIsLoading(false);
  }, [searchParams]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePost = async () => {
    if (!menuItem) return;

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockGeneratedPost = {
        tagline: generateTagline(menuItem.name, stylePreference),
        caption: generateCaption(menuItem),
        hashtags: generateHashtags(menuItem),
        style: stylePreference,
        colors: brandColors.split(','),
        image: uploadedImage || menuItem.image,
      };
      
      setGeneratedPost(mockGeneratedPost);
      setIsGenerating(false);
      
      toast({
        title: "Post Generated!",
        description: "Your Instagram Post is ready to share",
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

  const generateCaption = (item: MenuItemData) => {
    const baseCaptions = [
      `Just tried the most amazing ${item.name} at ${item.restaurantName}! 🤤`,
      `This ${item.name} is absolutely incredible! ${item.restaurantName} never disappoints ✨`,
      `Foodie alert! The ${item.name} at ${item.restaurantName} is a must-try! 🍽️`,
      `Can't stop thinking about this ${item.name} from ${item.restaurantName}! 😍`,
    ];
    
    return baseCaptions[Math.floor(Math.random() * baseCaptions.length)];
  };

  const generateHashtags = (item: MenuItemData) => {
    const baseHashtags = [
      `#${item.restaurantName?.replace(/\s+/g, '')}`,
      `#${item.name?.replace(/\s+/g, '')}`,
      "#Foodie",
      "#Delicious", 
      "#Restaurant",
      "#Food",
      "#Yum",
      "#InstaFood",
    ];
    
    return baseHashtags.slice(0, 6);
  };

  const downloadPost = () => {
    toast({
      title: "Download Started",
      description: "Your Instagram Post is being prepared for download",
    });
  };

  const copyCaption = () => {
    if (!generatedPost || !menuItem) return;
    
    const fullCaption = `${menuItem.restaurantName} ${generatedPost.caption}\n\n${generatedPost.hashtags.join(' ')}`;
    
    navigator.clipboard.writeText(fullCaption);
    toast({
      title: "Caption Copied!",
      description: "The complete caption has been copied to your clipboard",
    });
  };

  const handleCaptionChange = (newCaption: string) => {
    setGeneratedPost(prev => prev ? { ...prev, caption: newCaption } : null);
  };

  const regenerateCaption = async () => {
    if (!menuItem) return;
    
    setIsGenerating(true);
    
    // Simulate AI regeneration
    setTimeout(() => {
      const newCaption = generateCaption(menuItem);
      setGeneratedPost(prev => prev ? { ...prev, caption: newCaption } : null);
      setIsGenerating(false);
      
      toast({
        title: "Caption Regenerated!",
        description: "New AI-generated caption is ready",
      });
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Scanning QR code...</p>
        </div>
      </div>
    );
  }

  if (!menuItem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <QrCode className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">QR Code Not Found</h2>
            <p className="text-muted-foreground mb-4">
              Please scan a valid menu item QR code to generate your Instagram Story.
            </p>
            <Button onClick={() => navigate('/')}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">Create Instagram Post</h1>
              <p className="text-sm text-muted-foreground">Share {menuItem.name} on Instagram</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Story Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-500" />
                Customize Your Story
              </CardTitle>
              <CardDescription>Personalize your Instagram Story before sharing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Menu Item Display */}
              <div className="p-4 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-4">
                  {menuItem.image && (
                    <img 
                      src={menuItem.image} 
                      alt={menuItem.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{menuItem.name}</h3>
                    <p className="text-sm text-muted-foreground">{menuItem.description}</p>
                    <p className="text-sm font-medium text-primary">{menuItem.price}</p>
                  </div>
                </div>
              </div>

              {/* Style Preference */}
              <div className="space-y-2">
                <Label htmlFor="style">Choose Your Style</Label>
                <Select value={stylePreference} onValueChange={setStylePreference}>
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
                  value={brandColors}
                  onChange={(e) => setBrandColors(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Upload Your Own Image</Label>
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
                onClick={generatePost} 
                className="w-full" 
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Post...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Instagram Post
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Post Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Post Preview</CardTitle>
                  <CardDescription>Your Instagram Post mockup</CardDescription>
                </div>
                {generatedPost && (
                  <Button onClick={downloadPost} size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!generatedPost ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Instagram className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Generate your post to see the preview</p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <InstagramPostMockup 
                    postData={{
                      menuItem: menuItem.name,
                      description: menuItem.description,
                      price: menuItem.price,
                      restaurantName: menuItem.restaurantName,
                      location: menuItem.location,
                      ...generatedPost,
                    }}
                    onCopyCaption={copyCaption}
                    onDownloadImage={downloadPost}
                    onRegenerateCaption={regenerateCaption}
                    onCaptionChange={handleCaptionChange}
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

export default QRScanner;
