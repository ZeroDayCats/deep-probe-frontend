import React, { useState, useEffect } from "react";
import { Header } from "./components/Layout/Header";
import { Sidebar } from "./components/Layout/Sidebar";
import { ChatArea } from "./components/chat/ChatArea";
import { ChatInput } from "./components/chat/ChatInput";

import { ApiService } from "./services/api";
import type { SessionInfo, MessageHistory } from "./types";

function App() {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check API health
        await ApiService.healthCheck();

        // Load existing sessions
        const existingSessions = await ApiService.getSessions();
        setSessions(existingSessions);

        // If no sessions, create one
        if (existingSessions.length === 0) {
          await handleNewSession();
        } else {
          setCurrentSessionId(existingSessions[0].session_id);
          await loadMessages(existingSessions[0].session_id);
        }
      } catch (error) {
        console.error("Failed to initialize app:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, []);

  const loadMessages = async (sessionId: string) => {
    try {
      const history = await ApiService.getHistory(sessionId);
      setMessages(history);
    } catch (error) {
      console.error("Failed to load messages:", error);
      setMessages([]);
    }
  };

  const handleNewSession = async () => {
    try {
      const newSession = await ApiService.createSession();
      setSessions((prev) => [newSession, ...prev]);
      setCurrentSessionId(newSession.session_id);
      setMessages([]);
    } catch (error) {
      console.error("Failed to create new session:", error);
    }
  };

  const handleSelectSession = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    await loadMessages(sessionId);
  };

  const handleDeleteSession = async (sessionId: string) => {
    try {
      await ApiService.deleteSession(sessionId);
      setSessions((prev) => prev.filter((s) => s.session_id !== sessionId));

      if (currentSessionId === sessionId) {
        const remainingSessions = sessions.filter(
          (s) => s.session_id !== sessionId
        );
        if (remainingSessions.length > 0) {
          setCurrentSessionId(remainingSessions[0].session_id);
          await loadMessages(remainingSessions[0].session_id);
        } else {
          await handleNewSession();
        }
      }
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (!currentSessionId) return;

    // Add user message immediately
    const userMessage: MessageHistory = {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await ApiService.sendMessage(currentSessionId, {
        message: messageText,
      });

      // Add assistant response
      const assistantMessage: MessageHistory = {
        role: "assistant",
        content: response.message,
        timestamp: response.timestamp,
        tools_used: response.tools_used,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Update session count
      setSessions((prev) =>
        prev.map((s) =>
          s.session_id === currentSessionId
            ? { ...s, message_count: s.message_count + 2 }
            : s
        )
      );
    } catch (error) {
      console.error("Failed to send message:", error);

      // Add error message
      const errorMessage: MessageHistory = {
        role: "assistant",
        content:
          "Sorry, I encountered an error while processing your message. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsClick = () => {
    // TODO: Implement settings modal
    console.log("Settings clicked");
  };

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 mx-auto h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
          <p className="text-zinc-600">Initializing Deep Probe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
        onDeleteSession={handleDeleteSession}
      />

      <div className="flex flex-1 flex-col">
        <Header onSettingsClick={handleSettingsClick} />
        <ChatArea messages={messages} isLoading={isLoading} />
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={!currentSessionId}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
