import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromptInput from "@/components/PromptInput";
import ResultDisplay from "@/components/ResultDisplay";
import ProgressTracker from "@/components/ProgressTracker";

// Mock challenge data with steps - in a real app, this would come from an API
const challengeData = {
  "1": {
    id: "1",
    title: "Generate a Creative Story",
    description:
      "Learn how to craft prompts that generate engaging creative stories with specific themes and characters.",
    difficulty: "beginner" as const,
    steps: [
      {
        stepNumber: 1,
        goalDescription:
          "Create a prompt that generates a short story about a time traveler visiting ancient Egypt. The story should include a plot twist and be suitable for a young adult audience.",
        examplePrompt:
          "Write a short story about a time traveler who accidentally lands in ancient Egypt during the construction of the pyramids. Include a surprising plot twist at the end. The story should be exciting and suitable for young adult readers.",
        targetResponse:
          "The sun beat down mercilessly as Maya's time pod malfunctioned, leaving her stranded in ancient Egypt circa 2500 BCE. The Great Pyramid of Giza was only half-constructed, its limestone blocks gleaming white in the desert sun.\n\nDisguising her modern clothing with a worker's tunic she'd stolen from a washing line, Maya infiltrated the construction site, hoping to find materials to repair her pod. The overseer, a stern man named Khufu, took notice of her unusual knowledge and assigned her to the architectural team.\n\nFor weeks, Maya worked alongside the Egyptians, marveling at their ingenuity. She formed a friendship with a scribe named Imhotep, who shared the pharaoh's plans for the afterlife.\n\n\"The chambers are designed to guide the pharaoh to the stars,\" Imhotep explained.\n\nOne night, Maya discovered hieroglyphs that didn't match the period. They depicted her time pod and contained technical specifications for interstellar travel. With a shock, she realized the truth: The Egyptians weren't building a tomb—they were constructing a launch site for their own time travel experiments.\n\nWhen she finally repaired her pod, Imhotep wasn't surprised. \"We've been waiting for someone like you for centuries,\" he said, revealing a small device identical to her own. \"You aren't the first traveler to visit us, and we've learned from each one. Safe journey home—or perhaps I should say, forward.\"\n\nAs Maya's pod dematerialized, she understood the greatest archaeological mystery in history: the pyramids weren't tombs at all, but humanity's first attempt to reach the stars.",
        hints: [
          "Include specific details about the time period and setting.",
          "Make sure to specify the target audience in your prompt.",
          "Ask for a specific plot element (the twist) to make the story more engaging.",
        ],
      },
      {
        stepNumber: 2,
        goalDescription:
          "Create a prompt that generates a short fantasy story about a magical forest with mythical creatures. The story should have a moral lesson and be targeted at middle-grade readers.",
        examplePrompt:
          "Write a fantasy story about a child who discovers a hidden magical forest filled with mythical creatures like unicorns and fairies. The story should include a moral lesson about respecting nature and be suitable for middle-grade readers (ages 8-12). Keep the tone whimsical but include one moment of tension or conflict.",
        targetResponse:
          "Eliot had been warned never to venture into Whisperleaf Woods after sunset, but the strange blue light dancing between the trees was too tempting to ignore.\n\nSlipping past the ancient oak that marked the forest boundary, Eliot followed the pulsing glow deeper into the woods. The usual forest sounds—chirping crickets, hooting owls—fell silent, replaced by what sounded almost like... singing?\n\n\"You're late,\" came a voice, sharp and clear. A small figure, no taller than Eliot's knee, stepped out from behind a mushroom that definitely hadn't been large enough to hide behind. The creature had pointed ears and eyes that shifted colors like opals catching light.\n\n\"I... I wasn't aware I was expected,\" Eliot stammered.\n\nThe fairy—for that's what she must be—rolled her eyes. \"All humans say that. Yet you're drawn here all the same when the Moonbloom flowers open. Come, the Council awaits.\"\n\nEliot followed the fairy to a clearing where the trees formed a perfect circle. Creatures from storybooks filled the space: centaurs with bows strapped to their backs, foxes with multiple tails, miniature dragons perched on branches, and a majestic unicorn whose horn spiraled up like twisted glass.\n\n\"Another human child,\" announced a centaur with a chestnut coat. \"Perhaps this one will listen.\"\n\nThe unicorn stepped forward, its hooves leaving tiny glowing prints in the moss. \"Our forest is dying, young one. The river that feeds our magic runs polluted with your kind's waste. The Moonblooms bloom fewer each year.\"\n\nEliot noticed then what had been missed before—the dullness in the creatures' coats, the wilting flowers, the thinning trees.\n\n\"What can I do?\" Eliot asked. \"I'm just a kid.\"\n\nThe fairy from before landed on Eliot's shoulder. \"Children see what adults forget to look for. Children believe what adults refuse to accept. Children act when adults hesitate.\"\n\nThat night, Eliot learned about the delicate balance of the magical ecosystem—how the unicorns' horns purified water, how fairy dust helped plants grow, how dragon breath kept invasive insects at bay.\n\nBefore dawn, Eliot made a promise to the Council: to organize a creek cleanup, to plant native species along the forest edge, to convince the town to reduce its plastic usage.\n\n\"Small actions,\" the unicorn told Eliot, touching its horn gently to the child's forehead, \"create great changes when done with pure intent.\"\n\nEliot left Whisperleaf Woods with a sprinkling of fairy dust in one pocket and a dragon scale in the other—reminders of a promise made.\n\nThree months later, when Eliot returned with news of the successful creek cleanup, the Moonblooms were growing again, their blue light stronger than before. The forest welcomed Eliot not as a visitor, but as a guardian.\n\nSometimes the most magical power isn't found in spells or enchanted creatures, but in the simple choice to care for the world around us.",
        hints: [
          "Specify the target age range in your prompt.",
          "Request a specific moral lesson or theme.",
          "Ask for particular creatures or magical elements to appear in the story.",
        ],
      },
      {
        stepNumber: 3,
        goalDescription:
          "Create a prompt that generates a science fiction story set on a space colony. The story should explore themes of isolation and community, and include futuristic technology that plays a key role in the plot.",
        examplePrompt:
          "Write a science fiction story set on humanity's first Mars colony in the year 2150. The story should follow a young engineer who discovers a flaw in the colony's life support system that no one else has noticed. Include themes of isolation, community responsibility, and the relationship between humans and technology. The story should feature futuristic technology that's plausible and plays a crucial role in resolving the conflict.",
        targetResponse:
          "Ria Patel moved her hand through the holographic overlay of Mars Colony Artemis's life support systems, the red and green indicators flowing around her fingers like digital currents. At twenty-six, she was the youngest environmental systems engineer on the colony, which either meant she was brilliant or they were desperate. Probably both.\n\n\"Sixteen months on this red dustball,\" Ria muttered to herself, rotating a 3D segment of oxygen recyclers in the virtual interface projected from her wrist terminal. \"And I'm talking to myself again.\"\n\nThe colony housed 183 people—scientists, engineers, agricultural specialists, medical personnel—humanity's first permanent settlement beyond Earth. Their habitation modules formed a spiral pattern across the rust-colored landscape, connected by enclosed walkways that extended from the central Hub like spokes on a wheel.\n\nRia's quarters, like everyone else's, measured exactly twelve square meters. Minimal physical possessions, maximum digital storage. Efficient. Logical. Lonely.\n\nIt was during her routine maintenance review that she first noticed it—an anomalous pattern in the CO2 scrubbing system. Not an emergency, not even a warning. Just...odd. A fractional efficiency decrease in Module 7, where the agricultural labs were located.\n\n\"Computer, historical comparison of Module 7 atmospheric processing, three-month visualization,\" Ria commanded.\n\nThe air in front of her filled with a time-lapse graph. There it was—a subtle but persistent downward trend, so gradual that the automated systems hadn't flagged it.\n\nRia brought her findings to Director Chen during the weekly systems meeting. The older woman frowned at the projection.\n\n\"It's within acceptable parameters, Engineer Patel. Perhaps you're being overcautious.\"\n\n\"With respect, Director, acceptable now doesn't mean acceptable three months from now. The pattern suggests—\"\n\n\"We have pressing concerns with the water reclamation system in Module 3. Focus your attention there.\"\n\nRia nodded stiffly. \"Yes, Director.\"\n\nThe dismissal stung, but Mars had taught her patience. That night, she programmed her personal nanobots—technically against protocol for off-duty use—to collect additional data from Module 7 during her sleep cycle.\n\nThe next morning, her terminal pulsed with findings. The nanobots had detected microscopic fractures in Module 7's external shell, too small for standard sensors to identify. During Martian nights, when the temperature plummeted to minus 100 degrees Celsius, the fractures contracted. During the day, they expanded. Each cycle released infinitesimal amounts of oxygen into the thin Martian atmosphere.\n\nRia ran a projection. In approximately four months, the cumulative loss would exceed the colony's ability to regenerate oxygen fast enough.\n\nShe compiled her evidence and sent it directly to the entire engineering department. Responses ranged from dismissive to hostile—resources were already stretched thin, her methodology was unorthodox, her conclusions alarmist.\n\nOnly one person responded differently: Dr. Alejandro Reyes, the colony's materials scientist.\n\n\"I've been working on something that might help,\" he told her over a shared meal of hydroponically grown vegetables and lab-cultured protein. \"Self-healing polymerics. They're not approved for structural applications yet, but...\"\n\n\"But neither is oxygen deficiency,\" Ria finished.\n\nThey worked in secret for weeks, modifying Ria's nanobots to deliver Alejandro's experimental polymer to the microscopic fractures. The bots would need to work in coordination, forming a lattice across the affected areas while simultaneously applying the compound.\n\n\"It's never been tested on this scale,\" Alejandro warned as they finalized the programming.\n\n\"Mars is all about firsts,\" Ria replied, trying to sound more confident than she felt.\n\nWhen they deployed their solution, the entire colony gathered in the Hub to watch the exterior cameras. At first, nothing seemed to happen. Then, a subtle shimmer appeared across Module 7's surface as thousands of nanobots moved in perfect synchrony, weaving the self-healing polymer into the structure itself.\n\nThree days later, Ria's monitors showed the oxygen levels stabilizing. A week after that, efficiency increased beyond the original baseline.\n\nDirector Chen called Ria and Alejandro to her office. Ria expected a reprimand for circumventing proper channels. Instead, the Director's usual stern expression had softened.\n\n\"Sometimes,\" Chen said, \"I forget that we're not just surviving here. We're learning how to live differently. How to see problems differently.\" She gestured toward the window, where the rust-colored horizon stretched endlessly. \"Isolation makes us cautious, sometimes too cautious. Community makes us brave.\"\n\nThe Director looked directly at Ria. \"Your nanobot delivery system and Dr. Reyes's polymer will be implemented across all modules, with full credit to both of you. And I'll be recommending a review of our anomaly detection parameters.\"\n\nSix months later, Ria stood in the newly constructed observation dome—built with the polymer-enhanced materials now known colony-wide as the Patel-Reyes Composite. Around her, other colonists pointed at constellations or the distant Earth, a blue pinprick in the black sky.\n\nAlejandro joined her at the railing. \"Not bad for a couple of troublemakers,\" he said.\n\nRia smiled, watching her breath fog slightly on the dome's interior. Visible breath—a small thing that reminded her they were all, every day, creating something that hadn't existed before: an atmosphere of their own making, in more ways than one.\n\n\"On Mars,\" she replied, \"the troublemakers are the ones who keep us breathing.\"",
        hints: [
          "Include a specific time period or setting detail in your prompt.",
          "Request exploration of particular themes or philosophical questions.",
          "Ask for technological elements that drive the plot forward.",
        ],
      },
    ],
    totalSteps: 3,
  },
  "2": {
    id: "2",
    title: "Create Accurate Summaries",
    description:
      "Master the art of writing prompts that produce concise, accurate summaries of complex information.",
    difficulty: "beginner" as const,
    steps: [
      {
        stepNumber: 1,
        goalDescription:
          "Write a prompt that generates a clear, concise summary of quantum computing that a high school student could understand.",
        examplePrompt:
          "Explain quantum computing in a concise summary that a high school student could understand. Cover the basic principles, how it differs from classical computing, and potential applications. Use simple analogies where helpful, and limit the explanation to 3-4 paragraphs.",
        targetResponse:
          'Quantum computing is a type of computing that uses quantum physics to solve problems too complex for regular computers. While classical computers use bits (0s and 1s) to process information, quantum computers use quantum bits or "qubits" which can exist in multiple states at once—kind of like being able to be both heads and tails simultaneously when flipping a coin.\n\nThis special property, called "superposition," allows quantum computers to process vast amounts of information simultaneously. Another quantum property called "entanglement" lets qubits be connected in ways that classical bits can\'t, creating computational shortcuts. It\'s like having telepathic coins where flipping one instantly affects the other, no matter how far apart they are.\n\nQuantum computers excel at specific tasks like cracking complex codes, simulating molecules for drug discovery, optimizing logistics, and solving complex mathematical problems. However, they\'re not replacements for everyday computing—they\'re specialized tools for specific complex problems.\n\nWhile fully practical quantum computers are still being developed, they represent the next giant leap in computing power. When fully realized, they could solve problems in minutes that would take classical computers millions of years to crack.',
        hints: [
          "Specify the target audience (high school students) in your prompt.",
          "Ask for analogies to help explain complex concepts.",
          "Request a specific length or format for the summary.",
        ],
      },
      {
        stepNumber: 2,
        goalDescription:
          "Create a prompt that generates a clear summary of climate change causes and impacts for a middle school science class.",
        examplePrompt:
          "Write a summary of climate change that would be appropriate for a middle school science class. Explain the main causes of climate change, its major environmental impacts, and how it affects human communities. Use clear, age-appropriate language and helpful comparisons. Include 2-3 key facts with numbers. Keep the summary to 4-5 paragraphs and maintain a factual, educational tone without being overwhelming.",
        targetResponse:
          "Climate change refers to long-term shifts in temperatures and weather patterns across our planet. While these changes can occur naturally, since the 1800s, human activities have been the main driver of climate change, primarily due to burning fossil fuels like coal, oil, and gas, which produces heat-trapping gases.\n\nWhen we burn fossil fuels in our cars, factories, and power plants, we release greenhouse gases (mainly carbon dioxide) into the atmosphere. These gases work like a blanket around Earth – they let sunlight in but trap heat that would normally escape back to space. This is called the greenhouse effect. Since the Industrial Revolution began around 1750, carbon dioxide levels have increased by nearly 50%, reaching levels not seen in 2 million years.\n\nThe effects of climate change are already visible and widespread. Global temperatures have risen about 1.1°C (2°F) since the late 1800s, causing polar ice and glaciers to melt. This melting ice has contributed to sea levels rising about 8-9 inches since 1880, and the rate is accelerating. Weather patterns are becoming more extreme, with some places experiencing more intense droughts while others face stronger hurricanes and heavier rainfall than in the past.\n\nClimate change affects ecosystems and wildlife too. Many animals are migrating to cooler areas or changing their seasonal behaviors, but some species can't adapt quickly enough. Coral reefs, which are home to 25% of all marine life, are dying as oceans get warmer and more acidic. Scientists estimate that 70-90% of coral reefs could disappear in the next 20 years if warming continues at the current rate.\n\nHuman communities are also feeling the impacts of climate change. Some coastal cities regularly experience flooding during high tides. Farmers in many regions face changing growing seasons and more frequent crop failures due to unusual weather. Public health is affected too, as heat waves become more common and disease-carrying insects spread to new areas. While these challenges are serious, scientists agree that by reducing greenhouse gas emissions and adapting to changes that are already happening, we can avoid the worst impacts of climate change.",
        hints: [
          "Specify the age group or grade level in your prompt.",
          "Request specific details about the length and tone.",
          "Ask for statistics or numerical facts to support the explanation.",
        ],
      },
      {
        stepNumber: 3,
        goalDescription:
          "Create a prompt that generates a concise explanation of how artificial intelligence works for business professionals with no technical background.",
        examplePrompt:
          "Write a clear, jargon-free explanation of how modern artificial intelligence systems work for business professionals with no technical background. Focus on the fundamental concepts of machine learning, neural networks, and how AI 'learns' from data. Use business-relevant analogies and examples that non-technical readers would understand. Keep the explanation under 5 paragraphs and include a brief mention of common business applications of AI without getting into technical details.",
        targetResponse:
          "Artificial intelligence (AI) at its core is technology that enables computers to perform tasks that typically require human intelligence. Rather than being explicitly programmed with specific instructions for every situation, modern AI systems learn patterns from data—much like how a new employee might learn from examples and experience rather than following a rigid handbook.\n\nThe foundation of today's AI is machine learning, which is comparable to how your video streaming service learns your preferences. When you watch certain shows or movies, the system notes these choices and recognizes patterns to recommend similar content. Similarly, AI systems analyze thousands or millions of examples to identify patterns and make predictions or decisions based on new information they encounter.\n\nNeural networks, a powerful type of machine learning, are inspired by the human brain's structure. Imagine a large company where information passes through multiple departments before reaching a decision. In a neural network, data flows through interconnected layers that each extract and process different features of the information, transforming raw input (like customer data) into meaningful output (like purchase predictions). The system adjusts its internal connections based on whether its predictions are correct, gradually improving its accuracy.\n\nFor instance, when an AI system learns to identify potential sales opportunities, it isn't programmed with a specific rule like \"if a customer visits the pricing page three times, they're ready to buy.\" Instead, it analyzes thousands of historical customer journeys, learning which behavioral patterns most often led to purchases. The AI might discover complex combinations of behaviors that human analysts would never notice, such as specific sequences of page visits combined with time-of-day patterns and product comparison activities.\n\nBusiness applications of AI are already widespread and diverse. Customer service chatbots can handle routine inquiries while routing complex issues to human agents. Predictive analytics tools forecast market trends and customer behaviors to inform strategic decisions. AI-powered tools can analyze contracts and other documents in minutes rather than the hours it would take human reviewers. And in marketing, AI helps personalize communications at scale, ensuring each customer receives the most relevant content. The key advantage in all these applications is that AI can process and find patterns in vast amounts of data far beyond what would be practical for human analysis.",
        hints: [
          "Specify the target audience (business professionals) in your prompt.",
          "Request business-relevant examples or analogies.",
          "Ask for a specific length and jargon-free language.",
        ],
      },
    ],
    totalSteps: 3,
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
  const [responsePass, setResponsePass] = useState(false);
  const [promptPass, setPromptPass] = useState(false);

  // Get the current step data
  const getCurrentStepData = () => {
    if (!challenge) return null;
    return challenge.steps.find(step => step.stepNumber === currentStep) || null;
  };

  const currentStepData = getCurrentStepData();

  useEffect(() => {
    // Reset state when challenge changes
    setPrompt("");
    setAiResponse("");
    setShowTarget(false);
    setCurrentStep(1);
    setAttempts(0);
    setResponsePass(false);
    setPromptPass(false);
  }, [id]);

  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Challenge Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The challenge you're looking for doesn't exist or has been
              removed.
            </p>
            <Link
              to="/challenges"
              className="inline-flex items-center text-primary hover:underline"
            >
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
    setAttempts((prev) => prev + 1);

    try {
      const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;

      if (apiKey) {
        // First get the response to the user's prompt
        const responseResult = await callHuggingFaceAPIForResponse(userPrompt);

        // Then evaluate that response and the prompt in parallel
        const [responseEvaluation, promptEvaluation] = await Promise.all([
          callHuggingFaceAPIForResponseEvaluation(responseResult),
          callHuggingFaceAPIForPromptEvaluation(userPrompt),
        ]);

        // Check for PASS/FAIL in evaluations
        const isResponsePass =
          !responseEvaluation.includes("(FAIL)") &&
          responseEvaluation.includes("(PASS)");
        const isPromptPass =
          !promptEvaluation.includes("(FAIL)") &&
          promptEvaluation.includes("(PASS)");

        setResponsePass(isResponsePass);
        setPromptPass(isPromptPass);

        console.log("Response Pass:", isResponsePass);
        console.log("Prompt Pass:", isPromptPass);

        // Combine the results
        setAiResponse(
          `=== AI RESPONSE ===\n${responseResult}\n\n=== RESPONSE EVALUATION ===\n${responseEvaluation}\n\n=== PROMPT EVALUATION ===\n${promptEvaluation}`
        );

        // Show toast based on pass/fail status
        if (isResponsePass && isPromptPass) {
          // Move to next step if both pass and there are more steps
          if (currentStep < challenge.totalSteps) {
            setCurrentStep((prev) => prev + 1);
            toast({
              title: "Challenge step complete!",
              description: "Moving to the next step. Both your prompt and the response passed the evaluation.",
              duration: 3000,
            });
          } else {
            // Final step completed
            toast({
              title: "Challenge complete!",
              description: "Congratulations! You've completed all steps of this challenge.",
              duration: 3000,
            });
          }
        } else if (isPromptPass) {
          toast({
            description:
              "Your prompt was well-crafted, but the response didn't meet the goal.",
            duration: 3000,
          });
        } else if (isResponsePass) {
          toast({
            description:
              "You got a good response, but try improving your prompt structure.",
            duration: 3000,
          });
        } else {
          toast({
            variant: "destructive",
            description:
              "Both your prompt and the response need improvement. Check the hints.",
            duration: 3000,
          });
        }
      } else {
        // Fallback to simulated response
        await simulateResponse(userPrompt);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      setAiResponse(
        "Sorry, there was an error processing your prompt. Please try again."
      );

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

  // New function to get just the response
  const callHuggingFaceAPIForResponse = async (userPrompt: string) => {
    try {
      const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            inputs: `<s>[INST] You are an AI that needs to help the user with the following request:${userPrompt} [/INST]`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      const data = await response.json();
      return data[0].generated_text.split("[/INST]")[1].trim();
    } catch (error) {
      console.error("Hugging Face API response error:", error);
      throw error;
    }
  };

  // Function to evaluate the response
  const callHuggingFaceAPIForResponseEvaluation = async (
    aiResponse: string
  ) => {
    if (!currentStepData) return "Evaluation not available";
    
    try {
      const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            inputs: `<s>[INST] 
CHALLENGE GOAL: ${currentStepData.goalDescription}

EVALUATION INSTRUCTIONS:
1. Evaluate if the following AI response meets the challenge goal above
2. Compare this response to what would be expected for the challenge
3. After your evaluation, you MUST conclude with either (PASS) or (FAIL) and make sure to use parentheses
4. Provide a brief explanation for your decision

TARGET RESPONSE: ${currentStepData.targetResponse.substring(0, 200)}...

AI RESPONSE TO EVALUATE: 
${aiResponse}
[/INST]`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      const data = await response.json();
      return data[0].generated_text.split("[/INST]")[1].trim();
    } catch (error) {
      console.error("Hugging Face API evaluation error:", error);
      throw error;
    }
  };

  // Function to evaluate the prompt itself
  const callHuggingFaceAPIForPromptEvaluation = async (userPrompt: string) => {
    if (!currentStepData) return "Evaluation not available";
    
    try {
      const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            inputs: `<s>[INST] 
CHALLENGE GOAL: ${currentStepData.goalDescription}

EXAMPLE PROMPT: ${currentStepData.examplePrompt}

EVALUATION INSTRUCTIONS:
1. Evaluate if the following user prompt is well-crafted to achieve the challenge goal
2. Consider clarity, specificity, and instructions in the prompt
3. After your evaluation, you MUST conclude with either (PASS) or (FAIL) and make sure to use parentheses
4. Provide a brief explanation for your decision

USER PROMPT TO EVALUATE: 
${userPrompt}
[/INST]`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
      }

      const data = await response.json();
      return data[0].generated_text.split("[/INST]")[1].trim();
    } catch (error) {
      console.error("Hugging Face API prompt evaluation error:", error);
      throw error;
    }
  };

  const simulateResponse = async (userPrompt: string) => {
    if (!currentStepData) return;
    
    // Simulate API response with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple string similarity check (very basic simulation)
    const similarity = calculateSimilarity(
      userPrompt.toLowerCase(),
      currentStepData.examplePrompt.toLowerCase()
    );

    // Set pass/fail status based on similarity
    const simResponsePass = similarity > 0.7;
    const simPromptPass = similarity > 0.6;

    setResponsePass(simResponsePass);
    setPromptPass(simPromptPass);

    if (simResponsePass && simPromptPass) {
      // Both pass - great result
      setAiResponse(currentStepData.targetResponse);

      // Move to next step if both pass and there are more steps
      if (currentStep < challenge.totalSteps) {
        setCurrentStep((prev) => prev + 1);
        toast({
          title: "Challenge step complete!",
          description: "Moving to the next step. Both your prompt and the response passed the evaluation.",
          duration: 3000,
        });
      } else {
        // Final step completed
        toast({
          title: "Challenge complete!",
          description: "Congratulations! You've completed all steps of this challenge.",
          duration: 3000,
        });
      }
    } else if (simPromptPass) {
      // Only prompt passes
      setAiResponse(
        "Your prompt is well-structured, but the response doesn't quite achieve the goal. " +
          currentStepData.targetResponse.split(".").slice(0, 2).join(".") +
          "..."
      );

      toast({
        description:
          "Your prompt was well-crafted, but the response didn't meet the goal.",
        duration: 3000,
      });
    } else if (simResponsePass) {
      // Only response passes
      setAiResponse(
        "You got a good response, but your prompt could be more specific. " +
          currentStepData.targetResponse.split(".").slice(0, 3).join(".") +
          "..."
      );

      toast({
        description:
          "You got a good response, but try improving your prompt structure.",
        duration: 3000,
      });
    } else {
      // Neither passes
      setAiResponse(
        "Your prompt didn't quite achieve the goal. Try again using the hints provided. Remember that specificity and clarity are key to good prompt engineering."
      );

      toast({
        variant: "destructive",
        description:
          "Both your prompt and the response need improvement. Check the hints.",
        duration: 3000,
      });
    }
  };

  // Very basic string similarity function (for demo purposes only)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const words1 = new Set(str1.split(/\s+/));
    const words2 = new Set(str2.split(/\s+/));

    let matchCount = 0;
    words1.forEach((word) => {
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
            <Link
              to="/challenges"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
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
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    challenge.difficulty === "beginner"
                      ? "bg-green-100 text-green-800"
                      : challenge.difficulty === "intermediate"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {challenge.difficulty.charAt(0).toUpperCase() +
                    challenge.difficulty.slice(1)}
                </span>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6 mb-8">
              <h2 className="text-xl font-semibold mb-3">Your Challenge</h2>
              <p className="mb-4">{currentStepData?.goalDescription}</p>

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
                        isSuccess={responsePass}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-card rounded-lg border border-border p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-3">Hints</h2>
                  <ul className="space-y-2">
                    {currentStepData?.hints.map((hint, index) => (
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

                  {showTarget && currentStepData && (
                    <div className="mt-4">
                      <div className="mb-2 text-sm font-medium">
                        Example Prompt:
                      </div>
                      <div className="p-3 bg-muted rounded-lg mb-4 text-sm">
                        {currentStepData.examplePrompt}
                      </div>

                      <div className="mb-2 text-sm font-medium">
                        Target Response:
                      </div>
                      <ResultDisplay
                        result={currentStepData.targetResponse}
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
