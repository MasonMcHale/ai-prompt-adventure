import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Brain, Lightbulb } from "lucide-react";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  tipText?: string;
}

const PromptInput = ({
  onSubmit,
  placeholder = "Type your prompt here...",
  isLoading = false,
  tipText,
}: PromptInputProps) => {
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize the textarea
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative flex items-start overflow-hidden rounded-2xl border ${
            isFocused
              ? "border-primary ring-2 ring-primary/20"
              : "border-border"
          } bg-background shadow-sm transition-all duration-200`}
        >
          <div className="flex items-start justify-center w-10 pt-3 pl-2 flex-shrink-0">
            <Brain
              className={`w-5 h-5 ${
                isLoading
                  ? "text-primary animate-pulse"
                  : "text-muted-foreground"
              }`}
            />
          </div>

          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-3 py-3 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[44px] overflow-hidden"
            disabled={isLoading}
            rows={1}
          />

          <button
            type="submit"
            className={`flex items-center justify-center h-10 px-4 mr-1 rounded-xl transition-all duration-200 mt-2 flex-shrink-0 ${
              prompt.trim() && !isLoading
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            }`}
            disabled={!prompt.trim() || isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <SendHorizontal className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {tipText && (
        <div className="mt-2 flex items-start px-2">
          <Lightbulb className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Tip:</span> {tipText}
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptInput;
