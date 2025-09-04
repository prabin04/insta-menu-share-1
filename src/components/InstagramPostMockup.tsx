import { Camera, Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";

interface InstagramPostMockupProps {
  postData: {
    restaurantName: string;
    restaurantHandle: string;
    location: string;
    menuItems?: Array<{
      name: string;
      description: string;
      price?: string;
      image?: string;
    }>;
    singleItem?: {
      name: string;
      description: string;
      price?: string;
      image?: string;
    };
    userImage?: string;
    postType: 'menu' | 'single' | 'user-image';
    tagline: string;
    caption: string;
    hashtags: string[];
    style: string;
    colors: string[];
  };
}

const InstagramPostMockup = ({ postData }: InstagramPostMockupProps) => {
  const getStyleClasses = (style: string) => {
    const styles = {
      minimal: {
        background: "from-white to-gray-100",
        textColor: "text-gray-900",
        accentColor: "text-gray-600",
        cardBg: "bg-white/95",
        imageBg: "bg-gray-100",
      },
      elegant: {
        background: "from-gray-900 to-black",
        textColor: "text-white",
        accentColor: "text-gray-300",
        cardBg: "bg-black/20",
        imageBg: "bg-white/10",
      },
      bold: {
        background: "from-pink-500 to-purple-600",
        textColor: "text-white",
        accentColor: "text-pink-100",
        cardBg: "bg-white/20",
        imageBg: "bg-white/20",
      },
      playful: {
        background: "from-orange-400 to-pink-500",
        textColor: "text-white",
        accentColor: "text-orange-100",
        cardBg: "bg-white/20",
        imageBg: "bg-white/20",
      },
    };
    
    return styles[style as keyof typeof styles] || styles.elegant;
  };

  const styleClasses = getStyleClasses(postData.style);

  return (
    <div className="relative w-80 h-80 bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-200">
      {/* Instagram Post Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${styleClasses.imageBg} flex items-center justify-center`}>
            <span className="text-xs font-bold">
              {postData.restaurantName?.charAt(0) || "R"}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold">{postData.restaurantName || "Restaurant"}</p>
            <p className={`text-xs ${styleClasses.accentColor}`}>{postData.location || "Location"}</p>
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-gray-600" />
      </div>

      {/* Main Image */}
      <div className="relative w-full h-48 bg-gray-100">
        {postData.image ? (
          <img 
            src={postData.image} 
            alt={postData.menuItem}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`w-full h-full flex items-center justify-center ${postData.image ? 'hidden' : ''}`}>
          <Camera className="w-12 h-12 opacity-40" />
        </div>
        
        {/* Overlay with Menu Item Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white text-lg font-bold mb-1">{postData.menuItem}</h2>
          <p className="text-white/90 text-sm mb-2">
            {postData.description.length > 60 ? postData.description.substring(0, 60) + '...' : postData.description}
          </p>
          {postData.price && (
            <p className="text-yellow-300 font-semibold">{postData.price}</p>
          )}
        </div>
      </div>

      {/* Instagram Post Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Heart className="w-6 h-6 text-gray-600" />
          <MessageCircle className="w-6 h-6 text-gray-600" />
          <Send className="w-6 h-6 text-gray-600" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Caption Section */}
      <div className="px-4 pb-4">
        <p className="text-sm text-gray-900 mb-2">
          <span className="font-semibold">{postData.restaurantName || "Restaurant"}</span> {postData.caption}
        </p>
        <div className="flex flex-wrap gap-1">
          {postData.hashtags.slice(0, 4).map((tag, index) => (
            <span key={index} className="text-xs text-blue-600">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">View all comments</p>
      </div>
    </div>
  );
};

export default InstagramPostMockup;
