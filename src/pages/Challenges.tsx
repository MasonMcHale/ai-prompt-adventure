
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChallengeCard from "@/components/ChallengeCard";

const challengesData = [
  {
    id: "1",
    title: "Generate a Creative Story",
    description: "Learn how to craft prompts that generate engaging creative stories with specific themes and characters.",
    difficulty: "beginner" as const,
    completionRate: 0.85,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Create Accurate Summaries",
    description: "Master the art of writing prompts that produce concise, accurate summaries of complex information.",
    difficulty: "beginner" as const,
    completionRate: 0.78,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Design Specific Instructions",
    description: "Learn how to structure step-by-step instructions that get AI to follow specific procedures exactly.",
    difficulty: "intermediate" as const,
    completionRate: 0.62,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Extract Structured Data",
    description: "Discover techniques for prompting AI to process text and extract specific data in structured formats.",
    difficulty: "intermediate" as const,
    completionRate: 0.56,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "5",
    title: "Debug Code with AI",
    description: "Learn how to write effective prompts that help AI find and fix bugs in your code snippets.",
    difficulty: "advanced" as const,
    completionRate: 0.41,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Master Chain-of-Thought Prompting",
    description: "Advanced techniques for guiding AI through complex reasoning tasks by breaking down the thinking process.",
    difficulty: "advanced" as const,
    completionRate: 0.37,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
];

const Challenges = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredChallenges = filter === "all" 
    ? challengesData 
    : challengesData.filter(challenge => challenge.difficulty === filter);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              AI Prompt Challenges
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a challenge to test your prompt engineering skills. Each challenge has specific goals for you to achieve through crafting effective prompts.
            </p>
          </div>
          
          <div className="mb-8 flex justify-center">
            <div className="flex flex-wrap gap-2 bg-muted p-1 rounded-lg">
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${filter === "all" ? "bg-background shadow" : "hover:bg-background/50"}`}
              >
                All Levels
              </button>
              <button 
                onClick={() => setFilter("beginner")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${filter === "beginner" ? "bg-background shadow" : "hover:bg-background/50"}`}
              >
                Beginner
              </button>
              <button 
                onClick={() => setFilter("intermediate")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${filter === "intermediate" ? "bg-background shadow" : "hover:bg-background/50"}`}
              >
                Intermediate
              </button>
              <button 
                onClick={() => setFilter("advanced")}
                className={`px-4 py-2 text-sm font-medium rounded-md ${filter === "advanced" ? "bg-background shadow" : "hover:bg-background/50"}`}
              >
                Advanced
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                id={challenge.id}
                title={challenge.title}
                description={challenge.description}
                difficulty={challenge.difficulty}
                completionRate={challenge.completionRate}
                isCompleted={challenge.isCompleted}
                imageUrl={challenge.imageUrl}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
