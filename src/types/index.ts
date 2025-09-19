/* eslint-disable @typescript-eslint/no-explicit-any */
// API Types based on your backend schemas
export interface SessionInfo {
  session_id: string;
  model_name: string;
  temperature: number;
  created_at: string;
  message_count: number;
}

export interface ChatRequest {
  message: string;
  context?: Record<string, any>;
}

export interface ChatResponse {
  message: string;
  tools_used: string[];
  timestamp: string;
}

export interface StreamChunk {
  type: "text" | "tool_start" | "tool_end" | "thinking" | "error" | "done";
  content: string;
  tool_name?: string;
  tool_args?: Record<string, any>;
  timestamp: string;
}

export interface ToolInfo {
  name: string;
  description: string;
  parameters: Record<string, any>;
  category: string;
  examples: string[];
}

export interface MessageHistory {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  timestamp: string;
  tools_used?: string[];
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}
