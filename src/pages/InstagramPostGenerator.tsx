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
import InstagramPostMockup from "@/components/InstagramPostMockup";

interface PostData {
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

const InstagramPostGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [postData, setPostData] = useState<PostData>({
    menuItem: "",
    description: "",
    price: "",
    restaurantName: "",
    location: "",
    stylePreference: "elegant",
    brandColors: "#FF6B6B,#4ECDC4",
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleInputChange = (field: keyof PostData, value: string) => {
    setPostData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setPostData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePost = async () => {
    if (!postData.menuItem || !postData.description) {
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
      const mockGeneratedPost = {
        tagline: generateTagline(postData.menuItem, postData.stylePreference),
        caption: generateCaption(postData),
        hashtags: generateHashtags(postData),
        style: postData.stylePreference,
        colors: postData.brandColors.split(','),
        image: uploadedImage || generatePlaceholderImage(postData.menuItem),
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

  const generateCaption = (data: PostData) => {
    const baseCaptions = [
      `Just tried the most amazing ${data.menuItem} at ${data.restaurantName}! 🤤`,
      `This ${data.menuItem} is absolutely incredible! ${data.restaurantName} never disappoints ✨`,
      `Foodie alert! The ${data.menuItem} at ${data.restaurantName} is a must-try! 🍽️`,
      `Can't stop thinking about this ${data.menuItem} from ${data.restaurantName}! 😍`,
    ];
    
    return baseCaptions[Math.floor(Math.random() * baseCaptions.length)];
  };

  const generateHashtags = (data: PostData) => {
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
    // Use the menu.webp from public folder as default
    return '/menu.webp';
  };

  const downloadPost = () => {
    // This would implement actual download functionality
    toast({
      title: "Download Started",
      description: "Your Instagram Post is being prepared for download",
    });
  };

  const copyCaption = () => {
    if (!generatedPost) return;
    
    const fullCaption = `${postData.restaurantName} ${generatedPost.caption}\n\n${generatedPost.hashtags.join(' ')}`;
    
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
    if (!postData.restaurantName) return;
    
    setIsGenerating(true);
    
    // Simulate AI regeneration
    setTimeout(() => {
      const newCaption = generateCaption(postData);
      setGeneratedPost(prev => prev ? { ...prev, caption: newCaption } : null);
      setIsGenerating(false);
      
      toast({
        title: "Caption Regenerated!",
        description: "New AI-generated caption is ready",
      });
    }, 1500);
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
              <h1 className="text-xl font-bold">Instagram Post Generator</h1>
              <p className="text-sm text-muted-foreground">Create AI-powered Instagram Posts for your menu items</p>
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
                Post Details
              </CardTitle>
              <CardDescription>Fill in the details to generate your Instagram Post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Menu Item Name */}
              <div className="space-y-2">
                <Label htmlFor="menuItem">Menu Item Name *</Label>
                <Input
                  id="menuItem"
                  placeholder="e.g., Truffle Arancini"
                  value={postData.menuItem}
                  onChange={(e) => handleInputChange('menuItem', e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your dish..."
                  value={postData.description}
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
                  value={postData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </div>

              {/* Restaurant Name */}
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Restaurant Name</Label>
                <Input
                  id="restaurantName"
                  placeholder="e.g., Svang"
                  value={postData.restaurantName}
                  onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., New York, NY"
                  value={postData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>

              {/* Style Preference */}
              <div className="space-y-2">
                <Label htmlFor="style">Theme/Style</Label>
                <Select value={postData.stylePreference} onValueChange={(value) => handleInputChange('stylePreference', value)}>
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
                  value={postData.brandColors}
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
                onClick={generatePost} 
                className="w-full" 
                disabled={isGenerating || !postData.menuItem || !postData.description}
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
                    <Download className="w-4 h-4 mr-2" />
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
                      ...postData,
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

export default InstagramPostGenerator;
