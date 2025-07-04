
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
  isActive: boolean;
}

export const AudioVisualizer = ({ isActive }: AudioVisualizerProps) => {
  const [bars, setBars] = useState<number[]>(Array(20).fill(0));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setBars(prev => 
          prev.map(() => Math.random() * 100)
        );
      }, 150);
    } else {
      setBars(Array(20).fill(0));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  return (
    <div className="flex items-center justify-center space-x-1 h-32 py-4">
      {bars.map((height, index) => (
        <div
          key={index}
          className={cn(
            "bg-gradient-to-t from-blue-600 to-indigo-600 rounded-full transition-all duration-150 ease-out",
            "w-3",
            isActive ? "opacity-100" : "opacity-30"
          )}
          style={{
            height: `${Math.max(4, height)}%`,
            animationDelay: `${index * 50}ms`
          }}
        />
      ))}
    </div>
  );
};
