
import { useState } from "react";
import { ChevronRight, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completionRate: number;
  isCompleted?: boolean;
  imageUrl: string;
}

const ChallengeCard = ({
  id,
  title,
  description,
  difficulty,
  completionRate,
  isCompleted = false,
  imageUrl
}: ChallengeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine color based on difficulty
  const difficultyColor = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-yellow-100 text-yellow-700",
    advanced: "bg-red-100 text-red-700"
  }[difficulty];
  
  return (
    <Link 
      to={`/challenge/${id}`}
      className="w-full group" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-xl card-hover">
        {isCompleted && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
        )}
        
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-md ${difficultyColor}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(completionRate * 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                {Math.round(completionRate * 100)}% completion
              </span>
            </div>
            
            <div className="flex items-center text-primary">
              <span className="text-sm font-medium mr-1">Try it</span>
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
