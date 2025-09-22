import React from "react";
import {
  Search,
  Newspaper,
  TrendingUp,
  BookOpen,
  Youtube,
  Play,
  Globe,
  Cloud,
  Wrench,
  Stethoscope, // PubMed
  Map, // Maps
  Github, // GitHub
  Flag, // Countries
  Clock, // Timezone
  Plane,
} from "lucide-react";

interface ToolIconProps {
  toolName: string;
  size?: number;
  variant?: "default" | "large" | "badge";
}

const toolIcons: Record<
  string,
  {
    icon: React.ComponentType<any>;
    gradient: string;
    name: string;
    shortName: string;
  }
> = {
  google_search: {
    icon: Search,
    gradient: "from-blue-500 to-blue-600",
    name: "Google Search",
    shortName: "Search",
  },
  news_search: {
    icon: Newspaper,
    gradient: "from-orange-500 to-orange-600",
    name: "News Search",
    shortName: "News",
  },
  stock_price: {
    icon: TrendingUp,
    gradient: "from-green-500 to-green-600",
    name: "Stock Price",
    shortName: "Stocks",
  },
  wikipedia_fetch: {
    icon: BookOpen,
    gradient: "from-gray-500 to-gray-600",
    name: "Wikipedia",
    shortName: "Wikipedia",
  },
  youtube_search: {
    icon: Youtube,
    gradient: "from-red-500 to-red-600",
    name: "YouTube Search",
    shortName: "YouTube",
  },
  youtube_transcribe: {
    icon: Play,
    gradient: "from-red-500 to-red-600",
    name: "YouTube Transcript",
    shortName: "Transcript",
  },
  html_skim: {
    icon: Globe,
    gradient: "from-indigo-500 to-indigo-600",
    name: "Web Scraper",
    shortName: "Web",
  },
  weather_forecast: {
    icon: Cloud,
    gradient: "from-sky-500 to-sky-600",
    name: "Weather",
    shortName: "Weather",
  },
  pubmed_search: {
    icon: Stethoscope,
    gradient: "from-emerald-500 to-emerald-600",
    name: "PubMed Search",
    shortName: "PubMed",
  },
  // 🆕 NEW TOOLS WITH BEAUTIFUL GRADIENTS
  openstreetmap_search: {
    icon: Map,
    gradient: "from-violet-500 to-violet-600",
    name: "Maps Search",
    shortName: "Maps",
  },
  github_search: {
    icon: Github,
    gradient: "from-slate-700 to-slate-800",
    name: "GitHub Search",
    shortName: "GitHub",
  },
  country_info: {
    icon: Flag,
    gradient: "from-rose-500 to-rose-600",
    name: "Country Info",
    shortName: "Countries",
  },
  timezone_api: {
    icon: Clock,
    gradient: "from-amber-500 to-amber-600",
    name: "Timezone Info",
    shortName: "Timezone",
  },
  aviationstack_search: {
    icon: Plane,
    gradient: "from-sky-400 to-sky-600",
    name: "Flight Search",
    shortName: "Flights",
  },
};

export const ToolIcon: React.FC<ToolIconProps> = ({
  toolName,
  size = 16,
  variant = "default",
}) => {
  const toolConfig = toolIcons[toolName];

  if (!toolConfig) {
    return (
      <div
        className={`
        flex items-center justify-center rounded-full bg-zinc-100
        ${
          variant === "large"
            ? "w-8 h-8"
            : variant === "badge"
            ? "w-6 h-6"
            : "w-5 h-5"
        }
      `}
      >
        <Wrench size={size} className="text-zinc-500" />
      </div>
    );
  }

  const { icon: Icon, gradient } = toolConfig;

  if (variant === "large") {
    return (
      <div
        className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} shadow-md flex items-center justify-center`}
        title={toolConfig.name}
      >
        <Icon size={18} className="text-white" />
      </div>
    );
  }

  if (variant === "badge") {
    return (
      <div
        className={`w-6 h-6 rounded-full bg-gradient-to-br ${gradient} shadow-sm flex items-center justify-center ring-2 ring-white`}
        title={toolConfig.name}
      >
        <Icon size={12} className="text-white" />
      </div>
    );
  }

  return (
    <div
      className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradient} shadow-sm flex items-center justify-center`}
      title={toolConfig.name}
    >
      <Icon size={size} className="text-white" />
    </div>
  );
};

// Modern circular tool badges with names
export const ModernToolBadges: React.FC<{ tools: string[] }> = ({ tools }) => {
  if (tools.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {tools.map((tool, index) => {
        const toolConfig = toolIcons[tool];
        if (!toolConfig) return null;

        return (
          <div
            key={`${tool}-${index}`}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-zinc-200/60 hover:shadow-md hover:border-brand-200/60 transition-all duration-200"
          >
            <ToolIcon toolName={tool} variant="badge" />
            <span className="text-xs font-medium text-zinc-700">
              {toolConfig.shortName}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Compact stacked version for inline display
export const CompactToolStack: React.FC<{
  tools: string[];
  maxVisible?: number;
}> = ({ tools, maxVisible = 3 }) => {
  const uniqueTools = [...new Set(tools)];
  const visibleTools = uniqueTools.slice(0, maxVisible);
  const remainingCount = uniqueTools.length - maxVisible;

  if (tools.length === 0) return null;

  return (
    <div className="flex items-center">
      <div className="flex -space-x-1">
        {visibleTools.map((tool, index) => (
          <div
            key={tool}
            style={{ zIndex: visibleTools.length - index }}
            className="relative"
          >
            <ToolIcon toolName={tool} variant="badge" />
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className="w-6 h-6 bg-gradient-to-br from-zinc-400 to-zinc-500 rounded-full shadow-sm flex items-center justify-center ring-2 ring-white"
            style={{ zIndex: 0 }}
          >
            <span className="text-xs font-bold text-white">
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Get tool display names
export const getToolDisplayName = (toolName: string): string => {
  return toolIcons[toolName]?.name || toolName.replace(/_/g, " ");
};

export const getToolShortName = (toolName: string): string => {
  return toolIcons[toolName]?.shortName || toolName.replace(/_/g, " ");
};
