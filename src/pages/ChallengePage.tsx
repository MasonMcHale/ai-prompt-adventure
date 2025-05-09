import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, RefreshCw, Sparkles, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromptInput from "@/components/PromptInput";
import ResultDisplay from "@/components/ResultDisplay";
import ProgressTracker from "@/components/ProgressTracker";

interface ChallengeStep {
  stepNumber: number;
  goalDescription: string;
  examplePrompt: string;
  targetResponse: string;
  hints: string[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: ChallengeStep[];
  totalSteps: number;
}

const challengeData: { [key: string]: Challenge } = {
  "1": {
    id: "1",
    title: "Generate a Creative Story",
    description: "Learn how to craft prompts that generate engaging creative stories with specific themes and characters.",
    difficulty: "beginner" as const,
    steps: [
      {
        stepNumber: 1,
        goalDescription: "Write a prompt that generates a short story about a dragon who befriends a knight.",
        examplePrompt: "Write a short story about a dragon who befriends a knight.",
        targetResponse: "In a realm of ancient lore, a fearsome dragon with scales of emerald met a valiant knight clad in shining armor. Instead of clashing swords, they discovered a shared love for riddles and tales. They forged an unlikely friendship, soaring through skies and sharing secrets under the starry expanse, proving that friendship can bloom in the most unexpected of places.",
        hints: [
          "Consider specifying the tone or style of the story you want.",
          "Think about adding details about the dragon and knight's personalities."
        ]
      }
    ],
    totalSteps: 1,
  },
  "2": {
    id: "2",
    title: "Create Accurate Summaries",
    description: "Master the art of writing prompts that produce concise, accurate summaries of complex information.",
    difficulty: "beginner" as const,
    steps: [
      {
        stepNumber: 1,
        goalDescription: "Create a prompt that summarizes the plot of 'Romeo and Juliet' in under 50 words.",
        examplePrompt: "Summarize the plot of Romeo and Juliet in under 50 words.",
        targetResponse: "In Verona, Romeo and Juliet, from feuding families, fall deeply in love. They secretly marry, but tragic misunderstandings lead to their untimely deaths, ending the bitter conflict of their families.",
        hints: [
          "Specify the length or word count you want for the summary.",
          "Consider asking for a summary that focuses on specific aspects of the story."
        ]
      }
    ],
    totalSteps: 1,
  },
  "3": {
    id: "3",
    title: "Design Specific Instructions",
    description: "Learn how to structure step-by-step instructions that get AI to follow specific procedures exactly.",
    difficulty: "intermediate" as const,
    steps: [
      {
        stepNumber: 1,
        goalDescription: "Write a prompt that instructs the AI to create a recipe for chocolate chip cookies.",
        examplePrompt: "Write a recipe for chocolate chip cookies, including ingredients and step-by-step instructions.",
        targetResponse: "**Ingredients:**\n- 2 1/4 cups all-purpose flour\n- 1 tsp baking soda\n- 1 tsp salt\n- 1 cup (2 sticks) unsalted butter, softened\n- 3/4 cup granulated sugar\n- 3/4 cup packed brown sugar\n- 1 tsp vanilla extract\n- 2 large eggs\n- 2 cups chocolate chips\n\n**Instructions:**\n1. Preheat oven to 375°F (190°C).\n2. In a small bowl, whisk together flour, baking soda, and salt.\n3. In a large bowl, cream together the butter, granulated sugar, and brown sugar until smooth.\n4. Beat in the vanilla extract and eggs until well combined.\n5. Gradually add the dry ingredients to the wet ingredients, mixing until just combined.\n6. Stir in the chocolate chips.\n7. Drop by rounded tablespoons onto ungreased baking sheets.\n8. Bake for 9-11 minutes, or until golden brown.\n9. Let cool on baking sheets for a few minutes before transferring to a wire rack to cool completely.",
        hints: [
          "Break down the instructions into clear, concise steps.",
          "Specify the desired format for the recipe (e.g., ingredients list, step-by-step instructions)."
        ]
      }
    ],
    totalSteps: 1,
  },
  "4": {
    id: "4",
    title: "Extract Structured Data",
    description: "Discover techniques for prompting AI to process text and extract specific data in structured formats.",
    difficulty: "intermediate" as const,
    steps: [
      {
        stepNumber: 1,
        goalDescription: "Create a prompt that extracts the names, emails, and phone numbers from a block of text.",
        examplePrompt: "Extract the names, emails, and phone numbers from the following text:\n\nJohn Doe, johndoe@example.com, (555) 123-4567\nJane Smith, janesmith@example.com, (555) 987-6543",
        targetResponse: "**Name:** John Doe\n**Email:** johndoe@example.com\n**Phone:** (555) 123-4567\n\n**Name:** Jane Smith\n**Email:** janesmith@example.com\n**Phone:** (555) 987-6543",
        hints: [
          "Specify the data fields you want to extract.",
          "Provide clear examples of the format you want the data in."
        ]
      }
    ],
    totalSteps: 1,
  },
  "5": {
    id: "5",
    title: "Crisis Management Assistant",
    description: "Master advanced prompting for simulating an AI crisis-management advisor that helps executives analyze and respond to breaches.",
    difficulty: "advanced" as const,
    steps: [
      {
        stepNumber: 1,
        goalDescription: "Create a prompt that simulates an AI crisis-management assistant for NexusTech executives dealing with a data breach.",
        examplePrompt: "Act as a crisis management advisor for NexusTech's executive team. Your role is to analyze the breach, recommend immediate actions, draft key communications, and propose a recovery strategy—balancing technical, legal, and PR demands.\n\nFor the breach assessment:\n- Summarize the critical risks (technical, legal, reputational) based on the breach scope.\n- Prioritize immediate technical steps (e.g., patch vulnerabilities, isolate systems).\n\nFor legal & compliance:\n- List GDPR/CCPA requirements (e.g., 72-hour reporting window, user notifications).\n- Draft an internal checklist for legal teams to ensure compliance.\n\nFor stakeholder communication:\n- Write a 200-word public statement for customers (transparent but non-panicked tone).\n- Outline key talking points for investor calls (emphasizing remediation steps).\n\nFor long-term recovery:\n- Propose 3 strategies to rebuild trust (e.g., free credit monitoring, security audits).\n- Design a 6-month roadmap for improving cybersecurity posture.\n\nConstraints: Avoid technical jargon in customer communications. Flag any legally sensitive phrasing. Balance urgency with accuracy in all recommendations.",
        targetResponse: "# Crisis Management Response Plan for NexusTech Data Breach\n\n## Breach Assessment\n\n### Critical Risks\n\n**Technical Risks:**\n- Unauthorized access to customer PII (names, emails, billing addresses)\n- Exposed payment transaction IDs (but no full credit card numbers or CVVs)\n- Potential access to internal systems via compromised admin credentials\n- Backdoor installation possibility in web application framework\n\n**Legal Risks:**\n- GDPR violations (European customers affected): potential fines up to 4% of annual revenue\n- CCPA compliance issues (California customers affected)\n- Potential class action lawsuits from affected customers\n- Regulatory investigations from multiple jurisdictions\n\n**Reputational Risks:**\n- Customer trust erosion in core product security capabilities\n- Negative media coverage likely given NexusTech's market position\n- Competitor exploitation of incident in sales processes\n- Investor confidence impact and potential stock price volatility\n\n### Immediate Technical Steps (Priority Order)\n\n1. **Isolate Affected Systems** - Immediately segregate compromised database servers and applications from the main network.\n2. **Patch Vulnerability** - Deploy emergency patch to API authentication system and input validation routines.\n3. **Force Password Reset** - Implement mandatory password changes for all internal systems and customer accounts.\n4. **Enhanced Monitoring** - Deploy additional logging and monitoring to detect any ongoing or new intrusion attempts.\n5. **Engage Forensics** - Activate relationship with external forensics firm to begin investigation while preserving evidence.\n\n## Legal & Compliance\n\n### Regulatory Requirements\n\n**GDPR Requirements:**\n- Report breach to lead supervisory authority within 72 hours\n- Document all breach details and response actions\n- Notify affected EU customers \"without undue delay\" if high risk to rights and freedoms\n- Maintain detailed records of data compromised and remediation steps\n\n**CCPA Requirements:**\n- Provide notice to California residents in \"plain language\"\n- Detail types of information breached\n- Offer direct notification (email/mail) to affected individuals\n- Update privacy policies to reflect incident and response if necessary\n\n### Legal Team Compliance Checklist\n\n- [ ] Document breach discovery timeline and initial response actions\n- [ ] Engage external privacy counsel to advise on multi-jurisdiction approach\n- [ ] Draft regulatory notifications for each applicable jurisdiction\n- [ ] Prepare evidence preservation protocol and litigation hold notices\n- [ ] Review insurance policy coverage and notify cyber insurance provider\n- [ ] Assess notification requirements for business partners/vendors\n- [ ] Prepare template response for law enforcement inquiries\n- [ ] Review vendor/partner contracts for breach notification obligations\n- [ ] Document remediation efforts with timestamps and responsible parties\n\n## Stakeholder Communication\n\n### Customer Public Statement (200 words)\n\n**NOTICE OF DATA SECURITY INCIDENT**\n\nOn [Date], NexusTech detected unauthorized access to certain systems containing customer information. We immediately launched an investigation with leading cybersecurity experts and are working with law enforcement.\n\nOur investigation indicates that some customer names, email addresses, and billing addresses may have been accessed. Transaction IDs were also exposed, but no complete payment card numbers, security codes, or passwords were compromised. However, we recommend monitoring your accounts for suspicious activity as a precaution.\n\nWe've taken immediate steps to secure our systems, including patching the vulnerability, resetting access credentials, and enhancing monitoring across our network. All customer accounts remain fully operational.\n\nNexusTech is committed to transparency throughout this process. We are directly contacting affected customers with specific guidance and offering 12 months of free credit and identity monitoring services.\n\nWe understand the vital importance of data security and deeply regret this incident. Our team is working around the clock to ensure the ongoing protection of your information.\n\nFor more information, please visit nexustech.com/security-update or contact our dedicated response team at 1-800-XXX-XXXX.\n\n*[Note: Legal has flagged that we should avoid stating \"deeply regret this incident\" as it could imply liability. Consider alternative wording.]*\n\n### Investor Call Talking Points\n\n- **Incident Containment**: The breach has been contained and there is no evidence of ongoing unauthorized access. All production systems remain operational with minimal service disruption.\n\n- **Business Continuity**: Customer churn remains within normal parameters. No major clients have terminated services, and our sales pipeline remains strong.\n\n- **Financial Impact**: We have set aside a preliminary reserve of $3.5M for incident response, customer protection services, and potential regulatory fines. This represents less than 2% of annual operating expenses.\n\n- **Response Leadership**: Our executive team is directly overseeing the incident response, with our CISO providing 24/7 management of technical remediation efforts.\n\n- **Remediation Progress**: We have already implemented 80% of our immediate action items, including deployment of additional security controls that were previously scheduled for next quarter.\n\n- **Expert Support**: We've engaged Mandiant for forensic investigation, Covington & Burling for legal counsel, and Edelman for crisis communications support.\n\n- **Internal Accountability**: The Board's Risk Committee is receiving daily briefings, and a special committee has been formed to review the incident and our security program holistically.\n\n## Long-Term Recovery\n\n### Trust Rebuilding Strategies\n\n1. **Enhanced Security Transparency Program**\n   - Launch a security dashboard showing real-time status of NexusTech security systems\n   - Publish quarterly security reports audited by a Big Four accounting firm\n   - Create customer security council with representatives from major clients to provide direct feedback on security initiatives\n\n2. **Customer Protection Package**\n   - Provide 12 months of premium identity theft protection and credit monitoring\n   - Offer identity theft insurance coverage up to $1M per affected customer\n   - Establish dedicated support line staffed by identity protection specialists for affected customers\n\n3. **Third-Party Validation Program**\n   - Undergo SOC 2 Type II recertification with expanded security controls\n   - Commission independent security assessment by recognized industry experts\n   - Implement a bug bounty program with significant rewards for security researchers\n\n### Six-Month Cybersecurity Roadmap\n\n**Month 1: Immediate Hardening**\n- Complete emergency patching of all internet-facing systems\n- Implement additional WAF rules and API rate limiting\n- Deploy multi-factor authentication across all internal systems\n- Conduct targeted security training for development and operations teams\n\n**Month 2: Detection Enhancement**\n- Expand SIEM coverage to all critical systems\n- Implement advanced endpoint detection and response tools\n- Establish 24/7 security operations center with third-party support\n- Deploy enhanced data loss prevention controls\n\n**Month 3: Access Control Overhaul**\n- Implement zero-trust architecture for internal systems\n- Review and reduce privileged access across all environments\n- Deploy privileged access management solution\n- Enhance network segmentation between critical systems\n\n**Month 4: Security Process Improvement**\n- Revise incident response playbooks based on lessons learned\n- Implement automated security testing in CI/CD pipeline\n- Establish vulnerability management program with strict SLAs\n- Create security architecture review board for all new projects\n\n**Month 5: Supply Chain Security**\n- Audit all third-party integrations and vendor access\n- Implement vendor security scoring system\n- Deploy enhanced monitoring for third-party access\n- Revise vendor security requirements and assessment process\n\n**Month 6: Validation and Compliance**\n- Conduct red team exercise with external security firm\n- Complete gap analysis against NIST Cybersecurity Framework\n- Update security policies and procedures documentation\n- Prepare board presentation on security program maturity improvements",
        hints: [
          "Structure your prompt with clear sections for each aspect of the crisis response.",
          "Include specific tasks for the AI to complete within each section.",
          "Add constraints about tone and content to get appropriate outputs for different audiences."
        ]
      }
    ],
    totalSteps: 1,
  },
  "6": {
    id: "6",
    title: "Data Validation Challenge",
    description: "Learn how to prompt AI to identify and classify errors in messy user data while extracting valid information.",
    difficulty: "advanced" as const,
    steps: [
      {
        stepNumber: 1,
        goalDescription: "Create a prompt that asks AI to analyze a messy sign-up sheet and separate valid entries from those with errors.",
        examplePrompt: "I have a sign-up sheet with some problematic entries. I need you to analyze the data and separate it into valid sign-ups and entries with errors.\n\nHere's the data:\n\nName: Alice, Email: alice@example.com\nName: Bob, Email: bob@example.com\nName: Charlie, Email: charlie at gmail.com\nName: , Email: unknown@example.com\nName: Eve, Email: \n\nValid sign-ups must have:\n1. A non-blank name\n2. An email address containing the \"@\" symbol\n\nFor valid sign-ups, format them as:\n- Name (email)\n\nFor invalid sign-ups, explain what's wrong with each one:\n- Name – \"Error message\"",
        targetResponse: "# Data Validation Results\n\n## Valid Sign-Ups:\n- Alice (alice@example.com)\n- Bob (bob@example.com)\n\n## Errors:\n- Charlie – \"Email is invalid\" (contains \"at\" instead of \"@\")\n- (Unnamed person) – \"Missing name\" (name field is blank)\n- Eve – \"Missing email\" (email field is blank)\n\nSummary: 2 valid entries, 3 entries with errors",
        hints: [
          "Be specific about the validation criteria in your prompt.",
          "Provide clear examples of how you want the data formatted.",
          "Specify how error cases should be handled and reported."
        ]
      }
    ],
    totalSteps: 1,
  },
};

const ChallengePage = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const challenge = challengeData[challengeId as string];

