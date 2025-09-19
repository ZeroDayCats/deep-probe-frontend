import React from "react";
import ReactMarkdown from "react-markdown";
import { Bot, User, ExternalLink } from "lucide-react";
import type { MessageHistory } from "../../types";
import { LinkPreviewContainer } from "../UI/LinkPreviewContainer";
import { ModernToolBadges } from "../UI/ToolIcon";
import { transformToDisplay } from "../../config/toolsConfig";

interface MessageBubbleProps {
  message: MessageHistory;
}

const convertUrlsToMarkdown = (text: string): string => {
  const urlRegex = /(?<!\]\()https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;

  return text.replace(urlRegex, (url) => {
    const beforeUrl = text.substring(0, text.indexOf(url));
    if (beforeUrl.endsWith("](")) {
      return url;
    }

    let linkText = url.replace(/^https?:\/\//, "").replace(/^www\./, "");
    if (linkText.length > 50) {
      linkText = linkText.substring(0, 47) + "...";
    }

    return `[${linkText}](${url})`;
  });
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  // 🔄 Transform content using centralized DRY function
  const displayContent = isUser 
    ? transformToDisplay(message.content)  // Transform user messages
    : message.content;  // Keep assistant messages as-is

  const processedContent = isAssistant
    ? convertUrlsToMarkdown(displayContent)
    : displayContent;

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg relative">
            <Bot size={18} className="text-white" />
            {/* Glowing indicator when tools were used */}
            {message.tools_used && message.tools_used.length > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`max-w-4xl ${isUser ? "order-first" : ""}`}>
        <div
          className={`rounded-2xl px-5 py-4 ${
            isUser
              ? "bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-lg"
              : "bg-white border border-zinc-200 shadow-sm"
          }`}
        >
          {isAssistant ? (
            <div className="prose prose-sm max-w-none prose-headings:text-zinc-800 prose-p:text-zinc-700 prose-p:leading-relaxed prose-strong:text-zinc-900">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="mb-4 last:mb-0 text-zinc-700 leading-relaxed">
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-xl font-bold text-zinc-900 mb-3 mt-6 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg font-semibold text-zinc-900 mb-3 mt-5 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-semibold text-zinc-800 mb-2 mt-4 first:mt-0">
                      {children}
                    </h3>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium hover:underline transition-colors"
                    >
                      <ExternalLink size={14} className="flex-shrink-0" />
                      <span className="underline decoration-brand-300 hover:decoration-brand-500 underline-offset-2">
                        {children}
                      </span>
                    </a>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 space-y-2 pl-6 list-disc marker:text-brand-500">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 space-y-2 pl-6 list-decimal marker:text-brand-500">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-zinc-700 leading-relaxed">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-brand-200 bg-brand-50 pl-4 py-2 my-4 italic text-zinc-600">
                      {children}
                    </blockquote>
                  ),
                  //@ts-ignore
                  code: ({ inline, children }) =>
                    inline ? (
                      <code className="bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-zinc-100 text-zinc-800 p-3 rounded-lg text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                        {children}
                      </code>
                    ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-zinc-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-zinc-600">{children}</em>
                  ),
                  hr: () => <hr className="my-6 border-zinc-200" />,
                }}
              >
                {processedContent}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-white leading-relaxed">{processedContent}</p>
          )}
        </div>

        {/* Link Previews - Only show for assistant messages */}
        {isAssistant && <LinkPreviewContainer content={message.content} />}

        {/* Modern Tool Badges - No timestamp, circular badges */}
        {message.tools_used && message.tools_used.length > 0 && (
          <ModernToolBadges tools={message.tools_used} />
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-zinc-300 to-zinc-400 shadow-lg">
            <User size={18} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};
