
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 bg-background border-t border-border">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PromptQuest. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-3 w-3 mx-1 text-red-500" />
              <span>for learning</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
