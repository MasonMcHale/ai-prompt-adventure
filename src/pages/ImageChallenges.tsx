
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChallengeCard from "@/components/ChallengeCard";

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

const ImageChallenges = () => {
  const [imageFilter, setImageFilter] = useState<string>("all");
  
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
              Image Prompt Challenges
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Test your skills in creating image generation prompts. Learn how to guide AI to create specific visual styles, compositions, and effects.
            </p>
          </div>
          
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
                linkPrefix="/image-challenge/"
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImageChallenges;
