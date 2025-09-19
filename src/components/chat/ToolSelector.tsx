import React, { useState, useRef, useEffect } from "react";
import { Zap, X, Sparkles, Ban, ChevronRight } from "lucide-react";
import { ToolIcon } from "../UI/ToolIcon";
import {
  TOOLS_CONFIG,
  TOOL_GROUPS,
  getToolDisplayName,
} from "../../config/toolsConfig";

interface ToolSelectorProps {
  onToolSelect: (toolName: string) => void;
  selectedTools: string[];
  onRemoveTool: (toolName: string) => void;
  onModeChange: (mode: "auto" | "none" | "manual") => void;
  currentMode: "auto" | "none" | "manual";
}

export const ToolSelector: React.FC<ToolSelectorProps> = ({
  onToolSelect,
  selectedTools,
  onRemoveTool,
  onModeChange,
  currentMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuickSubmenu, setShowQuickSubmenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowQuickSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToolClick = (toolName: string) => {
    console.log("🔧 ToolSelector: Tool clicked:", toolName);

    if (selectedTools.includes(toolName)) {
      onRemoveTool(toolName);
    } else {
      onToolSelect(toolName);
      if (currentMode !== "manual") {
        onModeChange("manual");
      }
    }
  };

  const handleGroupSelect = (group: typeof TOOL_GROUPS[0]) => {
    console.log("🔧 ToolSelector: Group selected:", group.label);

    group.tools.forEach((toolName) => {
      if (!selectedTools.includes(toolName)) {
        onToolSelect(toolName);
      }
    });
    onModeChange("manual");
    setIsOpen(false);
    setShowQuickSubmenu(false);
  };

  const handleModeChange = (mode: "auto" | "none") => {
    console.log("🔧 ToolSelector: Mode changed to:", mode);

    onModeChange(mode);
    selectedTools.forEach((tool) => onRemoveTool(tool));
    setIsOpen(false);
  };

  const getButtonText = () => {
    if (currentMode === "auto") return "Auto";
    if (currentMode === "none") return "None";
    if (selectedTools.length > 0) return `${selectedTools.length}`;
    return "Tools";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selected Tools */}
      {currentMode === "manual" && selectedTools.length > 0 && (
        <div className="flex items-center gap-1 mb-1">
          {selectedTools.map((toolName, index) => (
            <React.Fragment key={toolName}>
              <span className="text-brand-600 text-xs font-mono">
                @{getToolDisplayName(toolName)}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onRemoveTool(toolName);
                }}
                className="text-brand-400 hover:text-brand-600"
              >
                <X size={10} />
              </button>
              {index < selectedTools.length - 1 && (
                <span className="text-zinc-300 text-xs">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
          currentMode === "auto"
            ? "bg-purple-100 text-purple-700"
            : currentMode === "none"
            ? "bg-gray-100 text-gray-600"
            : selectedTools.length > 0 || isOpen
            ? "bg-brand-100 text-brand-700"
            : "text-zinc-500 hover:bg-zinc-100"
        }`}
      >
        {currentMode === "auto" ? (
          <Sparkles size={12} />
        ) : currentMode === "none" ? (
          <Ban size={12} />
        ) : (
          <Zap size={12} />
        )}
        <span>{getButtonText()}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 bottom-full mb-2 w-72 bg-white border border-zinc-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {/* Mode Selection */}
          <div className="p-2 border-b border-zinc-100">
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => handleModeChange("auto")}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                  currentMode === "auto"
                    ? "bg-purple-100 text-purple-700"
                    : "hover:bg-zinc-50"
                }`}
              >
                <Sparkles size={12} />
                Auto
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("none")}
                className={`flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                  currentMode === "none"
                    ? "bg-gray-100 text-gray-600"
                    : "hover:bg-zinc-50"
                }`}
              >
                <Ban size={12} />
                None
              </button>
            </div>
          </div>

          {/* Quick Groups */}
          <div className="p-2 border-b border-zinc-100">
            <button
              type="button"
              onClick={() => setShowQuickSubmenu(!showQuickSubmenu)}
              className="w-full flex items-center justify-between p-1.5 rounded hover:bg-zinc-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-brand-600" />
                <span className="text-sm font-medium text-zinc-700">
                  Quick Groups
                </span>
              </div>
              <ChevronRight
                size={14}
                className={`transition-transform ${
                  showQuickSubmenu ? "rotate-90" : ""
                }`}
              />
            </button>

            {showQuickSubmenu && (
              <div className="mt-2 space-y-1 pl-4">
                {TOOL_GROUPS.map((group) => (
                  <button
                    key={group.label}
                    type="button"
                    onClick={() => handleGroupSelect(group)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-zinc-50 transition-colors text-left"
                  >
                    <div className="flex -space-x-1">
                      {group.tools.slice(0, 3).map((toolName) => (
                        <ToolIcon
                          key={toolName}
                          toolName={toolName}
                          size={12}
                        />
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-zinc-700">
                        {group.label}
                      </div>
                      <div className="text-xs text-zinc-500 truncate">
                        {group.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Individual Tools - Auto-generated from config */}
          <div className="p-2">
            <div className="text-xs text-zinc-500 mb-2">Individual Tools</div>
            <div className="grid grid-cols-4 gap-1">
              {TOOLS_CONFIG.map((tool) => (
                <button
                  key={tool.name}
                  type="button"
                  onClick={() => handleToolClick(tool.name)}
                  className={`flex flex-col items-center gap-0.5 p-1.5 rounded text-center transition-colors ${
                    selectedTools.includes(tool.name)
                      ? "bg-brand-100 text-brand-700"
                      : "hover:bg-zinc-50 text-zinc-600"
                  }`}
                  title={tool.description}
                >
                  <ToolIcon toolName={tool.name} size={14} />
                  <span className="text-xs leading-none">
                    {tool.displayName}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
