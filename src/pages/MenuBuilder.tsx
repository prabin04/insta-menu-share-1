import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Sparkles, Camera, Instagram, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  id: string;
  course: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}

const courses = [
  { id: "appetizer", name: "Appetizer", color: "bg-red-100 text-red-800" },
  { id: "soup", name: "Soup", color: "bg-orange-100 text-orange-800" },
  { id: "main", name: "Main Course", color: "bg-yellow-100 text-yellow-800" },
  { id: "dessert", name: "Dessert", color: "bg-green-100 text-green-800" },
  { id: "beverage", name: "Beverage", color: "bg-blue-100 text-blue-800" },
];

const MenuBuilder = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<MenuItem>>({
    course: "appetizer",
    name: "",
    description: "",
    price: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const addMenuItem = () => {
    if (currentItem.name && currentItem.description && currentItem.course) {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        course: currentItem.course,
        name: currentItem.name,
        description: currentItem.description,
        price: currentItem.price || "",
      };
      setMenuItems([...menuItems, newItem]);
      setCurrentItem({
        course: "appetizer",
        name: "",
        description: "",
        price: "",
      });
    }
  };

  const generateContent = async () => {
    if (menuItems.length === 0) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      navigate('/content-preview', { state: { menuItems } });
    }, 2000);
  };

  const mockGenerateDescription = (courseName: string) => {
    const descriptions = {
      appetizer: "Delicate truffle arancini with aged parmesan and micro herbs",
      soup: "Rich butternut squash bisque with roasted chestnuts and sage",
      main: "Pan-seared duck breast with cherry gastrique and seasonal vegetables",
      dessert: "Decadent chocolate soufflé with vanilla bean ice cream",
      beverage: "House-crafted sangria with seasonal fruits and premium spirits"
    };
    return descriptions[courseName as keyof typeof descriptions] || "Exquisite culinary creation";
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
              <h1 className="text-xl font-bold">5-Course Menu Builder</h1>
              <p className="text-sm text-muted-foreground">Create your complete dining experience</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Menu Creation Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add Menu Item</CardTitle>
              <CardDescription>Build your 5-course menu one dish at a time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Course Selection */}
              <div className="space-y-2">
                <Label>Course Type</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {courses.map((course) => (
                    <Button
                      key={course.id}
                      variant={currentItem.course === course.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentItem({ ...currentItem, course: course.id })}
                      className="justify-start"
                    >
                      {course.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Dish Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Dish Name</Label>
                <Input
                  id="name"
                  placeholder="Enter dish name..."
                  value={currentItem.name || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Description</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (currentItem.course) {
                        setCurrentItem({
                          ...currentItem,
                          description: mockGenerateDescription(currentItem.course)
                        });
                      }
                    }}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Suggest
                  </Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Describe your dish..."
                  value={currentItem.description || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (Optional)</Label>
                <Input
                  id="price"
                  placeholder="$0.00"
                  value={currentItem.price || ""}
                  onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                />
              </div>

              <Button onClick={addMenuItem} className="w-full" disabled={!currentItem.name || !currentItem.description}>
                <Plus className="w-4 h-4 mr-2" />
                Add to Menu
              </Button>
            </CardContent>
          </Card>

          {/* Menu Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Menu Preview</CardTitle>
                  <CardDescription>{menuItems.length}/5 courses added</CardDescription>
                </div>
                {menuItems.length >= 3 && (
                  <Button 
                    onClick={generateContent}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Content
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {menuItems.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start building your menu to see a preview</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {menuItems.map((item) => {
                    const course = courses.find(c => c.id === item.course);
                    return (
                      <div key={item.id} className="p-4 rounded-lg bg-muted/50 border">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary" className={course?.color}>
                            {course?.name}
                          </Badge>
                          {item.price && (
                            <span className="font-semibold text-primary">{item.price}</span>
                          )}
                        </div>
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    );
                  })}
                  
                  {menuItems.length >= 3 && (
                    <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-primary">Ready for AI Content</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Generate Instagram posts, captions, and hashtags for your complete menu experience
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MenuBuilder;