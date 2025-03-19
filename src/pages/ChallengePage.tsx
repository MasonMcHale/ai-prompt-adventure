import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromptInput from "@/components/PromptInput";
import ResultDisplay from "@/components/ResultDisplay";
import ProgressTracker from "@/components/ProgressTracker";

// Mock challenge data - in a real app, this would come from an API
const challengeData = {
  "1": {
    id: "1",
    title: "Generate a Creative Story",
    description: "Learn how to craft prompts that generate engaging creative stories with specific themes and characters.",
    difficulty: "beginner" as const,
    goalDescription: "Create a prompt that generates a short story about a time traveler visiting ancient Egypt. The story should include a plot twist and be suitable for a young adult audience.",
    examplePrompt: "Write a short story about a time traveler who accidentally lands in ancient Egypt during the construction of the pyramids. Include a surprising plot twist at the end. The story should be exciting and suitable for young adult readers.",
    targetResponse: "The sun beat down mercilessly as Maya's time pod malfunctioned, leaving her stranded in ancient Egypt circa 2500 BCE. The Great Pyramid of Giza was only half-constructed, its limestone blocks gleaming white in the desert sun.\n\nDisguising her modern clothing with a worker's tunic she'd stolen from a washing line, Maya infiltrated the construction site, hoping to find materials to repair her pod. The overseer, a stern man named Khufu, took notice of her unusual knowledge and assigned her to the architectural team.\n\nFor weeks, Maya worked alongside the Egyptians, marveling at their ingenuity. She formed a friendship with a scribe named Imhotep, who shared the pharaoh's plans for the afterlife.\n\n\"The chambers are designed to guide the pharaoh to the stars,\" Imhotep explained.\n\nOne night, Maya discovered hieroglyphs that didn't match the period. They depicted her time pod and contained technical specifications for interstellar travel. With a shock, she realized the truth: The Egyptians weren't building a tomb—they were constructing a launch site for their own time travel experiments.\n\nWhen she finally repaired her pod, Imhotep wasn't surprised. \"We've been waiting for someone like you for centuries,\" he said, revealing a small device identical to her own. \"You aren't the first traveler to visit us, and we've learned from each one. Safe journey home—or perhaps I should say, forward.\"\n\nAs Maya's pod dematerialized, she understood the greatest archaeological mystery in history: the pyramids weren't tombs at all, but humanity's first attempt to reach the stars.",
    hints: [
      "Include specific details about the time period and setting.",
      "Make sure to specify the target audience in your prompt.",
      "Ask for a specific plot element (the twist) to make the story more engaging."
    ],
    totalSteps: 3
  },
  "2": {
    id: "2",
    title: "Create Accurate Summaries",
    description: "Master the art of writing prompts that produce concise, accurate summaries of complex information.",
    difficulty: "beginner" as const,
    goalDescription: "Write a prompt that generates a clear, concise summary of quantum computing that a high school student could understand.",
    examplePrompt: "Explain quantum computing in a concise summary that a high school student could understand. Cover the basic principles, how it differs from classical computing, and potential applications. Use simple analogies where helpful, and limit the explanation to 3-4 paragraphs.",
    targetResponse: "Quantum computing is a type of computing that uses quantum physics to solve problems too complex for regular computers. While classical computers use bits (0s and 1s) to process information, quantum computers use quantum bits or \"qubits\" which can exist in multiple states at once—kind of like being able to be both heads and tails simultaneously when flipping a coin.\n\nThis special property, called \"superposition,\" allows quantum computers to process vast amounts of information simultaneously. Another quantum property called \"entanglement\" lets qubits be connected in ways that classical bits can't, creating computational shortcuts. It's like having telepathic coins where flipping one instantly affects the other, no matter how far apart they are.\n\nQuantum computers excel at specific tasks like cracking complex codes, simulating molecules for drug discovery, optimizing logistics, and solving complex mathematical problems. However, they're not replacements for everyday computing—they're specialized tools for specific complex problems.\n\nWhile fully practical quantum computers are still being developed, they represent the next giant leap in computing power. When fully realized, they could solve problems in minutes that would take classical computers millions of years to crack.",
    hints: [
      "Specify the target audience (high school students) in your prompt.",
      "Ask for analogies to help explain complex concepts.",
      "Request a specific length or format for the summary."
    ],
    totalSteps: 3
  },
  // Add more challenges as needed
};

