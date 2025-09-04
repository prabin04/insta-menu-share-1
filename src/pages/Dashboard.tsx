import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Instagram, Sparkles, Calendar, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Posts This Month", value: "24", icon: Instagram, trend: "+12%" },
    { label: "Engagement Rate", value: "4.2%", icon: TrendingUp, trend: "+0.8%" },
    { label: "Followers", value: "2,847", icon: Users, trend: "+156" },
    { label: "Menu Items", value: "15", icon: ChefHat, trend: "+3" },
  ];

  const recentPosts = [
    { course: "Appetizer", dish: "Truffle Arancini", engagement: "156 likes", time: "2 hours ago" },
    { course: "Main Course", dish: "Wagyu Beef Tenderloin", engagement: "203 likes", time: "1 day ago" },
    { course: "Dessert", dish: "Chocolate Lava Cake", engagement: "89 likes", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Bella Vista</h1>
                <p className="text-sm text-muted-foreground">Italian Fine Dining</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                <Instagram className="w-3 h-3 mr-1" />
                Connected
              </Badge>
              <Button variant="outline" size="sm">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-accent font-medium">{stat.trend}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Create New Content
                </CardTitle>
                <CardDescription>
                  Generate AI-powered social media content for your restaurant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => navigate('/menu-builder')}
                  className="w-full h-16 text-left justify-start bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  <div className="flex items-center gap-4">
                    <ChefHat className="w-6 h-6" />
                    <div>
                      <p className="font-semibold">Build 5-Course Menu</p>
                      <p className="text-sm opacity-90">Create your complete menu experience</p>
                    </div>
                  </div>
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-12"
                    onClick={() => navigate('/post-generator')}
                  >
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram Post
                  </Button>
                  <Button variant="outline" size="lg" className="h-12">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Posts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Your latest social media activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <ChefHat className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{post.dish}</p>
                    <p className="text-xs text-muted-foreground">{post.course}</p>
                    <p className="text-xs text-accent">{post.engagement}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;