import React, { useState, useEffect } from "react";
import { ExternalLink, Youtube, Play, FileText } from "lucide-react";

interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  url: string;
  type?: "youtube" | "general";
  duration?: string;
  publishedAt?: string;
}

interface LinkPreviewProps {
  url: string;
}

// Extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Get YouTube metadata using oEmbed (no API key required)
const getYouTubeMetadata = async (
  url: string
): Promise<LinkMetadata | null> => {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;

  try {
    // Use YouTube's oEmbed endpoint (no API key required)
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      url
    )}&format=json`;
    const response = await fetch(oembedUrl);

    if (response.ok) {
      const data = await response.json();

      return {
        title: data.title,
        description: `By ${data.author_name}`,
        image: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        siteName: "YouTube",
        url,
        type: "youtube",
      };
    }
  } catch (error) {
    console.log("YouTube oEmbed failed:", error);
  }

  // Fallback with basic YouTube info
  return {
    title: "YouTube Video",
    description: "Click to watch on YouTube",
    image: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    siteName: "YouTube",
    url,
    type: "youtube",
  };
};

// Enhanced domain mapping with better fallbacks
const getDomainInfo = (url: string): LinkMetadata => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace("www.", "");
    // Enhanced site mappings
    const siteMap: Record<
      string,
      { name: string; description: string; getTitle?: (url: string) => string }
    > = {
      "youtube.com": {
        name: "YouTube",
        description: "Video sharing platform",
        getTitle: () => "YouTube Video",
      },
      "github.com": {
        name: "GitHub",
        description: "Code repository",
        getTitle: (url) => {
          const parts = new URL(url).pathname.split("/").filter(Boolean);
          return parts.length >= 2
            ? `${parts[0]}/${parts[1]}`
            : "GitHub Repository";
        },
      },
      "twitter.com": { name: "Twitter", description: "Social media post" },
      "x.com": { name: "X (Twitter)", description: "Social media post" },
      "reddit.com": {
        name: "Reddit",
        description: "Discussion thread",
        getTitle: (url) => {
          if (url.includes("/r/")) {
            const subreddit = url.match(/\/r\/([^/]+)/)?.[1];
            return subreddit ? `r/${subreddit}` : "Reddit Post";
          }
          return "Reddit Post";
        },
      },
      "wikipedia.org": {
        name: "Wikipedia",
        description: "Encyclopedia article",
        getTitle: (url) => {
          const title = new URL(url).pathname
            .split("/")
            .pop()
            ?.replace(/_/g, " ");
          return title || "Wikipedia Article";
        },
      },
      "science.nasa.gov": {
        name: "NASA Science",
        description: "NASA scientific article",
      },
      "earthsky.org": { name: "EarthSky", description: "Astronomy news" },
      "skyandtelescope.com": {
        name: "Sky & Telescope",
        description: "Astronomy article",
      },
      "genshin.hoyoverse.com": {
        name: "Genshin Impact",
        description: "Official game website",
      },
      "hoyoverse.com": {
        name: "HoYoverse",
        description: "Game developer website",
      },
      "play.google.com": {
        name: "Google Play",
        description: "App store listing",
        getTitle: (url) => {
          const appId = new URL(url).searchParams.get("id");
          return appId ? `App: ${appId}` : "Google Play Store";
        },
      },
    };

    const siteInfo = siteMap[hostname] || {
      name:
        hostname
          .split(".")[0]
          .charAt(0)
          .toUpperCase() + hostname.split(".")[0].slice(1),
      description: "External website",
    };

    const title = siteInfo.getTitle ? siteInfo.getTitle(url) : siteInfo.name;

    return {
      title,
      description: siteInfo.description,
      siteName: siteInfo.name,
      url,
      type: "general",
    };
  } catch {
    return {
      title: "External Link",
      description: "Click to visit website",
      url,
      type: "general",
    };
  }
};

// Simple but reliable metadata fetching
const fetchMetadata = async (url: string): Promise<LinkMetadata | null> => {
  // Handle YouTube URLs first
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const youtubeData = await getYouTubeMetadata(url);
    if (youtubeData) return youtubeData;
  }

  // Try a simple, free metadata service (with better error handling)
  try {
    // Use a more reliable service or your own backend
    const response = await fetch(
      `https://iframe.ly/api/oembed?url=${encodeURIComponent(
        url
      )}&omit_script=1`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return {
        title: data.title,
        description: data.description || data.author_name,
        image: data.thumbnail_url,
        siteName: data.provider_name,
        url,
        type: "general",
      };
    }
  } catch (error) {
    console.log("iFramely failed:", error);
  }

  // Always fall back to domain-based info
  return getDomainInfo(url);
};

export const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadMetadata = async () => {
      setLoading(true);
      setImageError(false);

      try {
        const meta = await fetchMetadata(url);
        setMetadata(meta);
      } catch (err) {
        console.log("Metadata fetch failed, using fallback:", err);
        setMetadata(getDomainInfo(url));
      } finally {
        setLoading(false);
      }
    };

    loadMetadata();
  }, [url]);

  if (loading) {
    return (
      <div className="mt-3 animate-pulse">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <div className="flex gap-3">
            <div className="h-16 w-16 rounded bg-zinc-200 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-zinc-200 rounded w-3/4" />
              <div className="h-3 bg-zinc-200 rounded w-full" />
              <div className="h-3 bg-zinc-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!metadata) {
    return null;
  }

  const handleImageError = () => {
    setImageError(true);
  };

  const getIconForType = () => {
    if (metadata.type === "youtube") {
      return (
        <div className="relative">
          <div className="h-16 w-16 rounded bg-red-500 flex items-center justify-center">
            <Youtube size={24} className="text-white" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Play size={16} className="text-white ml-1" />
          </div>
        </div>
      );
    }

    const hostname = new URL(url).hostname;
    if (hostname.includes("github")) {
      return (
        <div className="h-16 w-16 rounded bg-gray-900 flex items-center justify-center text-white font-bold text-lg">
          GH
        </div>
      );
    }
    if (hostname.includes("reddit")) {
      return (
        <div className="h-16 w-16 rounded bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
          R
        </div>
      );
    }
    if (hostname.includes("wikipedia")) {
      return (
        <div className="h-16 w-16 rounded bg-gray-700 flex items-center justify-center text-white font-bold text-lg">
          W
        </div>
      );
    }

    return (
      <div className="h-16 w-16 rounded bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
        <FileText size={20} className="text-brand-600" />
      </div>
    );
  };

  return (
    <div className="mt-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-brand-200 transition-all overflow-hidden group"
      >
        <div className="flex gap-3 p-3">
          {/* Image/Icon */}
          <div className="flex-shrink-0">
            {metadata.image && !imageError ? (
              <img
                src={metadata.image}
                alt={metadata.title || "Link preview"}
                className="h-16 w-16 rounded object-cover bg-zinc-100"
                onError={handleImageError}
              />
            ) : (
              getIconForType()
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-zinc-900 line-clamp-2 group-hover:text-brand-700 transition-colors">
                  {metadata.title || "Link Preview"}
                </h4>
                {metadata.description && (
                  <p className="mt-1 text-sm text-zinc-600 line-clamp-2">
                    {metadata.description}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                  <span className="font-medium">{metadata.siteName}</span>
                  <span className="text-zinc-400">•</span>
                  <span className="truncate">{new URL(url).hostname}</span>
                  {metadata.type === "youtube" && (
                    <>
                      <span className="text-zinc-400">•</span>
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        Video
                      </span>
                    </>
                  )}
                </div>
              </div>
              <ExternalLink
                size={16}
                className="text-zinc-400 group-hover:text-brand-600 transition-colors flex-shrink-0 mt-1"
              />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
