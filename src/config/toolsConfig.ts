export interface ToolConfig {
  name: string; // Backend tool name
  displayName: string; // Frontend display name
  description: string; // Tool description
  category: string; // For grouping
  icon: string; // Lucide icon name (required now)
}

// 🎯 SINGLE SOURCE OF TRUTH - Add new tools here only!
export const TOOLS_CONFIG: ToolConfig[] = [
  {
    name: "google_search",
    displayName: "Search",
    description: "Search the web",
    category: "search",
    icon: "Search",
  },
  {
    name: "news_search",
    displayName: "News",
    description: "Latest news",
    category: "news",
    icon: "Newspaper",
  },
  {
    name: "stock_price",
    displayName: "Stocks",
    description: "Stock data",
    category: "finance",
    icon: "TrendingUp",
  },
  {
    name: "wikipedia_fetch",
    displayName: "Wikipedia",
    description: "Encyclopedia",
    category: "information",
    icon: "BookOpen",
  },
  {
    name: "youtube_search",
    displayName: "YouTube",
    description: "Find videos",
    category: "media",
    icon: "Play",
  },
  {
    name: "youtube_transcribe",
    displayName: "Transcript",
    description: "Video text",
    category: "media",
    icon: "FileText",
  },
  {
    name: "html_skim",
    displayName: "Web",
    description: "Read pages",
    category: "web",
    icon: "Globe",
  },
  {
    name: "weather_forecast",
    displayName: "Weather",
    description: "Forecasts",
    category: "weather",
    icon: "Cloud",
  },
  {
    name: "pubmed_search",
    displayName: "PubMed",
    description: "Medical research",
    category: "medical",
    icon: "Heart",
  },
  {
    name: "openstreetmap_search",
    displayName: "Maps",
    description: "Find locations and addresses",
    category: "location",
    icon: "Map",
  },
  {
    name: "github_search",
    displayName: "GitHub",
    description: "Search code repositories",
    category: "development",
    icon: "Github",
  },
  {
    name: "country_info",
    displayName: "Countries",
    description: "Country data and statistics",
    category: "location",
    icon: "Flag",
  },
  {
    name: "timezone_api",
    displayName: "Timezone",
    description: "World timezone information",
    category: "location",
    icon: "Clock",
  },
];

// 🔄 Auto-generated transformation maps
export const TOOL_NAME_TO_DISPLAY = TOOLS_CONFIG.reduce((acc, tool) => {
  acc[tool.name] = tool.displayName;
  return acc;
}, {} as Record<string, string>);

export const DISPLAY_TO_TOOL_NAME = TOOLS_CONFIG.reduce((acc, tool) => {
  acc[tool.displayName] = tool.name;
  return acc;
}, {} as Record<string, string>);

// 🎯 Updated Tool Groups Configuration
export const TOOL_GROUPS = [
  {
    label: "Research & Facts",
    tools: ["google_search", "wikipedia_fetch", "pubmed_search"],
    description: "Comprehensive information gathering",
    icon: "Search",
  },
  {
    label: "News & Updates",
    tools: ["news_search", "google_search"],
    description: "Latest news and current events",
    icon: "Newspaper",
  },
  {
    label: "Verify News",
    tools: ["news_search", "google_search", "html_skim"],
    description: "Cross-check and verify stories",
    icon: "ShieldCheck",
  },
  {
    label: "Video Analysis",
    tools: ["youtube_search", "youtube_transcribe"],
    description: "Find and analyze video content",
    icon: "Play",
  },
  {
    label: "Market Data",
    tools: ["stock_price", "news_search"],
    description: "Financial information and analysis",
    icon: "TrendingUp",
  },
  {
    label: "Location & Maps",
    tools: ["openstreetmap_search", "timezone_api", "country_info"],
    description: "Geographic and location services",
    icon: "MapPin",
  },
  {
    label: "Development Tools",
    tools: ["github_search", "html_skim"],
    description: "Code search and web development",
    icon: "Code",
  },
];

// 🔧 Utility Functions
export const getToolDisplayName = (toolName: string): string => {
  return TOOL_NAME_TO_DISPLAY[toolName] || toolName;
};

export const getToolName = (displayName: string): string => {
  return DISPLAY_TO_TOOL_NAME[displayName] || displayName;
};

export const transformToBackend = (message: string): string => {
  let transformed = message;
  Object.entries(DISPLAY_TO_TOOL_NAME).forEach(([display, toolName]) => {
    transformed = transformed.replace(
      new RegExp(`@${display}`, "g"),
      `@${toolName}`
    );
  });
  return transformed;
};

export const transformToDisplay = (message: string): string => {
  let transformed = message;
  Object.entries(TOOL_NAME_TO_DISPLAY).forEach(([toolName, display]) => {
    transformed = transformed.replace(
      new RegExp(`@${toolName}`, "g"),
      `@${display}`
    );
  });
  return transformed;
};

// 🎨 Get tool config by name (helpful for getting icons)
export const getToolConfig = (toolName: string): ToolConfig | undefined => {
  return TOOLS_CONFIG.find((tool) => tool.name === toolName);
};
