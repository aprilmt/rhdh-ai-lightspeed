import svgPaths from "../../imports/svg-61xk5oour8";
import { useState, useEffect, useRef } from "react";
import DialogAlert from "../../imports/DialogAlert";
import { toast } from "sonner";

interface McpServer {
  name: string;
  enabled: boolean;
  status: "active" | "disabled" | "failed" | "token-required";
  tools?: number;
  requiresToken?: boolean;
}

interface SavedPrompt {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface McpServersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onUsePrompt?: (prompt: string) => void;
  onEnabledChange?: (enabled: boolean) => void;
}

export default function McpServersDrawer({ isOpen, onClose, onUsePrompt, onEnabledChange }: McpServersDrawerProps) {
  const [activeTab, setActiveTab] = useState<"servers" | "prompts">("servers");
  const [servers, setServers] = useState<McpServer[]>([
    { name: "Github", enabled: false, status: "token-required", tools: 0, requiresToken: true },
    { name: "Dynatrace", enabled: false, status: "disabled", tools: 0 },
    { name: "Openshift", enabled: true, status: "active", tools: 7 },
    { name: "Kubernetes", enabled: false, status: "disabled", tools: 0 },
    { name: "Developer Hub", enabled: true, status: "active", tools: 5 },
    { name: "Jenkins", enabled: false, status: "disabled", tools: 0 },
    { name: "Servicenow", enabled: true, status: "active", tools: 3 },
    { name: "Figma", enabled: false, status: "failed", tools: 0 },
  ]);

  const [editingServerIndex, setEditingServerIndex] = useState<number | null>(null);
  const [failedTooltipIndex, setFailedTooltipIndex] = useState<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onEnabledChange?.(servers.some((server) => server.enabled));
  }, [servers, onEnabledChange]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setFailedTooltipIndex(null);
      }
    };

    if (failedTooltipIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [failedTooltipIndex]);
  
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([
    {
      id: "1",
      title: "Debug Application",
      content: "Help me debug this application error and provide step-by-step troubleshooting",
      createdAt: new Date("2026-03-15"),
    },
    {
      id: "2",
      title: "Code Documentation",
      content: "Generate comprehensive documentation for my codebase including function descriptions and examples",
      createdAt: new Date("2026-03-14"),
    },
    {
      id: "3",
      title: "Performance Optimization",
      content: "Analyze my code for performance bottlenecks and suggest optimizations",
      createdAt: new Date("2026-03-10"),
    },
  ]);
  
  const [showNewPromptForm, setShowNewPromptForm] = useState(false);
  const [newPromptTitle, setNewPromptTitle] = useState("");
  const [newPromptContent, setNewPromptContent] = useState("");

  const handleSave = () => {
    setEditingServerIndex(null);
    toast.success("Configuration saved successfully", {
      position: "top-right",
    });
  };

  const toggleServer = (index: number) => {
    setServers(prevServers =>
      prevServers.map((server, i) => {
        if (i !== index) return server;

        const enabled = !server.enabled;

        // A server that requires a token becomes active with tools once turned
        // on, and reverts to the "Token required" state when turned back off.
        if (server.requiresToken) {
          return {
            ...server,
            enabled,
            status: enabled ? "active" : "token-required",
            tools: enabled ? 4 : 0,
          };
        }

        return { ...server, enabled };
      })
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center gap-2">
            <div className="size-[12px]">
              <svg className="block size-full" fill="none" viewBox="0 0 12 12">
                <path d={svgPaths.p3aad3100} fill="#3D7317" />
              </svg>
            </div>
          </div>
        );
      case "token-required":
        return (
          <div className="flex items-center gap-2">
            <div className="size-[12px]">
              <svg className="block size-full" fill="none" viewBox="0 0 12 12">
                <path d={svgPaths.p76d5e80} fill="#147878" />
              </svg>
            </div>
          </div>
        );
      case "failed":
        return (
          <div className="flex items-center gap-2">
            <div className="size-[12px]">
              <svg className="block size-full" fill="none" viewBox="0 0 12 12">
                <path d={svgPaths.p11fd3a40} fill="#B1380B" />
              </svg>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <div className="size-[14px]">
              <svg className="block size-full" fill="none" viewBox="0 0 14 14">
                <path clipRule="evenodd" d={svgPaths.p20897800} fill="#707070" fillRule="evenodd" />
              </svg>
            </div>
          </div>
        );
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "";
      case "token-required":
        return "Token required";
      case "failed":
        return "Failed";
      default:
        return "Disabled";
    }
  };

  const handleAddPrompt = () => {
    if (newPromptTitle.trim() && newPromptContent.trim()) {
      const newPrompt: SavedPrompt = {
        id: Date.now().toString(),
        title: newPromptTitle,
        content: newPromptContent,
        createdAt: new Date(),
      };
      setSavedPrompts([newPrompt, ...savedPrompts]);
      setNewPromptTitle("");
      setNewPromptContent("");
      setShowNewPromptForm(false);
      toast.success("Prompt saved successfully", {
        position: "top-right",
      });
    }
  };

  const handleDeletePrompt = (id: string) => {
    setSavedPrompts(savedPrompts.filter(prompt => prompt.id !== id));
    toast.success("Prompt deleted", {
      position: "top-right",
    });
  };

  const handleUsePrompt = (content: string) => {
    if (onUsePrompt) {
      onUsePrompt(content);
      toast.success("Prompt loaded", {
        position: "top-right",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-[380px] min-w-[380px] h-full bg-white border-l border-border flex-shrink-0 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-card p-4 pb-0 flex items-center justify-between">
        <h2 className="text-lg font-medium text-foreground">Settings</h2>
        <button
          onClick={onClose}
          className="size-[24px] hover:opacity-70 transition-opacity"
        >
          <svg className="block size-full" fill="none" viewBox="0 0 24 24">
            <path d={svgPaths.p2edaeb50} fill="var(--foreground)" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-4 mt-4">
        <button
          onClick={() => setActiveTab("servers")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "servers" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          MCP servers
        </button>
        <button
          onClick={() => setActiveTab("prompts")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "prompts" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Saved prompts
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {activeTab === "servers" ? (
          <>
            {/* Subtitle */}
            <div className="px-4 pt-4 pb-2">
              <p className="text-xs text-muted-foreground">{servers.filter(s => s.enabled).length} of {servers.length} selected</p>
            </div>

            {/* Table Header */}
            <div className="px-4 py-2 flex items-center gap-3 border-b border-border">
              <div className="w-[36px] shrink-0"></div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-foreground">Name</span>
              </div>
              <div className="w-[80px] shrink-0">
                <span className="text-xs font-medium text-foreground">Status</span>
              </div>
              <div className="w-[20px] shrink-0"></div>
            </div>

            {/* Server List */}
            <div className="px-4">
              {servers.map((server, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-3 border-b border-border last:border-b-0"
                >
                  {/* Toggle Switch */}
                  <button
                    className={`shrink-0 h-[22px] rounded-full flex items-center transition-all ${
                      server.enabled
                        ? "bg-primary w-[36px] justify-end pr-1 pl-3"
                        : "bg-[#c7c7c7] w-[36px] justify-start pl-1 pr-3 border border-border"
                    }`}
                    onClick={() => toggleServer(index)}
                  >
                    {server.enabled && (
                      <div className="size-[10px] mr-0.5">
                        <svg className="block size-full" fill="none" viewBox="0 0 12 9">
                          <path d={svgPaths.p3cf4e200} fill="white" />
                        </svg>
                      </div>
                    )}
                    <div className="size-[12px]">
                      <svg className="block size-full" fill="none" viewBox="0 0 14 14">
                        <circle
                          cx="7"
                          cy="7"
                          r="7"
                          fill={server.enabled ? "white" : "#4D4D4D"}
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Server Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{server.name}</p>
                  </div>

                  {/* Status */}
                  <div 
                    className="w-[80px] shrink-0 flex items-center gap-1 relative"
                    ref={server.status === "failed" ? tooltipRef : undefined}
                  >
                    {getStatusIcon(server.status)}
                    {server.status === "active" && server.tools && (
                      <span className="text-sm text-foreground">{server.tools} tools</span>
                    )}
                    {server.status === "failed" && (
                      <button
                        className="text-sm text-foreground cursor-pointer hover:underline"
                        onClick={() => setFailedTooltipIndex(failedTooltipIndex === index ? null : index)}
                      >
                        {getStatusLabel(server.status)}
                      </button>
                    )}
                    {server.status !== "active" && server.status !== "failed" && (
                      <span className="text-sm text-foreground">{getStatusLabel(server.status)}</span>
                    )}
                    {/* Tooltip for Failed status - positioned left with arrow on right */}
                    {server.status === "failed" && failedTooltipIndex === index && (
                      <div className="absolute bottom-[calc(100%+8px)] right-[10px] z-50">
                        <div className="bg-[#151515] text-white text-xs rounded px-3 py-2 w-[200px] shadow-lg">
                          Token authentication failed, click the edit to configure it again
                          <div className="absolute top-full right-[30px]">
                            <div className="border-4 border-transparent border-t-[#151515]"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Edit Button */}
                  {server.name !== "Dynatrace" ? (
                    <button
                      className="shrink-0 size-[19px] hover:opacity-70 transition-opacity"
                      onClick={() => setEditingServerIndex(index)}
                    >
                      <svg className="block size-full" fill="none" viewBox="0 0 19 19"><path></path><path clipRule="evenodd" d={svgPaths.p19945840} fill="#707070" fillRule="evenodd" /></svg>
                    </button>
                  ) : (
                    <div className="shrink-0 size-[19px]" />
                  )}
                </div>
              ))}
            </div>

            {/* Edit Dialog */}
            {editingServerIndex !== null && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditingServerIndex(null)}>
                <div className="w-[608px] h-[326px]" onClick={(e) => e.stopPropagation()}>
                  <DialogAlert 
                    serverName={servers[editingServerIndex].name}
                    error={servers[editingServerIndex].status === "failed"}
                    onSave={handleSave} 
                    onClose={() => setEditingServerIndex(null)} 
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Saved Prompts Header */}
            <div className="px-4 py-4 border-b border-border flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{savedPrompts.length} prompts</span>
              <button
                onClick={() => setShowNewPromptForm(true)}
                className="bg-primary text-primary-foreground w-1/2 flex gap-[4px] items-center justify-center px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                <div className="size-[18px]">
                  <svg className="block size-full" fill="none" viewBox="0 0 18 18">
                    <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="font-medium text-sm">New prompt</span>
              </button>
            </div>

            {/* New Prompt Form */}
            {showNewPromptForm && (
              <div className="px-4 py-4 border-b border-border bg-secondary/20">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newPromptTitle}
                    onChange={(e) => setNewPromptTitle(e.target.value)}
                    placeholder="Prompt title"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                  />
                  <textarea
                    value={newPromptContent}
                    onChange={(e) => setNewPromptContent(e.target.value)}
                    placeholder="Prompt content"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddPrompt}
                      disabled={!newPromptTitle.trim() || !newPromptContent.trim()}
                      className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setShowNewPromptForm(false);
                        setNewPromptTitle("");
                        setNewPromptContent("");
                      }}
                      className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Prompts List */}
            <div className="px-4 pb-4">
              {savedPrompts.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground text-sm">No saved prompts yet</p>
                  <p className="text-muted-foreground text-xs mt-1">Create your first prompt to get started</p>
                </div>
              ) : (
                savedPrompts.map(prompt => (
                  <div
                    key={prompt.id}
                    className="py-4 border-b border-border last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h4 className="text-sm font-medium text-foreground mb-1 break-words">{prompt.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2 break-words line-clamp-2">{prompt.content}</p>
                        <p className="text-xs text-muted-foreground">{prompt.createdAt.toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-2 shrink-0 pt-1">
                        <div className="relative group/tooltip">
                          <button
                            onClick={() => handleUsePrompt(prompt.content)}
                            className="size-[32px] rounded-lg hover:bg-primary/10 flex items-center justify-center transition-colors"
                          >
                            <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                              <path d="M2 8h12M10 4l4 4-4 4" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#151515] text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-10">
                            Use prompt
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                              <div className="border-4 border-transparent border-t-[#151515]"></div>
                            </div>
                          </div>
                        </div>
                        <div className="relative group/tooltip">
                          <button
                            onClick={() => handleDeletePrompt(prompt.id)}
                            className="size-[32px] rounded-lg hover:bg-destructive/10 flex items-center justify-center transition-colors"
                          >
                            <svg className="size-[16px]" fill="none" viewBox="0 0 16 16">
                              <path d="M4 4l8 8M12 4l-8 8" stroke="#B1380B" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#151515] text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-10">
                            Delete prompt
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                              <div className="border-4 border-transparent border-t-[#151515]"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}