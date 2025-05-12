
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromptInput from "@/components/PromptInput";
import ResultDisplay from "@/components/ResultDisplay";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Define image challenge data structure
interface ImageChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  completionRate: number;
  isCompleted: boolean;
  imageUrl: string;
  instructions: string;
  targetDescription: string;
  tips: string[];
}

// Image challenge data
const imageChallengesData: ImageChallenge[] = [
  {
    id: "img1",
    title: "Photorealistic Scene Creation",
    description: "Learn how to craft prompts that generate detailed photorealistic scenes with specific lighting and atmosphere.",
    difficulty: "beginner",
    completionRate: 0.82,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    instructions: "Create a prompt that would generate a photorealistic landscape scene with golden hour lighting and atmospheric fog.",
    targetDescription: "A breathtaking landscape at golden hour with mountains in the background, a lake reflecting the warm light, and atmospheric fog adding depth to the scene.",
    tips: [
      "Specify the time of day and lighting conditions precisely",
      "Include details about atmospheric elements like fog or mist",
      "Mention specific landscape features you want to include",
      "Use descriptive adjectives for mood and style"
    ]
  },
  {
    id: "img2",
    title: "Character Design",
    description: "Master techniques for generating consistent character designs with specific features, clothing, and poses.",
    difficulty: "beginner",
    completionRate: 0.75,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    instructions: "Write a prompt to generate a detailed character portrait of a cyberpunk detective with specific clothing, accessories, and lighting.",
    targetDescription: "A close-up portrait of a weathered cyberpunk detective with cybernetic eye enhancements, wearing a worn leather trench coat, standing in neon-lit rain at night.",
    tips: [
      "Describe facial features and expressions in detail",
      "Specify clothing styles, materials, and colors",
      "Include environmental context that enhances character identity",
      "Mention specific lighting that sets the mood"
    ]
  },
  {
    id: "img3",
    title: "Artistic Style Adaptation",
    description: "Learn how to craft prompts that generate images in specific artistic styles, from Renaissance to modern art movements.",
    difficulty: "intermediate",
    completionRate: 0.64,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    instructions: "Create a prompt that would generate a still life composition of fruits and flowers in the style of Dutch Golden Age painting.",
    targetDescription: "A detailed still life painting in the style of Dutch Golden Age masters featuring a copper bowl of ripe fruits, wilting flowers, and a half-peeled lemon on a dark wooden table with dramatic chiaroscuro lighting.",
    tips: [
      "Reference specific artists from your target art style",
      "Describe characteristic elements of the art style (lighting, composition, etc.)",
      "Include appropriate subject matter for the chosen style",
      "Specify technical elements like brushwork, texture, or color palette"
    ]
  },
  {
    id: "img4",
    title: "Conceptual Visualization",
    description: "Transform abstract concepts and ideas into visual representations through carefully crafted prompts.",
    difficulty: "intermediate",
    completionRate: 0.59,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    instructions: "Write a prompt to visualize the abstract concept of 'time' in a surrealistic style.",
    targetDescription: "A surrealistic interpretation of time showing melting clocks draped over barren tree branches in a desert landscape, inspired by Salvador Dalí but with a modern digital art approach.",
    tips: [
      "Break down abstract concepts into visual metaphors",
      "Specify artistic style that best communicates your concept",
      "Use sensory language to evoke emotions related to the concept",
      "Reference visual symbols commonly associated with the abstract idea"
    ]
  },
  {
    id: "img5",
    title: "Multi-Object Composition",
    description: "Master advanced techniques for generating complex scenes with multiple interacting objects with precise positioning.",
    difficulty: "advanced",
    completionRate: 0.45,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
    instructions: "Create a prompt for a complex scene with multiple objects: a futuristic laboratory with scientists, equipment, and experiments in progress.",
    targetDescription: "A detailed wide-angle view of a futuristic laboratory with three scientists in protective suits working at different stations, holographic displays floating in the foreground, complex equipment with glowing elements in the middle ground, and specimen containment units along the walls in the background.",
    tips: [
      "Use spatial language (foreground, background, left, right, etc.) to position elements",
      "Specify the number of objects/people and their relationships",
      "Establish a clear focal point for the composition",
      "Provide details about lighting and atmosphere to unify the scene"
    ]
  },
  {
    id: "img6",
    title: "Technical Illustration",
    description: "Create detailed technical illustrations, diagrams, and cross-sections through specialized prompting techniques.",
    difficulty: "advanced",
    completionRate: 0.39,
    isCompleted: false,
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    instructions: "Write a prompt to generate a detailed technical cross-section illustration of a modern electric vehicle showing its key components.",
    targetDescription: "A clean, precise technical cross-section illustration of an electric vehicle showing the battery pack, electric motors, power electronics, cooling system, and passenger compartment with labeled components, in an isometric view with a blueprint aesthetic.",
    tips: [
      "Specify the type of technical illustration (cross-section, exploded view, etc.)",
      "List all important components that should be visible",
      "Mention the desired perspective and viewing angle",
      "Include details about labeling, color coding, or other information design elements"
    ]
  }
];

const ImageChallengePage = () => {
  const { id } = useParams();
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Find the current challenge based on the id parameter
  const challenge = imageChallengesData.find((c) => c.id === id);

  // Simulate image generation (in a real app, this would call an AI service)
  const handleSubmitPrompt = (prompt: string) => {
    setUserPrompt(prompt);
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // In a real app, you would call an API to generate the image
      // For now, we'll just use the challenge image as a placeholder
      setGeneratedImage(challenge?.imageUrl || "");
      setIsLoading(false);
    }, 2000);
  };

  if (!challenge) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-24 pb-12 px-6">
          <div className="container max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6">Challenge not found</h1>
            <p>The challenge you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShowSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="container max-w-4xl mx-auto">
          {/* Challenge Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{challenge.title}</h1>
            <div className="flex items-center mb-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-md mr-3 ${
                challenge.difficulty === "beginner" ? "bg-green-100 text-green-700" : 
                challenge.difficulty === "intermediate" ? "bg-yellow-100 text-yellow-700" : 
                "bg-red-100 text-red-700"
              }`}>
                {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(challenge.completionRate * 100)}% completion rate
              </span>
            </div>
            <p className="text-lg text-muted-foreground">{challenge.description}</p>
          </div>
          
          {/* Challenge Instructions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Challenge Instructions</CardTitle>
              <CardDescription>Follow these instructions to complete the challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{challenge.instructions}</p>
              
              <div className="space-y-2">
                <h4 className="font-medium">Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {challenge.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground">{tip}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Prompt Input */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Prompt</h2>
            <PromptInput 
              onSubmit={handleSubmitPrompt}
              placeholder="Write your image generation prompt here..."
              isLoading={isLoading}
              tipText="Be specific about details like style, lighting, composition, and subject matter."
            />
          </div>
          
          {/* Generated Result */}
          {generatedImage && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Generated Result</h2>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <img 
                  src={generatedImage} 
                  alt="AI Generated" 
                  className="w-full h-auto object-contain" 
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">Your Prompt</h3>
                  <p className="text-sm text-muted-foreground mb-4">{userPrompt}</p>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={handleShowSolution}
                      className="px-4 py-2 text-sm font-medium text-primary hover:underline"
                    >
                      {showSolution ? "Hide Target Example" : "Show Target Example"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Target Result (shown when requested) */}
          {showSolution && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Target Result Example</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Target Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{challenge.targetDescription}</p>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <img 
                      src={challenge.imageUrl} 
                      alt="Target example" 
                      className="w-full h-auto object-contain" 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImageChallengePage;
