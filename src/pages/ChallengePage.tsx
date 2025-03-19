
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromptInput from "@/components/PromptInput";
import ResultDisplay from "@/components/ResultDisplay";
import ProgressTracker from "@/components/ProgressTracker";
import { useState } from "react";

// Mock data for challenges
const challengesData = {
  "1": {
    title: "Generate a Creative Story",
    description: "Learn how to craft prompts that generate engaging creative stories with specific themes and characters.",
    difficulty: "beginner" as const,
    instructions: "Write a prompt that generates a short story about a magical forest and a lost explorer. The story should include a surprising twist and end on a hopeful note.",
    tips: [
      "Include specific details about the setting",
      "Define the main character's personality",
      "Specify the tone and atmosphere you want",
      "Ask for a specific story structure"
    ],
    objectives: [
      "Story includes a magical forest setting",
      "Features a lost explorer character",
      "Contains a surprising twist",
      "Ends with a hopeful tone",
      "Maintains coherent narrative structure"
    ]
  },
  "2": {
    title: "Create Accurate Summaries",
    description: "Master the art of writing prompts that produce concise, accurate summaries of complex information.",
    difficulty: "beginner" as const,
    instructions: "Write a prompt that will generate a concise 3-paragraph summary of climate change causes, effects, and solutions. The summary should be factually accurate and suitable for high school students.",
    tips: [
      "Specify the target length and format",
      "Define the key points to include",
      "Request appropriate language for the audience",
      "Ask for specific sections to be covered"
    ],
    objectives: [
      "Summary covers causes of climate change",
      "Includes major effects on the environment",
      "Presents practical solutions",
      "Uses language appropriate for high school level",
      "Maintains factual accuracy"
    ]
  },
  "3": {
    title: "Design Specific Instructions",
    description: "Learn how to structure step-by-step instructions that get AI to follow specific procedures exactly.",
    difficulty: "intermediate" as const,
    instructions: "Write a prompt that gets the AI to create a 5-step guide for building a simple website. Each step must start with an action verb, include exactly one example, and end with a tip for beginners.",
    tips: [
      "Be very explicit about the format",
      "Provide examples of what you want",
      "Describe the structure of each item",
      "Use clear constraints for each component"
    ],
    objectives: [
      "Guide contains exactly 5 steps",
      "Each step starts with an action verb",
      "Each step includes exactly one example",
      "Each step ends with a tip for beginners",
      "Content is factually correct about website building"
    ]
  },
  "4": {
    title: "Extract Structured Data",
    description: "Discover techniques for prompting AI to process text and extract specific data in structured formats.",
    difficulty: "intermediate" as const,
    instructions: "Write a prompt that asks the AI to extract product information (name, price, rating, features) from a product description and format it as a JSON object with specific fields.",
    tips: [
      "Specify the exact structure you want returned",
      "Provide clear field names and data types",
      "Give an example of the expected output format",
      "Include instructions for handling missing data"
    ],
    objectives: [
      "Correctly extracts product name",
      "Identifies and formats price as a number",
      "Captures rating information",
      "Lists key product features as an array",
      "Returns data in valid JSON format"
    ]
  },
  "5": {
    title: "Debug Code with AI",
    description: "Learn how to write effective prompts that help AI find and fix bugs in your code snippets.",
    difficulty: "advanced" as const,
    instructions: "Create a prompt that will help the AI identify and fix bugs in a Python function that should sort a list of dictionaries by a specific key but has multiple logical errors.",
    tips: [
      "Ask for specific explanations for each bug",
      "Request step-by-step reasoning",
      "Specify the programming language explicitly",
      "Request both the fixed code and an explanation"
    ],
    objectives: [
      "Identifies all logical errors in the code",
      "Provides corrected code that works properly",
      "Explains each bug and its solution",
      "Maintains the original code's intent",
      "Includes suggestions for code improvement"
    ]
  },
  "6": {
    title: "Master Chain-of-Thought Prompting",
    description: "Advanced techniques for guiding AI through complex reasoning tasks by breaking down the thinking process.",
    difficulty: "advanced" as const,
    instructions: "Design a prompt that guides the AI through solving a complex logical puzzle using chain-of-thought reasoning, showing each step of the deduction process before reaching the final answer.",
    tips: [
      "Ask the AI to think step by step",
      "Request explanations for each logical move",
      "Include instructions to consider alternative approaches",
      "Ask for verification of the final answer"
    ],
    objectives: [
      "Response shows clear step-by-step reasoning",
      "Each deduction step is logically sound",
      "Chain of thought reaches the correct conclusion",
      "Includes consideration of alternative possibilities",
      "Final answer includes verification"
    ]
  }
};

const ChallengePage = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  
  // Get challenge data based on ID from params
  const challenge = id ? challengesData[id as keyof typeof challengesData] : null;
  
  if (!challenge) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-24 pb-12 px-6">
          <div className="container max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Challenge Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">
              The challenge you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePromptSubmit = (prompt: string) => {
    // In a real app, you would send this to an AI service and get a response
    // For now, we'll simulate a response based on the prompt content
    const mockResult = `This is a simulated AI response for your prompt: "${prompt}".
    
    The actual integration with an AI service would go here, processing your prompt and returning a real response based on the prompt engineering challenge.
    
    For this demonstration, we'll just acknowledge that you submitted a prompt for challenge #${id}: ${challenge.title}.`;
    
    setResult(mockResult);
    setAttempts(attempts + 1);
    
    // Simulate progress update (a real app would evaluate the result against objectives)
    if (progress < 100) {
      const newProgress = Math.min(100, progress + Math.floor(Math.random() * 25) + 5);
      setProgress(newProgress);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{challenge.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{challenge.description}</p>
            <div className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-muted">
              {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)} Level
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Challenge Instructions</h2>
                <p className="text-sm mb-6">{challenge.instructions}</p>
                
                <h3 className="text-sm font-semibold mb-2">Objectives:</h3>
                <ul className="space-y-2 mb-6">
                  {challenge.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="bg-primary/10 text-primary rounded-full p-1 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 7.5L7 9.5L10 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {objective}
                    </li>
                  ))}
                </ul>
                
                <h3 className="text-sm font-semibold mb-2">Prompt Tips:</h3>
                <ul className="space-y-2">
                  {challenge.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
                <ProgressTracker progress={progress} attempts={attempts} />
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl border p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Write Your Prompt</h2>
                <PromptInput onSubmit={handlePromptSubmit} />
              </div>
              
              {result && (
                <div className="bg-card rounded-xl border p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">AI Response</h2>
                  <ResultDisplay result={result} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChallengePage;
