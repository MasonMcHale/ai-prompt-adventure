
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";

interface ProgressTrackerProps {
  total: number;
  completed: number;
  showLabel?: boolean;
}

const ProgressTracker = ({ 
  total, 
  completed, 
  showLabel = true 
}: ProgressTrackerProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animate the progress bar
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    
    // Start with current progress
    let currentProgress = progress;
    const animationFrame = () => {
      if (currentProgress < percentage) {
        currentProgress = Math.min(currentProgress + 1, percentage);
        setProgress(currentProgress);
        requestAnimationFrame(animationFrame);
      }
    };
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animationFrame);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [completed, total]);
  
  return (
    <div className="w-full space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <p className="text-sm font-medium">Your Progress</p>
          </div>
          <span className="text-sm text-muted-foreground">
            {completed} of {total} completed
          </span>
        </div>
      )}
      
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;
