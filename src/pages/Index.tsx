
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Sparkles, MessageSquare, Target, Lightbulb } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChallengeCard from "../components/ChallengeCard";
import PromptInput from "../components/PromptInput";
import ResultDisplay from "../components/ResultDisplay";

const featuredChallenges = [
  {
    id: "image-generation",
    title: "Create the Perfect Image",
    description: "Learn how to craft detailed image generation prompts that produce exactly what you're looking for.",
    difficulty: "beginner",
    completionRate: 0.8,
    imageUrl: "https://images.unsplash.com/photo-1659564004749-0bee2ea53db4?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: "question-answering",
    title: "Get Precise Answers",
    description: "Master the art of formulating questions to get accurate, concise responses from AI.",
    difficulty: "intermediate",
    completionRate: 0.65,
    imageUrl: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: "creative-writing",
    title: "AI-Assisted Storytelling",
    description: "Discover how to guide AI to help you write creative and engaging stories with specific themes.",
    difficulty: "advanced",
    completionRate: 0.4,
    imageUrl: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?q=80&w=2939&auto=format&fit=crop"
  },
];

const features = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "Learn AI Fundamentals",
    description: "Understand how AI models interpret your prompts and how to communicate effectively with them."
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Interactive Challenges",
    description: "Practice your skills with hands-on challenges that provide immediate feedback on your prompts."
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-primary" />,
    title: "Practical Skills",
    description: "Develop skills that transfer to real-world applications of AI in education, design, and more."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
    title: "Master Communication",
    description: "Learn to communicate precisely with AI to get the exact responses you need for your projects."
  },
];

const Index = () => {
  const [demoPrompt, setDemoPrompt] = useState("");
  const [demoResponse, setDemoResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showItems, setShowItems] = useState(false);
  
  useEffect(() => {
    // Animate in the elements after initial render
    const timer = setTimeout(() => {
      setShowItems(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDemoSubmit = (prompt: string) => {
    setIsLoading(true);
    setDemoPrompt(prompt);
    
    // Simulate API response
    setTimeout(() => {
      setIsLoading(false);
      setDemoResponse(
        `You asked: "${prompt}"\n\nThis is a demo response showing how the AI would respond to your prompt. In the actual challenges, you'll receive real AI responses and feedback on how well your prompt achieved the target goal.`
      );
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 md:min-h-[85vh] flex items-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary/10 to-blue-400/10 blur-3xl" />
          </div>
          
          <div className="container max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-700 transform ${showItems ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
                <div className="inline-flex items-center py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  <span>Master AI Prompt Engineering</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-balance">
                  Learn to speak the <span className="text-gradient">language of AI</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl text-balance">
                  Master the art of crafting perfect prompts through interactive challenges. Turn your AI interactions from frustrating to fantastic.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/challenges" className="inline-flex items-center justify-center h-12 px-6 font-medium text-white bg-primary rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors">
                    Start the adventure
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  
                  <Link to="/about" className="inline-flex items-center justify-center h-12 px-6 font-medium text-foreground bg-secondary rounded-xl hover:bg-secondary/70 transition-colors">
                    Learn more
                  </Link>
                </div>
              </div>
              
              <div className={`transition-all duration-700 delay-300 transform ${showItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                <div className="bg-white/40 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-semibold mb-4">Try it yourself</h3>
                  
                  <PromptInput 
                    onSubmit={handleDemoSubmit} 
                    isLoading={isLoading}
                    tipText="Try a simple prompt like 'Tell me about AI prompt engineering' to see how it works."
                  />
                  
                  {demoResponse && (
                    <div className="mt-6 transition-all">
                      <ResultDisplay result={demoResponse} onFeedback={(type) => {
                        console.log("Feedback:", type);
                      }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-6 bg-secondary/50">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Learn Prompt Engineering?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Effective prompt engineering is becoming an essential skill in the AI era. Here's what you'll gain:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Challenges */}
        <section className="py-20 px-6">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Challenges</h2>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Put your prompt engineering skills to the test with these interactive challenges.
                </p>
              </div>
              
              <Link 
                to="/challenges" 
                className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium hover:underline"
              >
                View all challenges
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredChallenges.map((challenge, index) => (
                <ChallengeCard
                  key={challenge.id}
                  id={challenge.id}
                  title={challenge.title}
                  description={challenge.description}
                  difficulty={challenge.difficulty as any}
                  completionRate={challenge.completionRate}
                  imageUrl={challenge.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-blue-400/10">
          <div className="container max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-2xl mx-auto text-balance">
              Ready to master the art of communicating with AI?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who are learning to harness the power of AI through effective prompting.
            </p>
            
            <Link 
              to="/challenges" 
              className="inline-flex items-center justify-center h-12 px-8 font-medium text-white bg-primary rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-colors"
            >
              Start Learning Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
