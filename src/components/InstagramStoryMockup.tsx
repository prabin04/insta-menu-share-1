import { Camera, Heart, MessageCircle, Send } from "lucide-react";

interface InstagramStoryMockupProps {
  storyData: {
    menuItem: string;
    description: string;
    price?: string;
    restaurantName: string;
    location: string;
    image?: string;
    tagline: string;
    caption: string;
    hashtags: string[];
    style: string;
    colors: string[];
  };
}

const InstagramStoryMockup = ({ storyData }: InstagramStoryMockupProps) => {
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

  const styleClasses = getStyleClasses(storyData.style);

  return (
    <div className="relative w-64 h-[450px] rounded-3xl overflow-hidden shadow-2xl">
      {/* Background with theme colors */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styleClasses.background}`} />
      
      {/* Content Container */}
      <div className={`relative z-10 h-full flex flex-col ${styleClasses.textColor} p-6`}>
        {/* Top Section - Restaurant Branding */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${styleClasses.imageBg} flex items-center justify-center`}>
              <span className="text-sm font-bold">
                {storyData.restaurantName?.charAt(0) || "R"}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold">{storyData.restaurantName || "Restaurant"}</p>
              <p className={`text-xs ${styleClasses.accentColor}`}>{storyData.location || "Location"}</p>
            </div>
          </div>
          <div className={`text-xs ${styleClasses.accentColor}`}>now</div>
        </div>

        {/* Center Section - Menu Item */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          {/* Image Container - Larger and more prominent */}
          <div className={`w-40 h-40 rounded-3xl ${styleClasses.imageBg} mb-6 flex items-center justify-center overflow-hidden shadow-xl`}>
            {storyData.image ? (
              <img 
                src={storyData.image} 
                alt={storyData.menuItem}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-full h-full flex items-center justify-center ${storyData.image ? 'hidden' : ''}`}>
              <Camera className="w-10 h-10 opacity-60" />
            </div>
          </div>

          {/* Menu Item Name - Larger and bolder */}
          <h2 className="text-2xl font-bold mb-3 leading-tight">
            {storyData.menuItem}
          </h2>

          {/* Description - Shorter and cleaner */}
          <p className={`text-sm ${styleClasses.accentColor} mb-4 leading-relaxed px-2`}>
            {storyData.description.length > 80 ? storyData.description.substring(0, 80) + '...' : storyData.description}
          </p>

          {/* Price - More prominent */}
          {storyData.price && (
            <div className={`${styleClasses.cardBg} rounded-full px-6 py-2 mb-4`}>
              <p className="text-lg font-bold">{storyData.price}</p>
            </div>
          )}

          {/* Tagline - Simplified */}
          <p className="text-xl font-bold mb-4 text-center">
            {storyData.tagline}
          </p>
        </div>

        {/* Bottom Section - Hashtags - Simplified */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {storyData.hashtags.slice(0, 3).map((tag, index) => (
              <span key={index} className={`text-xs ${styleClasses.accentColor} bg-white/20 rounded-full px-3 py-1`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Instagram UI Elements - Simplified */}
      <div className="absolute top-4 right-4 w-6 h-6 border-2 border-white rounded-full opacity-60" />
      
      {/* Bottom Right Actions - Simplified */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
          <MessageCircle className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
          <Send className="w-4 h-4" />
        </div>
      </div>

      {/* Progress Bar - Simplified */}
      <div className="absolute top-2 left-2 right-2 flex gap-1">
        <div className="h-1 bg-white rounded-full flex-1" />
        <div className="h-1 bg-white/30 rounded-full flex-1" />
        <div className="h-1 bg-white/30 rounded-full flex-1" />
      </div>
    </div>
  );
};

export default InstagramStoryMockup;
