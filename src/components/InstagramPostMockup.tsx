import { Camera, Heart, MessageCircle, Send, MoreHorizontal, Copy, Download } from "lucide-react";

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
  onCopyCaption?: () => void;
  onDownloadImage?: () => void;
}

const InstagramPostMockup = ({ postData, onCopyCaption, onDownloadImage }: InstagramPostMockupProps) => {
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

  const renderMenuGrid = () => {
    if (!postData.menuItems || postData.menuItems.length === 0) return null;
    
    const items = postData.menuItems.slice(0, 4); // Max 4 items for grid
    
    if (items.length === 1) {
      return (
        <div className="relative w-full h-48 bg-gray-100">
          {items[0].image ? (
            <img 
              src={items[0].image} 
              alt={items[0].name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Camera className="w-12 h-12 opacity-40" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-white text-lg font-bold mb-1">{items[0].name}</h2>
            <p className="text-white/90 text-sm mb-2">
              {items[0].description.length > 60 ? items[0].description.substring(0, 60) + '...' : items[0].description}
            </p>
            {items[0].price && (
              <p className="text-yellow-300 font-semibold">{items[0].price}</p>
            )}
          </div>
        </div>
      );
    }
    
    if (items.length === 2) {
      return (
        <div className="grid grid-cols-2 gap-1 h-48">
          {items.map((item, index) => (
            <div key={index} className="relative bg-gray-100">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="w-8 h-8 opacity-40" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <h3 className="text-white text-sm font-bold">{item.name}</h3>
                {item.price && (
                  <p className="text-yellow-300 text-xs font-semibold">{item.price}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    // 3 or 4 items - 2x2 grid
    return (
      <div className="grid grid-cols-2 gap-1 h-48">
        {items.map((item, index) => (
          <div key={index} className="relative bg-gray-100">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-6 h-6 opacity-40" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1">
              <h3 className="text-white text-xs font-bold truncate">{item.name}</h3>
              {item.price && (
                <p className="text-yellow-300 text-xs font-semibold">{item.price}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSingleItem = () => {
    if (!postData.singleItem) return null;
    
    return (
      <div className="relative w-full h-48 bg-gray-100">
        {postData.singleItem.image ? (
          <img 
            src={postData.singleItem.image} 
            alt={postData.singleItem.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-12 h-12 opacity-40" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white text-lg font-bold mb-1">{postData.singleItem.name}</h2>
          <p className="text-white/90 text-sm mb-2">
            {postData.singleItem.description.length > 60 ? postData.singleItem.description.substring(0, 60) + '...' : postData.singleItem.description}
          </p>
          {postData.singleItem.price && (
            <p className="text-yellow-300 font-semibold">{postData.singleItem.price}</p>
          )}
        </div>
      </div>
    );
  };

  const renderUserImage = () => {
    if (!postData.userImage) return null;
    
    return (
      <div className="relative w-full h-48 bg-gray-100">
        <img 
          src={postData.userImage} 
          alt="User uploaded food"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white text-lg font-bold mb-1">{postData.tagline}</h2>
          <p className="text-white/90 text-sm">Delicious food at {postData.restaurantName}</p>
        </div>
      </div>
    );
  };

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

      {/* Main Content Area */}
      {postData.postType === 'menu' && renderMenuGrid()}
      {postData.postType === 'single' && renderSingleItem()}
      {postData.postType === 'user-image' && renderUserImage()}

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
          <span className="font-semibold">{postData.restaurantHandle || postData.restaurantName}</span> {postData.caption}
        </p>
        <div className="flex flex-wrap gap-1">
          {postData.hashtags.slice(0, 6).map((tag, index) => (
            <span key={index} className="text-xs text-blue-600">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">View all comments</p>
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={onCopyCaption}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
          >
            <Copy className="w-3 h-3" />
            Copy Caption
          </button>
          <button
            onClick={onDownloadImage}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
          >
            <Download className="w-3 h-3" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstagramPostMockup;
