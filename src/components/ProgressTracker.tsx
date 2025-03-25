
import { CheckCircle2, Circle } from "lucide-react";

export interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
  showLabels?: boolean;
}

const ProgressTracker = ({
  currentStep,
  totalSteps,
  className = "",
  showLabels = false
}: ProgressTrackerProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      {steps.map((step) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;
        
        return (
          <div key={step} className="flex flex-col items-center">
            <div className="relative flex items-center">
              {isCompleted ? (
                <CheckCircle2 className="w-8 h-8 text-primary" />
              ) : (
                <Circle 
                  className={`w-8 h-8 ${
                    isActive 
                      ? "text-primary stroke-[1.5px]" 
                      : "text-muted-foreground/40 stroke-[1px]"
                  }`} 
                />
              )}
              
              {step < totalSteps && (
                <div 
                  className={`h-[2px] w-16 md:w-24 transition-colors duration-300 ${
                    step < currentStep 
                      ? "bg-primary" 
                      : "bg-muted-foreground/20"
                  }`} 
                />
              )}
            </div>
            
            {showLabels && (
              <span 
                className={`mt-2 text-xs ${
                  isActive || isCompleted 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground"
                }`}
              >
                Step {step}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTracker;
