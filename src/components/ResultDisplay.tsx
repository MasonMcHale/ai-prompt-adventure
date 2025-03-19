
import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Copy, Check, MessageSquare } from "lucide-react";

interface ResultDisplayProps {
  result: string;
  isSuccess?: boolean;
  isTarget?: boolean;
  onFeedback?: (type: 'positive' | 'negative') => void;
}

const ResultDisplay = ({
  result,
  isSuccess,
  isTarget = false,
  onFeedback
}: ResultDisplayProps) => {
  const [feedbackGiven, setFeedbackGiven] = useState<'positive' | 'negative' | null>(null);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Reset states when result changes
    setFeedbackGiven(null);
    setCopied(false);
    
    // Animate in the result
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [result]);
  
  const handleFeedback = (type: 'positive' | 'negative') => {
    if (!feedbackGiven && onFeedback) {
      setFeedbackGiven(type);
      onFeedback(type);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className={`w-full transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div className={`relative p-6 rounded-xl border ${isTarget ? "border-green-500 bg-green-50" : "border-border bg-card"} shadow-sm`}>
        {isTarget && (
          <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white shadow-lg">
              <Check className="w-4 h-4" />
            </div>
          </div>
        )}
        
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isSuccess === undefined ? "bg-secondary" : isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            <p className="text-base text-foreground whitespace-pre-line">
              {result}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            {onFeedback && (
              <>
                <button 
                  onClick={() => handleFeedback('positive')}
                  disabled={feedbackGiven !== null}
                  className={`p-1.5 rounded-md transition-colors ${
                    feedbackGiven === 'positive' 
                      ? 'bg-green-100 text-green-600' 
                      : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                  } ${feedbackGiven !== null && feedbackGiven !== 'positive' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleFeedback('negative')}
                  disabled={feedbackGiven !== null}
                  className={`p-1.5 rounded-md transition-colors ${
                    feedbackGiven === 'negative' 
                      ? 'bg-red-100 text-red-600' 
                      : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                  } ${feedbackGiven !== null && feedbackGiven !== 'negative' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
          
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
