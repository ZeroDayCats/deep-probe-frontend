import React, { useState, useEffect } from "react";
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  Menu, 
  X, 
  ChevronLeft,
  MoreHorizontal,
  Clock,
  Sparkles
} from "lucide-react";
import type { SessionInfo } from "../../types";
import { formatRelativeTime } from "../../utils/formatting";

interface SidebarProps {
  sessions: SessionInfo[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewSession: () => void;
  onDeleteSession: (sessionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(false); // Always expanded when open on mobile
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Mobile overlay click handler
  const handleOverlayClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {/* 📱 Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-lg border border-zinc-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* 📱 Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* 🗂️ Sidebar */}
      <aside
        className={`
          ${isMobile ? "fixed" : "relative"}
          ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          ${isMobile ? "z-50" : "z-10"}
          ${isCollapsed && !isMobile ? "w-16" : isMobile ? "w-80" : "w-80"}
          h-full border-r border-zinc-200/50 bg-white/95 backdrop-blur-xl
          transition-all duration-300 ease-in-out
          shadow-xl md:shadow-none
        `}
      >
        {/* 🎨 Header Section */}
        <div className={`p-4 border-b border-zinc-100/80 ${isCollapsed && !isMobile ? "px-2" : ""}`}>
          <div className="flex items-center justify-between">
            {(!isCollapsed || isMobile) && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-sm">
                  <Sparkles size={14} className="text-white" />
                </div>
                <span className="font-semibold text-gray-900 text-sm">Conversations</span>
              </div>
            )}
            
            {/* 🔄 Collapse Button (Desktop Only) */}
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-all duration-200"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <ChevronLeft 
                  size={16} 
                  className={`transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""}`} 
                />
              </button>
            )}
          </div>
        </div>

        {/* ➕ New Chat Button */}
        <div className={`p-4 ${isCollapsed && !isMobile ? "px-2" : ""}`}>
          <button
            onClick={() => {
              onNewSession();
              if (isMobile) setIsOpen(false);
            }}
            className={`
              flex w-full items-center gap-3 rounded-xl 
              bg-gradient-to-r from-brand-500 to-brand-600 
              text-white shadow-lg hover:shadow-xl
              hover:from-brand-600 hover:to-brand-700
              transition-all duration-200 transform hover:scale-[1.02]
              ${isCollapsed && !isMobile ? "justify-center p-3" : "px-4 py-3"}
            `}
            title={isCollapsed ? "New Chat" : ""}
          >
            <Plus size={18} className="flex-shrink-0" />
            {(!isCollapsed || isMobile) && (
              <span className="font-semibold">New Chat</span>
            )}
          </button>
        </div>

        {/* 📝 Sessions List */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed && !isMobile ? "px-2" : "px-4"} pb-4`}>
          {(!isCollapsed || isMobile) && (
            <div className="flex items-center gap-2 mb-3">
              <Clock size={12} className="text-zinc-400" />
              <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Recent Chats
              </h2>
            </div>
          )}
          
          <div className="space-y-1">
            {sessions.length === 0 ? (
              (!isCollapsed || isMobile) && (
                <div className="text-center py-8">
                  <MessageSquare size={32} className="mx-auto text-zinc-300 mb-3" />
                  <p className="text-sm text-zinc-500 mb-2">No conversations yet</p>
                  <p className="text-xs text-zinc-400">Start a new chat to begin</p>
                </div>
              )
            ) : (
              sessions.map((session, index) => (
                <div
                  key={session.session_id}
                  className={`
                    group flex items-center gap-3 rounded-xl cursor-pointer
                    transition-all duration-200 relative overflow-hidden
                    ${isCollapsed && !isMobile ? "justify-center p-3" : "px-3 py-3"}
                    ${currentSessionId === session.session_id
                      ? "bg-gradient-to-r from-brand-50 to-brand-100/50 text-brand-700 border border-brand-200/50 shadow-sm"
                      : "hover:bg-white hover:shadow-md text-zinc-600 border border-transparent hover:border-zinc-200/50"
                    }
                  `}
                  onClick={() => {
                    onSelectSession(session.session_id);
                    if (isMobile) setIsOpen(false);
                  }}
                  title={isCollapsed && !isMobile ? `Chat ${session.message_count} messages` : ""}
                >
                  {/* 💬 Message Icon */}
                  <div className={`
                    flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                    ${currentSessionId === session.session_id 
                      ? "bg-brand-200/50 text-brand-600" 
                      : "bg-zinc-100 text-zinc-400 group-hover:bg-brand-100 group-hover:text-brand-500"
                    }
                    transition-all duration-200
                  `}>
                    <MessageSquare size={14} />
                  </div>

                  {/* 📄 Session Details (Hidden when collapsed) */}
                  {(!isCollapsed || isMobile) && (
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="truncate text-sm font-semibold">
                          Chat {index + 1}
                        </p>
                        <span className="text-xs text-zinc-400 flex-shrink-0 ml-2">
                          {session.message_count}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {formatRelativeTime(session.created_at)}
                      </p>
                    </div>
                  )}

                  {/* 🗑️ Delete Button */}
                  {(!isCollapsed || isMobile) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(session.session_id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 flex-shrink-0"
                      title="Delete conversation"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}

                  {/* ⚡ Active Indicator */}
                  {currentSessionId === session.session_id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-brand-500 to-brand-600 rounded-r-full" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 🔗 Footer (Desktop Only, Collapsed State) */}
        {!isMobile && isCollapsed && (
          <div className="p-2 border-t border-zinc-100/80">
            <button
              className="w-full p-2 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-all duration-200 flex justify-center"
              title="More options"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
