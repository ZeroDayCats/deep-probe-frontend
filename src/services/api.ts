/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import type {
  SessionInfo,
  ChatRequest,
  ChatResponse,
  ToolInfo,
  MessageHistory,
  HealthResponse,
} from "../types/index";

const API_BASE_URL = "https://probe-api.sangonomiya.icu";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export class ApiService {
  // Health
  static async healthCheck(): Promise<HealthResponse> {
    const { data } = await api.get("/health");
    //@ts-ignore
    return data;
  }

  // Tools
  static async getTools(): Promise<ToolInfo[]> {
    const { data } = await api.get("/tools");
    //@ts-ignore

    return data;
  }

  // Sessions
  static async createSession(
    modelName = "gemini-2.5-flash",
    temperature = 0.2
  ): Promise<SessionInfo> {
    const { data } = await api.post("/sessions", {
      model_name: modelName,
      temperature,
      system_prompt:
        "You are a helpful research assistant. When needed, browse using the search tool and cite links inline with proper formatting.",
    });
    //@ts-ignore
    return data;
  }

  static async getSessions(): Promise<SessionInfo[]> {
    const { data } = await api.get("/sessions");
    //@ts-ignore
    return data;
  }

  static async getSession(sessionId: string): Promise<SessionInfo> {
    const { data } = await api.get(`/sessions/${sessionId}`);
    //@ts-ignore
    return data;
  }

  static async deleteSession(sessionId: string): Promise<void> {
    await api.delete(`/sessions/${sessionId}`);
  }

  // Chat
  static async sendMessage(
    sessionId: string,
    request: ChatRequest
  ): Promise<ChatResponse> {
    const { data } = await api.post(`/chat/${sessionId}`, request);
    //@ts-ignore
    return data;
  }

  // Stream chat (returns EventSource for SSE)
  static createMessageStream(
    sessionId: string,
    request: ChatRequest
  ): EventSource {
    // SSE only supports GET requests.
    // Pass message and other params as query string.
    const url = `${API_BASE_URL}/chat/${sessionId}/stream`;
    const params = new URLSearchParams({ message: request.message });
    return new EventSource(`${url}?${params}`);
  }

  // History
  static async getHistory(
    sessionId: string,
    limit = 50
  ): Promise<MessageHistory[]> {
    const { data } = await api.get(`/sessions/${sessionId}/history`, {
      params: { limit },
    });
    // If API returns { history: [...] }, use data.history; else, use data.
    //@ts-ignore
    return Array.isArray(data) ? data : data.history;
  }

  static async clearHistory(sessionId: string): Promise<void> {
    await api.delete(`/sessions/${sessionId}/history`);
  }
}
