import React from "react";
import { LinkPreview } from "./LinkPreview";

interface LinkPreviewContainerProps {
  content: string;
}

// Extract URLs from message content
const extractUrls = (text: string): string[] => {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const matches = text.match(urlRegex);
  return matches ? [...new Set(matches)] : []; // Remove duplicates
};

export const LinkPreviewContainer: React.FC<LinkPreviewContainerProps> = ({
  content,
}) => {
  const urls = extractUrls(content);

  if (urls.length === 0) return null;

  return (
    <div className="space-y-3">
      {urls.slice(0, 3).map((
        url,
        index // Limit to 3 previews per message
      ) => (
        <LinkPreview key={`${url}-${index}`} url={url} />
      ))}
    </div>
  );
};
