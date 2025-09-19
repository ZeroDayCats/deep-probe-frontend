import React from "react";
import {
  Settings,
  HelpCircle,
  User,
  Bot,
  Sparkles,
  Activity,
} from "lucide-react";

interface HeaderProps {
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/30 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Enhanced Logo */}
        <div className="flex items-center gap-4">
          <div className="relative h-11 w-11 flex-shrink-0">
            {/* Main gradient circle */}
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-brand-500 via-brand-600 to-brand-400 shadow-lg shadow-brand-500/25" />

            {/* Bot icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Bot size={24} className="text-white drop-shadow-sm" />
            </div>

            {/* Subtle pulse animation */}
            <div className="absolute inset-0 animate-pulse rounded-xl bg-brand-400/10" />

            {/* Active indicator dot */}
            <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white shadow-sm flex items-center justify-center">
              <Activity size={8} className="text-white" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-brand-700 leading-tight">
                Deep Probe
              </h1>
              <Sparkles size={16} className="text-brand-500 animate-pulse" />
            </div>
            <span className="text-sm text-zinc-500 font-medium">
              AI Research Assistant
            </span>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex items-center gap-1">
          <button
            className="group relative rounded-xl p-2.5 text-zinc-500 hover:bg-brand-50 hover:text-brand-600 transition-all duration-200 hover:shadow-sm"
            title="Help & Documentation"
          >
            <HelpCircle
              size={18}
              className="transition-transform group-hover:scale-110"
            />
          </button>

          <button
            onClick={onSettingsClick}
            className="group relative rounded-xl p-2.5 text-zinc-500 hover:bg-brand-50 hover:text-brand-600 transition-all duration-200 hover:shadow-sm"
            title="Settings"
          >
            <Settings
              size={18}
              className="transition-transform group-hover:rotate-45"
            />
          </button>

          <div className="w-px h-6 bg-zinc-200 mx-2" />

          <button
            className="group relative rounded-xl p-2.5 text-zinc-500 hover:bg-brand-50 hover:text-brand-600 transition-all duration-200 hover:shadow-sm"
            title="User Profile"
          >
            <div className="relative">
              <User
                size={18}
                className="transition-transform group-hover:scale-110"
              />
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-brand-500"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