const ChallengePage = () => {
  const { id } = useParams<{ id: string }>();
  const challenge = id ? challengeData[id as keyof typeof challengeData] : null;
  const { toast } = useToast();
  
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [attempts, setAttempts] = useState(0);
  
  useEffect(() => {
    // Reset state when challenge changes
    setPrompt("");
    setAiResponse("");
    setShowTarget(false);
    setCurrentStep(1);
    setAttempts(0);
  }, [id]);
  
  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
            <p className="mb-6 text-muted-foreground">The challenge you're looking for doesn't exist or has been removed.</p>
            <Link to="/challenges" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to challenges
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleSubmitPrompt = async (userPrompt: string) => {
    setIsLoading(true);
    setPrompt(userPrompt);
    setAttempts(prev => prev + 1);
    
    try {
      const openaiApiKey = process.env.OPENAI_API_KEY;
      const huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;
      
      if (huggingfaceApiKey) {
        // Use Hugging Face API
        await callHuggingFaceAPI(userPrompt);
      } else if (openaiApiKey) {
        // Use OpenAI API
        await callOpenAIAPI(userPrompt);
      } else {
        // Fallback to simulated response
        await simulateResponse(userPrompt);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      setAiResponse("Sorry, there was an error processing your prompt. Please try again.");
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your prompt",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const callOpenAIAPI = async (userPrompt: string) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI assistant that teaches students about prompt engineering. Keep your responses concise and educational, with a friendly tone suitable for high school students."
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }
      
      const data = await response.json();
      const aiResponseText = data.choices[0].message.content;
      setAiResponse(aiResponseText);
      
      // Check if the response is close to the target
      evaluateResponse(aiResponseText);
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw error;
    }
  };
  
  const callHuggingFaceAPI = async (userPrompt: string) => {
    try {
      // Call Hugging Face Inference API
      const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: `<s>[INST] You are a helpful AI assistant that teaches students about prompt engineering. Keep your responses concise and educational, with a friendly tone suitable for high school students.\n\n${userPrompt} [/INST]`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }
      
      const data = await response.json();
      const aiResponseText = data[0].generated_text.split("[/INST]")[1].trim();
      setAiResponse(aiResponseText);
      
      // Check if the response is close to the target
      evaluateResponse(aiResponseText);
    } catch (error) {
      console.error("Hugging Face API error:", error);
      throw error;
    }
  };
  
  const simulateResponse = async (userPrompt: string) => {
    // Simulate API response with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple string similarity check (very basic simulation)
    const similarity = calculateSimilarity(userPrompt.toLowerCase(), challenge.examplePrompt.toLowerCase());
    
    if (similarity > 0.7) {
      // If prompt is similar to the example, return something close to the target
      setAiResponse(challenge.targetResponse);
      if (currentStep < challenge.totalSteps) {
        setCurrentStep(prev => prev + 1);
      }
      
      toast({
        title: "Great prompt!",
        description: "You're getting close to the goal!",
        duration: 3000,
      });
    } else if (similarity > 0.4) {
      // Somewhat similar prompt
      setAiResponse("Your prompt is on the right track, but could use more specificity to achieve the goal. " + 
        challenge.targetResponse.split(".").slice(0, 3).join(".") + "...");
      
      toast({
        description: "You're on the right track! Try being more specific.",
        duration: 3000,
      });
    } else {
      // Not very similar
      setAiResponse("Your prompt didn't quite achieve the goal. Try again using the hints provided. Remember that specificity and clarity are key to good prompt engineering.");
      
      toast({
        variant: "destructive",
        description: "Your prompt needs improvement. Check the hints for guidance.",
        duration: 3000,
      });
    }
  };
  
  const evaluateResponse = (aiResponseText: string) => {
    // Evaluate how close the response is to the target response
    const similarity = calculateSimilarity(aiResponseText.toLowerCase(), challenge.targetResponse.toLowerCase());
    
    if (similarity > 0.7) {
      if (currentStep < challenge.totalSteps) {
        setCurrentStep(prev => prev + 1);
      }
      
      toast({
        title: "Great prompt!",
        description: "You're getting close to the goal!",
        duration: 3000,
      });
    } else if (similarity > 0.4) {
      toast({
        description: "You're on the right track! Try being more specific.",
        duration: 3000,
      });
    } else {
      toast({
        variant: "destructive",
        description: "Your prompt needs improvement. Check the hints for guidance.",
        duration: 3000,
      });
    }
  };
  
  // Very basic string similarity function (for demo purposes only)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const words1 = new Set(str1.split(/\s+/));
    const words2 = new Set(str2.split(/\s+/));
    
    let matchCount = 0;
    words1.forEach(word => {
      if (words2.has(word)) matchCount++;
    });
    
    return matchCount / Math.max(words1.size, words2.size);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6">
            <Link to="/challenges" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to challenges
            </Link>
          </div>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold">{challenge.title}</h1>
                <p className="text-muted-foreground">{challenge.description}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  challenge.difficulty === "beginner" ? "bg-green-100 text-green-800" :
                  challenge.difficulty === "intermediate" ? "bg-blue-100 text-blue-800" :
                  "bg-purple-100 text-purple-800"
                }`}>
                  {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6 mb-8">
              <h2 className="text-xl font-semibold mb-3">Your Challenge</h2>
              <p className="mb-4">{challenge.goalDescription}</p>
              
              <ProgressTracker 
                currentStep={currentStep} 
                totalSteps={challenge.totalSteps} 
                className="mt-6"
                showLabels
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border border-border p-6 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Your Prompt</h2>
                    
                    <div className="text-sm text-muted-foreground">
                      Attempts: {attempts}
                    </div>
                  </div>
                  
                  <PromptInput 
                    onSubmit={handleSubmitPrompt}
                    isLoading={isLoading}
                    placeholder="Write your prompt here..."
                    tipText="Remember, clarity and specificity are key to effective prompts!"
                  />
                  
                  {aiResponse && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">AI Response</h3>
                      <ResultDisplay 
                        result={aiResponse} 
                        isSuccess={calculateSimilarity(aiResponse, challenge.targetResponse) > 0.7}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <div className="bg-card rounded-lg border border-border p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-3">Hints</h2>
                  <ul className="space-y-2">
                    {challenge.hints.map((hint, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <button
                    onClick={() => setShowTarget(!showTarget)}
                    className="w-full flex items-center justify-center gap-2 p-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    {showTarget ? (
                      <>
                        <RefreshCw className="h-4 w-4" />
                        Hide Target Response
                      </>
                    ) : (
                      <>
                        <Trophy className="h-4 w-4" />
                        Show Target Response
                      </>
                    )}
                  </button>
                  
                  {showTarget && (
                    <div className="mt-4">
                      <div className="mb-2 text-sm font-medium">Example Prompt:</div>
                      <div className="p-3 bg-muted rounded-lg mb-4 text-sm">
                        {challenge.examplePrompt}
                      </div>
                      
                      <div className="mb-2 text-sm font-medium">Target Response:</div>
                      <ResultDisplay 
                        result={challenge.targetResponse}
                        isTarget={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChallengePage;
