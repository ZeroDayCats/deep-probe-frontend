import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, Paperclip, Square } from "lucide-react";
import { ToolSelector } from "./ToolSelector";
import {
  DISPLAY_TO_TOOL_NAME,
  getToolDisplayName,
  transformToBackend,
} from "../../config/toolsConfig";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  isLoading = false,
}) => {
  const [message, setMessage] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [toolMode, setToolMode] = useState<"auto" | "none" | "manual">("auto");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync selectedTools with @mentions in text
  useEffect(() => {
    if (toolMode === "manual") {
      const mentions = message.match(/@(\w+)/g) || [];
      const currentMentionedTools = mentions
        .map((mention) => DISPLAY_TO_TOOL_NAME[mention.slice(1)])
        .filter(Boolean);

      const currentSet = new Set(selectedTools.sort());
      const mentionedSet = new Set(currentMentionedTools.sort());

      const arraysEqual =
        currentSet.size === mentionedSet.size &&
        [...currentSet].every((x) => mentionedSet.has(x));

      if (!arraysEqual) {
        setSelectedTools(currentMentionedTools);
      }
    }
  }, [message, toolMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() && !disabled) {
      let finalMessage = message.trim();

      if (toolMode === "manual") {
        finalMessage = transformToBackend(finalMessage);
      } else if (toolMode === "none") {
        finalMessage = `[NO_TOOLS] ${finalMessage}`;
      }

      onSendMessage(finalMessage);
      setMessage("");
      setSelectedTools([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleToolSelect = (toolName: string) => {
    const toolDisplayName = getToolDisplayName(toolName);
    const mention = `@${toolDisplayName} `;

    setMessage((prev) => prev + mention);
    setSelectedTools((prev) => {
      if (!prev.includes(toolName)) {
        return [...prev, toolName];
      }
      return prev;
    });

    if (toolMode !== "manual") {
      setToolMode("manual");
    }

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  const handleRemoveTool = (toolName: string) => {
    const toolDisplayName = getToolDisplayName(toolName);
    const mention = `@${toolDisplayName}`;

    setMessage((prev) => prev.replace(new RegExp(`${mention}\\s*`, "g"), ""));
    setSelectedTools((prev) => prev.filter((t) => t !== toolName));
  };

  const handleModeChange = (mode: "auto" | "none" | "manual") => {
    setToolMode(mode);
    if (mode !== "manual") {
      const cleanedMessage = message.replace(/@\w+\s*/g, "");
      setMessage(cleanedMessage);
      setSelectedTools([]);
    }
  };

  return (
    <div className="border-t border-zinc-200/50 bg-white/80 backdrop-blur-lg p-3">
      <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="relative rounded-xl border border-zinc-200 bg-white shadow-sm focus-within:border-brand-400 transition-all">
            <div className="flex items-center justify-between px-3 pt-2">
              <ToolSelector
                onToolSelect={handleToolSelect}
                selectedTools={selectedTools}
                onRemoveTool={handleRemoveTool}
                onModeChange={handleModeChange}
                currentMode={toolMode}
              />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1 text-zinc-400 hover:text-zinc-600"
                >
                  <Paperclip size={14} />
                </button>
                <button
                  type="button"
                  className="p-1 text-zinc-400 hover:text-zinc-600"
                >
                  <Mic size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-end gap-2 px-3 pb-2">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  toolMode === "auto"
                    ? "Ask anything..."
                    : toolMode === "none"
                    ? "Ask anything (no tools)..."
                    : "Ask anything... @Tool to specify tools"
                }
                disabled={disabled}
                className="flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-zinc-400"
                rows={1}
              />
              <button
                type="submit"
                disabled={!message.trim() || disabled || isLoading}
                className="flex items-center justify-center rounded-lg bg-brand-600 p-1.5 text-white hover:bg-brand-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? <Square size={14} /> : <Send size={14} />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
