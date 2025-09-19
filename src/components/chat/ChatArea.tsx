import React, { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { CompactToolStack } from "../UI/ToolIcon";
import type { MessageHistory } from "../../types";
import { 
  Bot, 
  Sparkles, 
  Search, 
  Newspaper, 
  TrendingUp, 
  Map, 
  Github, 
  Heart,
  ArrowRight,
  Zap
} from "lucide-react";

interface ChatAreaProps {
  messages: MessageHistory[];
  isLoading?: boolean;
  currentTools?: string[];
  onExampleClick?: (example: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  isLoading,
  currentTools = [],
  onExampleClick,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Quick example prompts with icons
  const examples = [
    {
      icon: <Search size={16} className="text-blue-600" />,
      text: "Search for latest AI research",
      query: "Find recent research papers on artificial intelligence and machine learning"
    },
    {
      icon: <Newspaper size={16} className="text-orange-600" />,
      text: "Get today's tech news",
      query: "What are the latest technology news and developments today?"
    },
    {
      icon: <TrendingUp size={16} className="text-green-600" />,
      text: "Analyze stock trends",
      query: "Show me current stock market trends and top performing stocks"
    },
    {
      icon: <Map size={16} className="text-violet-600" />,
      text: "Find locations nearby",
      query: "Help me find the nearest restaurants and their locations"
    },
    {
      icon: <Github size={16} className="text-slate-700" />,
      text: "Search GitHub repos",
      query: "Find the most popular React libraries and frameworks on GitHub"
    },
    {
      icon: <Heart size={16} className="text-red-600" />,
      text: "Medical research",
      query: "Find recent medical research on diabetes treatment and prevention"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-50/50 to-white">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {messages.length === 0 ? (
          // 🎨 Beautiful Empty State
          <div className="flex h-full min-h-[70vh] items-center justify-center">
            <div className="text-center max-w-4xl mx-auto">
              
              {/* 🤖 Animated Hero Section */}
              <div className="relative mb-12">
                <div className="relative h-28 w-28 mx-auto mb-8">
                  {/* Main bot circle with glow */}
                  <div className="h-28 w-28 rounded-3xl bg-gradient-to-tr from-brand-500 via-brand-600 to-brand-400 shadow-2xl shadow-brand-500/25" />
                  
                  {/* Bot icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Bot size={56} className="text-white drop-shadow-lg" />
                  </div>
                  
                  {/* Pulse animation */}
                  <div className="absolute inset-0 animate-pulse rounded-3xl bg-brand-400/20" />
                  
                  {/* Floating sparkles */}
                  <div className="absolute -top-2 -right-2 animate-bounce">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <Sparkles size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -left-3 animate-bounce delay-300">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                      <Zap size={12} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Welcome text */}
                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                  How can I help you today?
                </h2>
                <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto leading-relaxed">
                  Ask me anything, and I'll research it using my advanced tools
                </p>
                <p className="text-gray-500 max-w-xl mx-auto">
                  including web search, news analysis, GitHub repos, maps, and more.
                </p>
              </div>

              {/* 🎯 Quick Examples Grid */}
              <div className="mb-12">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Sparkles size={18} className="text-brand-500" />
                  <h3 className="text-lg font-semibold text-gray-700">
                    Try these examples
                  </h3>
                  <Sparkles size={18} className="text-brand-500" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => onExampleClick?.(example.query)}
                      className="group p-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-brand-50 hover:border-brand-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left relative overflow-hidden"
                    >
                      {/* Gradient background on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative flex items-start gap-3">
                        <div className="flex-shrink-0 p-2.5 rounded-xl bg-gray-50 group-hover:bg-white transition-colors duration-200 shadow-sm">
                          {example.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors mb-1">
                            {example.text}
                          </p>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                            <ArrowRight size={12} className="text-brand-500" />
                            <span className="text-xs text-brand-600 font-medium">Click to try</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 🌟 Feature Highlights */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                <div className="flex items-center justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="font-medium">Real-time data</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse delay-100"></div>
                    <span className="font-medium">Multiple sources</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse delay-200"></div>
                    <span className="font-medium">Instant results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 💬 Messages Display
          <div className="space-y-8">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            
            {/* 🔄 Enhanced Loading State */}
            {isLoading && (
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg relative">
                  <LoadingSpinner size="sm" />
                  {/* Glowing indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl bg-white border border-zinc-200 px-5 py-4 shadow-sm">
                    <div className="flex items-center gap-3 text-zinc-500">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-brand-400 animate-typing" />
                        <div
                          className="h-2 w-2 rounded-full bg-brand-400 animate-typing"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="h-2 w-2 rounded-full bg-brand-400 animate-typing"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        Deep Probe is researching...
                      </span>
                    </div>
                  </div>
                  {currentTools.length > 0 && (
                    <div className="mt-3 flex items-center gap-3">
                      <CompactToolStack tools={currentTools} />
                      <span className="text-xs text-zinc-500">
                        Using tools: {currentTools.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
