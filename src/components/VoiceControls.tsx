
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceControlsProps {
  isRecording: boolean;
  isMuted: boolean;
  onToggleRecording: () => void;
  onToggleMute: () => void;
}

export const VoiceControls = ({ 
  isRecording, 
  isMuted, 
  onToggleRecording, 
  onToggleMute 
}: VoiceControlsProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center space-x-4">
          {/* Mute/Unmute Button */}
          <Button
            variant="outline"
            size="lg"
            onClick={onToggleMute}
            className={cn(
              "w-14 h-14 rounded-full transition-all duration-200",
              isMuted 
                ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100" 
                : "hover:bg-gray-50"
            )}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </Button>

          {/* Main Recording Button */}
          <Button
            size="lg"
            onClick={onToggleRecording}
            className={cn(
              "w-20 h-20 rounded-full transition-all duration-200 relative",
              isRecording
                ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25 animate-pulse"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
            )}
          >
            {isRecording ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
            
            {/* Recording indicator ring */}
            {isRecording && (
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
            )}
          </Button>

          {/* Settings Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-14 h-14 rounded-full hover:bg-gray-50 transition-all duration-200"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Status Text */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isRecording 
              ? "🎤 Recording... Speak clearly into your microphone" 
              : "Click the microphone to start speaking"
            }
          </p>
          {isMuted && (
            <p className="text-xs text-red-600 mt-1">
              Audio is muted
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
