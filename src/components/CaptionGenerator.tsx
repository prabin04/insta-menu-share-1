import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CaptionGeneratorProps {
  restaurantHandle: string;
  caption: string;
  hashtags: string[];
  onDownload?: () => void;
}

const CaptionGenerator = ({ restaurantHandle, caption, hashtags, onDownload }: CaptionGeneratorProps) => {
  const { toast } = useToast();

  const fullCaption = `${restaurantHandle} ${caption}\n\n${hashtags.join(' ')}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "Content copied successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📝</span>
          Generated Caption & Hashtags
        </CardTitle>
        <CardDescription>
          Copy the text below to use with your Instagram post
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Caption Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Caption:</h4>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="font-semibold">{restaurantHandle}</span> {caption}
            </p>
          </div>
          <Button 
            onClick={() => copyToClipboard(`${restaurantHandle} ${caption}`)}
            size="sm" 
            variant="outline"
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Caption
          </Button>
        </div>

        {/* Hashtags Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Hashtags:</h4>
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex flex-wrap gap-1">
              {hashtags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Button 
            onClick={() => copyToClipboard(hashtags.join(' '))}
            size="sm" 
            variant="outline"
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Hashtags
          </Button>
        </div>

        {/* Full Caption Section */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Complete Post Text:</h4>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm whitespace-pre-line">{fullCaption}</p>
          </div>
          <Button 
            onClick={() => copyToClipboard(fullCaption)}
            size="sm" 
            variant="outline"
            className="w-full"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Full Text
          </Button>
        </div>

        {/* Download Button */}
        {onDownload && (
          <Button 
            onClick={onDownload}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Image (1080x1080)
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CaptionGenerator;
