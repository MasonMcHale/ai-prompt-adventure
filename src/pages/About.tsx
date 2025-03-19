
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Brain, Code, Star, Users, BookOpen, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="container max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">About PromptQuest</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering the next generation of AI communicators through hands-on prompt engineering challenges.
            </p>
          </div>
          
          {/* Our Mission */}
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg mb-4 text-muted-foreground">
                In a world increasingly powered by AI, effective communication with artificial intelligence systems is becoming as important as human language skills.
              </p>
              <p className="text-lg mb-4 text-muted-foreground">
                PromptQuest was created to help students develop this crucial skill through interactive, engaging challenges that teach the art and science of prompt engineering.
              </p>
              <p className="text-lg text-muted-foreground">
                Our goal is to make learning about AI accessible, fun, and relevant for high school students, preparing them for a future where human-AI collaboration is the norm.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-card border border-border rounded-3xl p-8 shadow-xl w-full max-w-md">
                  <Brain className="w-12 h-12 text-primary mb-6" />
                  <blockquote className="text-lg italic mb-6">
                    "The ability to effectively communicate with AI systems will be a fundamental literacy in the coming decades."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="font-bold text-primary">PQ</span>
                    </div>
                    <div>
                      <p className="font-semibold">PromptQuest Team</p>
                      <p className="text-sm text-muted-foreground">Founders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why PromptQuest Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Learn by Doing</h3>
                <p className="text-muted-foreground">
                  Interactive challenges provide hands-on experience with real AI systems, teaching through practical application rather than theory alone.
                </p>
              </div>
              
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Engaging Competition</h3>
                <p className="text-muted-foreground">
                  Our leaderboard and achievement system creates friendly competition that motivates continued learning and skill development.
                </p>
              </div>
              
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Immediate Feedback</h3>
                <p className="text-muted-foreground">
                  Get instant results from your prompts, allowing for rapid iteration and improvement of your communication skills.
                </p>
              </div>
            </div>
          </div>
          
          {/* Skill Progression */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Skills You'll Develop</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Structured Communication</h3>
                  <p className="text-muted-foreground">
                    Learn to organize your thoughts and requests in ways that AI systems can effectively process and respond to.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Creative Problem-Solving</h3>
                  <p className="text-muted-foreground">
                    Develop the ability to frame problems in ways that leverage AI's strengths while accounting for its limitations.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Critical Evaluation</h3>
                  <p className="text-muted-foreground">
                    Build skills in assessing AI outputs for accuracy, relevance, and potential biases or limitations.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Literacy</h3>
                  <p className="text-muted-foreground">
                    Gain an intuitive understanding of how large language models work and how to collaborate with them effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students who are mastering the art of prompt engineering and preparing for a future powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/challenges"
                className="px-6 py-3 text-base font-medium text-white bg-primary rounded-lg shadow-md hover:bg-primary/90 transition-colors"
              >
                Explore Challenges
              </Link>
              <Link
                to="/leaderboard"
                className="px-6 py-3 text-base font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              >
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