  useEffect(() => {
    if (challengeId && !challenge) {
      toast({
        title: "Error",
        description: "Challenge not found.",
        variant: "destructive",
      });
    }
  }, [challengeId, challenge, toast]);

  const handlePromptSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, just echo the prompt as the result
      setAiResult(userPrompt);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI result.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUserPrompt("");
    setAiResult("");
    setCurrentStep(1);
  };

  if (!challenge) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-24 pb-12 px-6">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Challenge Not Found
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The requested challenge could not be found. Please check the URL
                or select a challenge from the challenges page.
              </p>
              <Link
                to="/challenges"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary hover:bg-secondary/80 bg-primary text-primary-foreground h-10 py-2 px-4 mt-4"
              >
                Back to Challenges
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentChallengeStep = challenge.steps[currentStep - 1];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="container max-w-7xl mx-auto">
          <Link to="/challenges" className="inline-flex items-center mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Challenges
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {challenge.title}
            </h1>
            <p className="text-lg text-muted-foreground">{challenge.description}</p>
          </div>

          <ProgressTracker
            currentStep={currentStep}
            totalSteps={challenge.totalSteps}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Step {currentStep}: {currentChallengeStep.goalDescription}
              </h2>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Example Prompt:</h3>
                <div className="border rounded-md bg-muted p-4">
                  <p className="text-sm">{currentChallengeStep.examplePrompt}</p>
                </div>
              </div>

              <PromptInput
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onSubmit={handlePromptSubmit}
                isLoading={isLoading}
              />

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary hover:bg-secondary/80 h-10 py-2 px-4 bg-destructive text-destructive-foreground"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset
                </button>

                {currentStep < challenge.totalSteps ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary hover:bg-secondary/80 h-10 py-2 px-4 bg-primary text-primary-foreground"
                  >
                    Next Step <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary hover:bg-secondary/80 h-10 py-2 px-4 bg-green-500 text-white"
                    onClick={() =>
                      toast({
                        title: "Challenge Completed!",
                        description: "Congratulations on completing this challenge!",
                        icon: <Trophy className="mr-2 h-4 w-4" />,
                      })
                    }
                  >
                    Complete Challenge <Trophy className="ml-2 h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">AI Result</h2>
              <ResultDisplay result={aiResult} targetResponse={currentChallengeStep.targetResponse} />

              {currentChallengeStep.hints && currentChallengeStep.hints.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Hints:</h3>
                  <ul className="list-disc pl-5">
                    {currentChallengeStep.hints.map((hint, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {hint}
                      </li>
                    ))}
                  </ul>
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
