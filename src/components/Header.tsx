
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 glass px-6 py-4">
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-semibold"
        >
          <Brain className="w-7 h-7 text-primary animate-pulse-soft" />
          <span className="text-gradient">PromptQuest</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
            Home
          </Link>
          <Link to="/challenges" className="text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
            Text Prompt Challenges
          </Link>
          <Link to="/image-challenges" className="text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
            Image Prompt Challenges
          </Link>
          <Link to="/leaderboard" className="text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
            Leaderboard
          </Link>
          <Link to="/about" className="text-sm font-medium opacity-90 hover:opacity-100 transition-opacity">
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link 
            to="/challenges" 
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg shadow-md hover:bg-primary/90 transition-colors"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
