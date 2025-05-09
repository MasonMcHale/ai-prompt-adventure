
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChallengeCard from "@/components/ChallengeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const imageChallengesData = [
  {
    id: "img1",
    title: "Photorealistic Scene Creation",
    description: "Learn how to craft prompts that generate detailed photorealistic scenes with specific lighting and atmosphere.",
    difficulty: "beginner" as const,
    completionRate: 0.82,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
  },
  {
    id: "img2",
    title: "Character Design",
    description: "Master techniques for generating consistent character designs with specific features, clothing, and poses.",
    difficulty: "beginner" as const,
    completionRate: 0.75,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    id: "img3",
    title: "Artistic Style Adaptation",
    description: "Learn how to craft prompts that generate images in specific artistic styles, from Renaissance to modern art movements.",
    difficulty: "intermediate" as const,
    completionRate: 0.64,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b"
  },
  {
    id: "img4",
    title: "Conceptual Visualization",
    description: "Transform abstract concepts and ideas into visual representations through carefully crafted prompts.",
    difficulty: "intermediate" as const,
    completionRate: 0.59,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
  },
  {
    id: "img5",
    title: "Multi-Object Composition",
    description: "Master advanced techniques for generating complex scenes with multiple interacting objects with precise positioning.",
    difficulty: "advanced" as const,
    completionRate: 0.45,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3"
  },
  {
    id: "img6",
    title: "Technical Illustration",
    description: "Create detailed technical illustrations, diagrams, and cross-sections through specialized prompting techniques.",
    difficulty: "advanced" as const,
    completionRate: 0.39,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
  },
];

const Challenges = () => {
  const [textFilter, setTextFilter] = useState<string>("all");
  const [imageFilter, setImageFilter] = useState<string>("all");
  
  const filteredTextChallenges = textFilter === "all" 
    ? textChallengesData 
    : textChallengesData.filter(challenge => challenge.difficulty === textFilter);

  const filteredImageChallenges = imageFilter === "all" 
    ? imageChallengesData 
    : imageChallengesData.filter(challenge => challenge.difficulty === imageFilter);

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
          
          <Tabs defaultValue="text" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="text">Text Prompting</TabsTrigger>
                <TabsTrigger value="image">Image Prompting</TabsTrigger>
              </TabsList>
            </div>
          
            <TabsContent value="text">
              <div className="mb-8 flex justify-center">
                <div className="flex flex-wrap gap-2 bg-muted p-1 rounded-lg">
                  <button 
                    onClick={() => setTextFilter("all")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${textFilter === "all" ? "bg-background shadow" : "hover:bg-background/50"}`}
                  >
                    All Levels
                  </button>
                  <button 
                    onClick={() => setTextFilter("beginner")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${textFilter === "beginner" ? "bg-background shadow" : "hover:bg-background/50"}`}
                  >
                    Beginner
                  </button>
                  <button 
                    onClick={() => setTextFilter("intermediate")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${textFilter === "intermediate" ? "bg-background shadow" : "hover:bg-background/50"}`}
                  >
                    Intermediate
                  </button>
                  <button 
                    onClick={() => setTextFilter("advanced")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${textFilter === "advanced" ? "bg-background shadow" : "hover:bg-background/50"}`}
                  >
                    Advanced
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTextChallenges.map((challenge) => (
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
            
            <TabsContent value="image">
              <div className="mb-8 flex justify-center">
                <div className="flex flex-wrap gap-2 bg-muted p-1 rounded-lg">
                  <button 
                    onClick={() => setImageFilter("all")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${imageFilter === "all" ? "bg-background shadow" : "hover:bg-background/50"}`}
                  >
                    All Levels
                  </button>
                  <button 
                    onClick={() => setImageFilter("beginner")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${imageFilter === "beginner" ? "bg-background shadow" : "hover:bg-background/50"}`}
                  >
                    Beginner
                  </button>
                  <button 
                    onClick={() => setImageFilter("intermediate")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${imageFilter === "intermediate" ? "bg-background shadow" : "hover:bg-background/50"}`}
                  >
                    Intermediate
                  </button>
                  <button 
                    onClick={() => setImageFilter("advanced")}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${imageFilter === "advanced" ? "bg-background shadow" : "hover:bg-background/50"}`}
                  >
                    Advanced
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImageChallenges.map((challenge) => (
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
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
