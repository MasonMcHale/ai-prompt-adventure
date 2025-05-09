
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChallengeCard from "@/components/ChallengeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";

const textChallengesData = [
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
    title: "Crisis Management Assistant",
    description: "Learn how to create a comprehensive prompt that guides AI to assist in managing a corporate crisis scenario.",
    difficulty: "advanced" as const,
    completionRate: 0.41,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Data Validation Challenge",
    description: "Master complex data validation tasks by creating prompts that help AI identify and categorize problematic entries.",
    difficulty: "advanced" as const,
    completionRate: 0.37,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
];

const imageChallengesData = [
  {
    id: "101",
    title: "Basic Image Composition",
    description: "Learn to craft prompts that generate well-composed images with specific subjects and backgrounds.",
    difficulty: "beginner" as const,
    completionRate: 0.89,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "102",
    title: "Style and Aesthetics",
    description: "Master prompting techniques to control artistic style, lighting, and mood in generated images.",
    difficulty: "beginner" as const,
    completionRate: 0.76,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "103",
    title: "Character Design",
    description: "Create detailed character designs by learning how to describe physical attributes and personality traits.",
    difficulty: "intermediate" as const,
    completionRate: 0.65,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "104",
    title: "Scene Complexity",
    description: "Generate complex scenes with multiple elements and detailed interactions through careful prompting.",
    difficulty: "advanced" as const,
    completionRate: 0.48,
    isCompleted: false,
    imageUrl: "/placeholder.svg"
  },
];

const Challenges = () => {
  const [filter, setFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("text");
  
  const currentChallengesData = activeTab === "text" ? textChallengesData : imageChallengesData;
  
  const filteredChallenges = filter === "all" 
    ? currentChallengesData 
    : currentChallengesData.filter(challenge => challenge.difficulty === filter);

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
          
          <div className="mb-6 flex justify-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  Text Prompting
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  Image Prompting <span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">New</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
          
          <TabsContent value="text" className="mt-0">
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
          </TabsContent>
          
          <TabsContent value="image" className="mt-0">
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
          </TabsContent>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
