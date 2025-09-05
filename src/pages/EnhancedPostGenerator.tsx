import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Sparkles, Camera, Download, Instagram, Upload, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import InstagramPostMockup from "@/components/InstagramPostMockup";
import CaptionGenerator from "@/components/CaptionGenerator";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image?: string;
}

interface PostData {
  restaurantName: string;
  restaurantHandle: string;
  location: string;
  menuItems: MenuItem[];
  userImage?: string;
  postType: 'menu' | 'single' | 'user-image';
  stylePreference: string;
  brandColors: string;
  tagline: string;
  caption: string;
  hashtags: string[];
}

const themes = [
  { id: "minimal", name: "Minimal", description: "Clean and simple design" },
  { id: "elegant", name: "Elegant", description: "Sophisticated and refined" },
  { id: "bold", name: "Bold", description: "Vibrant and eye-catching" },
  { id: "playful", name: "Playful", description: "Fun and energetic" },
];

const EnhancedPostGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [postData, setPostData] = useState<PostData>({
    restaurantName: "",
    restaurantHandle: "",
    location: "",
    menuItems: [],
    postType: 'menu',
    stylePreference: "elegant",
    brandColors: "#FF6B6B,#4ECDC4",
    tagline: "",
    caption: "",
    hashtags: [],
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<any>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleInputChange = (field: keyof PostData, value: string | MenuItem[]) => {
    setPostData(prev => ({ ...prev, [field]: value }));
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      name: "",
      description: "",
      price: "",
    };
    setPostData(prev => ({
      ...prev,
      menuItems: [...prev.menuItems, newItem]
    }));
  };

  const updateMenuItem = (index: number, field: keyof MenuItem, value: string) => {
    setPostData(prev => ({
      ...prev,
      menuItems: prev.menuItems.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeMenuItem = (index: number) => {
    setPostData(prev => ({
      ...prev,
      menuItems: prev.menuItems.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setPostData(prev => ({ ...prev, userImage: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePost = async () => {
    if (postData.postType === 'menu' && postData.menuItems.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add at least one menu item",
        variant: "destructive",
      });
      return;
    }

    if (!postData.restaurantName || !postData.restaurantHandle) {
      toast({
        title: "Missing Information",
        description: "Please fill in restaurant name and handle",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockGeneratedPost = {
        tagline: generateTagline(postData),
        caption: generateCaption(postData),
        hashtags: generateHashtags(postData),
        style: postData.stylePreference,
        colors: postData.brandColors.split(','),
        menuItems: postData.menuItems.map(item => ({
          ...item,
          image: item.image || generatePlaceholderImage(item.name)
        })),
        singleItem: postData.menuItems[0] ? {
          ...postData.menuItems[0],
          image: postData.menuItems[0].image || generatePlaceholderImage(postData.menuItems[0].name)
        } : undefined,
        userImage: postData.userImage || uploadedImage,
      };
      
      setGeneratedPost(mockGeneratedPost);
      setIsGenerating(false);
      
      toast({
        title: "Post Generated!",
        description: "Your Instagram Post is ready to share",
      });
    }, 2000);
  };

  const generateTagline = (data: PostData) => {
    if (data.postType === 'menu') {
      const taglines = [
        `🍽️ Our signature dishes await you!`,
        `✨ Tonight's featured menu ✨`,
        `🔥 Must-try dishes at ${data.restaurantName} 🔥`,
        `🌟 Discover our culinary treasures 🌟`,
      ];
      return taglines[Math.floor(Math.random() * taglines.length)];
    }
    
    if (data.postType === 'user-image') {
      const taglines = [
        `📸 Amazing food at ${data.restaurantName}!`,
        `🤤 This looks incredible!`,
        `✨ Thanks for sharing! ✨`,
        `🍴 Delicious moments captured 🍴`,
      ];
      return taglines[Math.floor(Math.random() * taglines.length)];
    }
    
    return `Delicious food at ${data.restaurantName}`;
  };

  const generateCaption = (data: PostData) => {
    if (data.postType === 'menu') {
      const captions = [
        `Experience the best of ${data.restaurantName}! Our carefully crafted menu features the finest ingredients and traditional techniques. From appetizers to desserts, every dish tells a story of passion and flavor. 🍽️✨`,
        `Ready to embark on a culinary journey? Our menu showcases the perfect blend of innovation and tradition. Each dish is prepared with love and attention to detail. Book your table today! 📞🍴`,
        `Discover why ${data.restaurantName} is the talk of the town! Our menu features signature dishes that will transport your taste buds to new heights. Don't miss out on these incredible flavors! 🌟👨‍🍳`,
      ];
      return captions[Math.floor(Math.random() * captions.length)];
    }
    
    if (data.postType === 'user-image') {
      const captions = [
        `Thank you for sharing this beautiful moment with us! We're thrilled to see our food bringing joy to your dining experience. Tag us in your posts! 📸✨`,
        `Nothing makes us happier than seeing our customers enjoy our food! Thanks for the amazing photo and for choosing ${data.restaurantName}. Keep the foodie moments coming! 🍽️❤️`,
        `This photo perfectly captures the essence of great food and good times! We're so grateful for customers like you who share their dining experiences. Can't wait to serve you again! 🥰👨‍🍳`,
      ];
      return captions[Math.floor(Math.random() * captions.length)];
    }
    
    return `Delicious food at ${data.restaurantName}`;
  };

  const generateHashtags = (data: PostData) => {
    const baseHashtags = [
      `#${data.restaurantHandle?.replace('@', '')}`,
      `#${data.restaurantName?.replace(/\s+/g, '')}`,
      "#Foodie",
      "#Delicious", 
      "#Restaurant",
      "#Food",
      "#Yum",
      "#InstaFood",
      "#Foodstagram",
      "#EatLocal",
      "#FoodLovers",
      "#Culinary",
    ];
    
    if (data.postType === 'menu') {
      baseHashtags.push("#Menu", "#Dining", "#ChefSpecial", "#FineDining");
    }
    
    if (data.postType === 'user-image') {
      baseHashtags.push("#CustomerPhoto", "#FoodPhoto", "#DiningOut", "#FoodShare");
    }
    
    return baseHashtags.slice(0, 8);
  };

  const generatePlaceholderImage = (itemName: string) => {
    // Use the menu.webp from public folder as default
    return '/menu.webp';
  };

  const downloadPost = () => {
    toast({
      title: "Download Started",
      description: "Your Instagram Post is being prepared for download",
    });
  };

  const copyCaption = () => {
    if (!generatedPost) return;
    
    const fullCaption = `${postData.restaurantHandle} ${generatedPost.caption}\n\n${generatedPost.hashtags.join(' ')}`;
    
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
    if (!postData.restaurantName || !postData.restaurantHandle) return;
    
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
              <h1 className="text-xl font-bold">Enhanced Instagram Post Generator</h1>
              <p className="text-sm text-muted-foreground">Create professional Instagram posts for your restaurant</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Post Creation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-500" />
                Post Configuration
              </CardTitle>
              <CardDescription>Configure your Instagram post settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Restaurant Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Restaurant Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">Restaurant Name *</Label>
                  <Input
                    id="restaurantName"
                    placeholder="e.g., Svang"
                    value={postData.restaurantName}
                    onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="restaurantHandle">Restaurant Handle *</Label>
                  <Input
                    id="restaurantHandle"
                    placeholder="e.g., @bellavista_nyc"
                    value={postData.restaurantHandle}
                    onChange={(e) => handleInputChange('restaurantHandle', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Brønnøysund, Br"
                    value={postData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
              </div>

              {/* Post Type Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold">Post Type</h3>
                <Tabs value={postData.postType} onValueChange={(value) => handleInputChange('postType', value as 'menu' | 'single' | 'user-image')}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="menu">Menu-Based</TabsTrigger>
                    <TabsTrigger value="single">Single Item</TabsTrigger>
                    <TabsTrigger value="user-image">User Image</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="menu" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Menu Items</h4>
                        <Button onClick={addMenuItem} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                      
                      {postData.menuItems.map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">Item {index + 1}</h5>
                            <Button 
                              onClick={() => removeMenuItem(index)} 
                              variant="ghost" 
                              size="sm"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Item name"
                              value={item.name}
                              onChange={(e) => updateMenuItem(index, 'name', e.target.value)}
                            />
                            <Input
                              placeholder="Price"
                              value={item.price}
                              onChange={(e) => updateMenuItem(index, 'price', e.target.value)}
                            />
                          </div>
                          
                          <Textarea
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => updateMenuItem(index, 'description', e.target.value)}
                            rows={2}
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="single" className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Single item posts will use the first menu item you add above.
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="user-image" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Upload Customer Image</Label>
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
                  </TabsContent>
                </Tabs>
              </div>

              {/* Style Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold">Style Settings</h3>
                
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

                <div className="space-y-2">
                  <Label htmlFor="brandColors">Brand Colors (comma-separated)</Label>
                  <Input
                    id="brandColors"
                    placeholder="#FF6B6B,#4ECDC4"
                    value={postData.brandColors}
                    onChange={(e) => handleInputChange('brandColors', e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={generatePost} 
                className="w-full" 
                disabled={isGenerating || !postData.restaurantName || !postData.restaurantHandle}
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

          {/* Caption Generator */}
          {generatedPost && (
            <CaptionGenerator
              restaurantHandle={postData.restaurantHandle}
              caption={generatedPost.caption}
              hashtags={generatedPost.hashtags}
              onDownload={downloadPost}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedPostGenerator;
