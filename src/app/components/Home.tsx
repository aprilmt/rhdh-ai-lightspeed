import { useState, useRef, useEffect } from "react";
import svgPaths from "../../imports/svg-4cexv9f4rn";
import Menu from "../../imports/Menu";
import ArrowMenuOpen from "../../imports/ArrowMenuOpen24Dp1F1F1FFill0Wght400Grad0Opsz241";
import CloseIocn from "../../imports/CloseIocn";
import EditSquare from "../../imports/EditSquare24Dp1F1F1FFill0Wght400Grad0Opsz241";
import NavDivider from "../../imports/NavDivider";
import McpServersDrawer from "./McpServersDrawer";

interface ActionCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("llama 3.1.8b");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "notebooks">("chat");
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showMcpDrawer, setShowMcpDrawer] = useState(false);
  const [containerHeight, setContainerHeight] = useState(109);
  const [leftPanelWidth, setLeftPanelWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [showMcpPromo, setShowMcpPromo] = useState(true);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [notebookMenuOpen, setNotebookMenuOpen] = useState<number | null>(null);
  const [openSessions, setOpenSessions] = useState<Array<{ id: number; title: string; input: string; messages: Array<{ role: string; content: string }>; width?: number; height?: number }>>([]);
  const [draggedChatTitle, setDraggedChatTitle] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggingSessionId, setDraggingSessionId] = useState<number | null>(null);
  const [dragOverSessionId, setDragOverSessionId] = useState<number | null>(null);
  const [resizingSession, setResizingSession] = useState<{ id: number; startX: number; startY: number; startW: number; startH: number } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = Math.min(Math.max(e.clientX, 200), 500);
      setLeftPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Resize individual session panes
  useEffect(() => {
    if (!resizingSession) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dw = e.clientX - resizingSession.startX;
      const dh = e.clientY - resizingSession.startY;
      const newWidth = Math.min(Math.max(resizingSession.startW + dw, 320), 960);
      const newHeight = Math.min(Math.max(resizingSession.startH + dh, 300), 800);
      setOpenSessions((prev) =>
        prev.map((s) => (s.id === resizingSession.id ? { ...s, width: newWidth, height: newHeight } : s))
      );
    };

    const handleMouseUp = () => setResizingSession(null);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingSession]);

  const models = ["llama 3.1.8b", "llama 3.2.1b", "gpt-4", "claude-3"];

  const actionCards: ActionCard[] = [
    {
      title: "Document",
      description: "Help me document my code",
      icon: (
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14.1172">
          <path d={svgPaths.p27412380} fill="var(--muted-foreground)" />
        </svg>
      ),
    },
    {
      title: "Debug",
      description: "Help me find a bug in my code",
      icon: (
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9997 12.7983">
          <path d={svgPaths.p1d4f9780} fill="var(--muted-foreground)" />
        </svg>
      ),
    },
    {
      title: "Troubleshoot",
      description: "Fix a problem with my application",
      icon: (
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9997 12.7983">
          <path d={svgPaths.p1d4f9780} fill="var(--muted-foreground)" />
        </svg>
      ),
    },
  ];

  const handleSendMessage = () => {
    if (prompt.trim()) {
      setChatHistory([...chatHistory, { role: "user", content: prompt }]);
      setPrompt("");
      // Simulate AI response
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: `I can help you with that. Let me analyze your request about "${prompt.substring(0, 50)}..."` },
        ]);
      }, 1000);
    }
  };

  const handleActionCardClick = (card: ActionCard) => {
    setPrompt(card.description);
    setShowChatPanel(true);
  };

  const handleNewChat = () => {
    setChatHistory([]);
    setPrompt("");
    setOpenSessions([]);
  };

  const toggleChatPanel = () => {
    console.log('Toggle chat panel clicked, current state:', showChatPanel);
    setShowChatPanel(!showChatPanel);
  };

  const handleMcpSettingsClick = () => {
    setShowMcpDrawer(true);
    setShowHeaderMenu(false);
  };

  const closeMcpDrawer = () => {
    setShowMcpDrawer(false);
  };

  const handleUsePrompt = (promptText: string) => {
    setPrompt(promptText);
  };

  // --- Parallel chat sessions (drag & drop) ---
  const seedSessionMessages = (title: string) => [
    { role: "user", content: title },
    { role: "assistant", content: `Sure — let's continue on "${title}". What would you like to explore or change?` },
  ];

  const openChatSession = (title: string) => {
    setOpenSessions((prev) => {
      if (prev.some((s) => s.title === title)) return prev;
      return [...prev, { id: Date.now() + Math.random(), title, input: "", messages: seedSessionMessages(title), width: 460, height: 440 }];
    });
  };

  const handleResizeStart = (e: React.MouseEvent, session: { id: number; width?: number; height?: number }) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingSession({
      id: session.id,
      startX: e.clientX,
      startY: e.clientY,
      startW: session.width ?? 460,
      startH: session.height ?? 440,
    });
  };

  const closeSession = (id: number) => {
    setOpenSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSessionInputChange = (id: number, value: string) => {
    setOpenSessions((prev) => prev.map((s) => (s.id === id ? { ...s, input: value } : s)));
  };

  const handleSessionSend = (id: number) => {
    const target = openSessions.find((s) => s.id === id);
    if (!target || !target.input.trim()) return;
    const text = target.input;
    setOpenSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, input: "", messages: [...s.messages, { role: "user", content: text }] } : s))
    );
    setTimeout(() => {
      setOpenSessions((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, messages: [...s.messages, { role: "assistant", content: `Here's an update on "${text.substring(0, 40)}${text.length > 40 ? "…" : ""}"` }] }
            : s
        )
      );
    }, 800);
  };

  const handleChatDragStart = (e: React.DragEvent, title: string) => {
    e.dataTransfer.setData("text/plain", title);
    e.dataTransfer.effectAllowed = "copy";
    setDraggedChatTitle(title);
  };

  const handleDropAreaDragOver = (e: React.DragEvent) => {
    if (activeTab !== "chat") return;
    e.preventDefault();
    // Reordering an existing pane is handled by the panes themselves.
    if (draggingSessionId !== null) {
      e.dataTransfer.dropEffect = "move";
      return;
    }
    e.dataTransfer.dropEffect = "copy";
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDropAreaDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragOver(false);
  };

  const handleDropAreaDrop = (e: React.DragEvent) => {
    if (activeTab !== "chat") return;
    e.preventDefault();
    // Ignore drops that are pane reorders (those are handled per-pane).
    if (draggingSessionId !== null) {
      setIsDragOver(false);
      return;
    }
    const title = e.dataTransfer.getData("text/plain") || draggedChatTitle;
    if (title) openChatSession(title);
    setIsDragOver(false);
    setDraggedChatTitle(null);
  };

  // --- Reorder open session panes ---
  const reorderSessions = (draggedId: number, targetId: number) => {
    setOpenSessions((prev) => {
      if (draggedId === targetId) return prev;
      const arr = [...prev];
      const from = arr.findIndex((s) => s.id === draggedId);
      const to = arr.findIndex((s) => s.id === targetId);
      if (from < 0 || to < 0) return prev;
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
  };

  const handleSessionDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("application/x-session", String(id));
    e.dataTransfer.effectAllowed = "move";
    setDraggingSessionId(id);
  };

  const handleSessionDragEnd = () => {
    setDraggingSessionId(null);
    setDragOverSessionId(null);
  };

  const handleSessionDragOver = (e: React.DragEvent, id: number) => {
    if (draggingSessionId === null) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    if (dragOverSessionId !== id) setDragOverSessionId(id);
  };

  const handleSessionDrop = (e: React.DragEvent, id: number) => {
    if (draggingSessionId === null) return;
    e.preventDefault();
    e.stopPropagation();
    reorderSessions(draggingSessionId, id);
    setDraggingSessionId(null);
    setDragOverSessionId(null);
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to calculate scrollHeight properly
      textarea.style.height = '32px';
      // Set height based on scroll height (content)
      const newHeight = Math.min(textarea.scrollHeight, 120); // Max 120px (about 4 lines)
      textarea.style.height = `${newHeight}px`;
      setContainerHeight(Math.max(109, parseInt(textarea.style.height || '32') + 48));
    }
  }, [prompt]);

  return (
    <div className="relative w-full h-full bg-background flex flex-col overflow-hidden">
      {/* Header - Full Width */}
      <div className="bg-card h-[94px] border-b border-border px-6 flex items-center flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-[48px] relative">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
              <g>
                <path d={svgPaths.p19e6d540} fill="var(--fill-0, white)" />
                <path d={svgPaths.p225a7b00} fill="var(--muted)" />
              </g>
            </svg>
            <div className="absolute inset-[17.72%_17.72%_17.72%_20.47%]">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.6667 30.9867">
                <g>
                  <path d={svgPaths.pa96f700} fill="var(--fill-0, #EE0000)" />
                  <path d={svgPaths.pd6fe900} fill="var(--fill-0, #EE0000)" />
                  <path d={svgPaths.p11079271} fill="var(--fill-0, #EE0000)" />
                  <path d={svgPaths.p20a9ec00} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p2dfa7200} fill="var(--fill-0, black)" />
                  <path d={svgPaths.paed9900} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p126729f0} fill="var(--fill-0, #EE0000)" />
                  <path d={svgPaths.pf94d400} fill="var(--fill-0, #EE0000)" />
                  <path d={svgPaths.p9681b00} fill="var(--fill-0, #EE0000)" />
                  <path d={svgPaths.p24ea2300} fill="var(--fill-0, #EE0000)" />
                  <path d={svgPaths.p30464400} fill="var(--fill-0, black)" />
                  <path d={svgPaths.p2adc3200} fill="var(--fill-0, black)" />
                </g>
              </svg>
            </div>
          </div>
          <h1 className="text-[32px] font-bold text-foreground">
            Developer Lightspeed
          </h1>
        </div>

        <div className="ml-auto relative">
          <button className="size-[24px] hover:bg-[rgba(199,199,199,0.25)] rounded-full transition-colors" onClick={() => { setShowHeaderMenu(!showHeaderMenu); setShowMcpPromo(false); }}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24"><path></path><path d={svgPaths.p34810300} fill="var(--foreground)" /></svg>
          </button>

          {/* MCP Feature Promo Popover - PatternFly Hint Style */}
          {showMcpPromo && (
            <div className="absolute right-[-8px] top-[36px] z-50 w-[320px] animate-[slideInDown_0.3s_ease-out]">
              <div className="bg-white text-[#151515] rounded-[16px] border-2 border-[#5e40be] relative">
                {/* Hint Title */}
                <div className="flex items-start justify-between gap-2 px-6 pt-4 pb-2">
                  <div className="flex items-center gap-2">
                    <svg className="size-4 text-[#5e40be]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.5 5.6L5 7l1.4-2.5L5 2l2.5 1.4L10 2 8.6 4.5 10 7 7.5 5.6zm12 9.8L22 14l-1.4 2.5L22 19l-2.5-1.4L17 19l1.4-2.5L17 14l2.5 1.4zM22 2l-1.4 2.5L22 7l-2.5-1.4L17 7l1.4-2.5L17 2l2.5 1.4L22 2zm-8.66 10.78l2.44-2.44-2.12-2.12-2.44 2.44 2.12 2.12zm1.03-5.49l2.34 2.34c.39.37.39 1.02 0 1.41L5.04 22.71c-.39.39-1.04.39-1.41 0l-2.34-2.34c-.39-.39-.39-1.02 0-1.41L12.96 7.29c.39-.39 1.04-.39 1.41 0z"/>
                    </svg>
                    <span className="font-medium text-sm text-[#151515]">New: MCP Servers</span>
                  </div>
                  <button 
                    onClick={() => setShowMcpPromo(false)}
                    className="shrink-0 text-[#6a6e73] hover:text-[#151515] transition-colors"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 24 24">
                      <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                {/* Hint Body */}
                <div className="px-6 pb-4">
                  <p className="text-[14px] leading-relaxed text-[#151515]">
                    Manage MCP servers in Lightspeed settings to control which services are available in your chat.
                  </p>
                </div>
                {/* Arrow pointing up */}
                <div className="absolute bottom-full right-[8px]">
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                    <path d="M10 0L20 10H0L10 0Z" fill="#5e40be"/>
                    <path d="M10 2L17 10H3L10 2Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {showHeaderMenu && (
            <div className="absolute right-0 top-[30px] z-50 w-[320px]">
              <Menu onMcpSettingsClick={handleMcpSettingsClick} />
            </div>
          )}
        </div>
      </div>

      {/* Tabs - Full Width */}
      <div className="flex items-center border-b border-border px-6 flex-shrink-0 h-[46px]">
        <button
          onClick={() => setActiveTab("chat")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "chat" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab("notebooks")}
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === "notebooks" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Notebooks
        </button>
      </div>

      {/* Content Area with Main Content and Right Panel */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
          {/* Chat Messages & Content Area */}
          <div
            className="flex-1 overflow-y-auto overflow-x-hidden relative bg-background"
            onDragOver={handleDropAreaDragOver}
            onDragLeave={handleDropAreaDragLeave}
            onDrop={handleDropAreaDrop}
          >
            {isDragOver && activeTab === "chat" && (
              <div className="absolute inset-2 z-30 border-2 border-dashed border-primary rounded-xl bg-primary/5 flex items-center justify-center pointer-events-none">
                <div className="bg-white/95 px-6 py-4 rounded-xl shadow-sm text-center">
                  <p className="text-sm font-medium text-primary">Drop to open chat session</p>
                  <p className="text-xs text-muted-foreground mt-1">View and edit multiple chats in parallel</p>
                </div>
              </div>
            )}
            {activeTab === "notebooks" ? (
              /* Notebooks Page - My Notebooks */
              <div className="p-6">
                {/* Header with title and create button */}
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-xl font-semibold text-[#151515]">My Notebooks</h1>
                  <button className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Create new notebook
                  </button>
                </div>
                
                {/* Notebook cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {/* Onboarding RHDH */}
                  <div className="bg-white border border-border rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer group min-h-[120px]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="size-5 text-primary">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                            <path d="M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm4-8h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6z"/>
                          </svg>
                        </div>
                        <span className="font-medium text-[#151515]">Onboarding RHDH</span>
                      </div>
                      <div className="relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setNotebookMenuOpen(notebookMenuOpen === 0 ? null : 0); }}
                          className="text-muted-foreground hover:text-foreground p-1"
                        >
                          <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="5" r="2"/>
                            <circle cx="12" cy="12" r="2"/>
                            <circle cx="12" cy="19" r="2"/>
                          </svg>
                        </button>
                        {notebookMenuOpen === 0 && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] py-1 min-w-[150px] z-50">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setNotebookMenuOpen(null); }}
                              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/50 transition-colors"
                            >
                              Rename
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setNotebookMenuOpen(null); }}
                              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/50 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">3 Documents</p>
                  </div>
                  
                  {/* CI/CD Pipeline */}
                  <div className="bg-white border border-border rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer group min-h-[120px]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="size-5 text-primary">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                            <path d="M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm4-8h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6z"/>
                          </svg>
                        </div>
                        <span className="font-medium text-[#151515]">CI/CD Pipeline</span>
                      </div>
                      <div className="relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setNotebookMenuOpen(notebookMenuOpen === 1 ? null : 1); }}
                          className="text-muted-foreground hover:text-foreground p-1"
                        >
                          <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="5" r="2"/>
                            <circle cx="12" cy="12" r="2"/>
                            <circle cx="12" cy="19" r="2"/>
                          </svg>
                        </button>
                        {notebookMenuOpen === 1 && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] py-1 min-w-[150px] z-50">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setNotebookMenuOpen(null); }}
                              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/50 transition-colors"
                            >
                              Rename
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setNotebookMenuOpen(null); }}
                              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/50 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">3 Documents</p>
                  </div>
                  
                  {/* Untitled notebook */}
                  <div className="bg-white border border-border rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer group min-h-[120px]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="size-5 text-primary">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                            <path d="M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm4-8h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6z"/>
                          </svg>
                        </div>
                        <span className="font-medium text-[#151515]">Untitled notebook</span>
                      </div>
                      <div className="relative">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setNotebookMenuOpen(notebookMenuOpen === 2 ? null : 2); }}
                          className="text-muted-foreground hover:text-foreground p-1"
                        >
                          <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="5" r="2"/>
                            <circle cx="12" cy="12" r="2"/>
                            <circle cx="12" cy="19" r="2"/>
                          </svg>
                        </button>
                        {notebookMenuOpen === 2 && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] py-1 min-w-[150px] z-50">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setNotebookMenuOpen(null); }}
                              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/50 transition-colors"
                            >
                              Rename
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); setNotebookMenuOpen(null); }}
                              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/50 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">0 Documents</p>
                  </div>
                </div>
              </div>
            ) : (
            <>
            {/* Toggle buttons and divider */}
            <div className="absolute top-4 left-4 z-10 flex items-start gap-4">
              <div className="flex flex-row gap-2">
                <div className="relative group/chat-tooltip">
                  <button
                    onClick={toggleChatPanel}
                    className={`p-2 rounded hover:bg-accent/10 transition-colors ${
                      showChatPanel ? "bg-accent/10 text-accent" : "bg-card text-muted-foreground shadow-sm"
                    }`}
                    aria-label={showChatPanel ? "Hide chat history" : "Show chat history"}
                  >
                    <div className="size-[24px]">
                      {showChatPanel ? <CloseIocn /> : <ArrowMenuOpen />}
                    </div>
                  </button>
                  {/* Tooltip */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-[#151515] text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/chat-tooltip:opacity-100 transition-opacity z-20">
                    {showChatPanel ? "Collapse chat history" : "Expand to view chat history"}
                    <div className="absolute right-full top-1/2 -translate-y-1/2">
                      <div className="border-4 border-transparent border-r-[#151515]"></div>
                    </div>
                  </div>
                </div>

                <div className={`relative group/new-chat-tooltip ${showChatPanel || (chatHistory.length === 0 && openSessions.length === 0) ? 'hidden' : ''}`}>
                  <button
                    className="p-2 rounded bg-card text-muted-foreground shadow-sm hover:bg-accent/10 transition-colors"
                    aria-label="New chat"
                  >
                    <div className="size-[24px]">
                      <EditSquare />
                    </div>
                  </button>
                  {/* Tooltip */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-[#151515] text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/new-chat-tooltip:opacity-100 transition-opacity z-20">
                    New chat
                    <div className="absolute right-full top-1/2 -translate-y-1/2">
                      <div className="border-4 border-transparent border-r-[#151515]"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`w-px bg-[#c7c7c7] h-full ${showChatPanel ? 'hidden' : ''}`} />
            </div>

            {openSessions.length > 0 ? (
              /* Parallel chat sessions workspace */
              <div className="p-4 pt-16 h-full overflow-y-auto">
                {/* Model selector for sessions workspace */}
                <div className="absolute top-4 right-4 z-20 flex items-center h-10">
                  <div className="relative">
                    <button
                      onClick={() => setShowModelDropdown(!showModelDropdown)}
                      className="text-[14px] font-medium text-muted-foreground hover:text-foreground hover:bg-[rgba(199,199,199,0.25)] transition-colors flex items-center gap-1 rounded-full border border-border px-3 py-1"
                    >
                      <span>{selectedModel}</span>
                      <div className="size-[14px]">
                        <svg className="block size-full" fill="none" viewBox="0 0 9.33333 6.02771">
                          <path clipRule="evenodd" d="M0.390524 0.390524C0.585786 0.195262 0.902369 0.195262 1.09763 0.390524L4.66667 3.95956L8.2357 0.390524C8.43096 0.195262 8.74754 0.195262 8.94281 0.390524C9.13807 0.585786 9.13807 0.902369 8.94281 1.09763L5.02022 5.02022C4.82496 5.21548 4.50837 5.21548 4.31311 5.02022L0.390524 1.09763C0.195262 0.902369 0.195262 0.585786 0.390524 0.390524Z" fill="currentColor" fillRule="evenodd" />
                        </svg>
                      </div>
                    </button>

                    {showModelDropdown && (
                      <div className="absolute top-full right-0 mt-2 bg-popover rounded-lg shadow-lg border border-border min-w-[160px] z-50">
                        {models.map((model) => (
                          <button
                            key={model}
                            onClick={() => {
                              setSelectedModel(model);
                              setShowModelDropdown(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-secondary first:rounded-t-lg last:rounded-b-lg ${
                              model === selectedModel ? "bg-secondary text-primary" : "text-foreground"
                            }`}
                          >
                            {model}
                            {model === selectedModel && " ✓"}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-start">
                  {openSessions.map((session) => (
                    <div
                      key={session.id}
                      onDragOver={(e) => handleSessionDragOver(e, session.id)}
                      onDrop={(e) => handleSessionDrop(e, session.id)}
                      style={{ width: `${session.width ?? 460}px`, height: `${session.height ?? 440}px` }}
                      className={`relative bg-white border rounded-lg shadow-sm flex flex-col overflow-hidden transition-colors ${
                        dragOverSessionId === session.id && draggingSessionId !== session.id
                          ? "border-primary ring-2 ring-primary/40"
                          : "border-border"
                      } ${draggingSessionId === session.id ? "opacity-50" : ""}`}
                    >
                      {/* Session header (drag handle for reordering) */}
                      <div
                        draggable
                        onDragStart={(e) => handleSessionDragStart(e, session.id)}
                        onDragEnd={handleSessionDragEnd}
                        className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0 cursor-grab active:cursor-grabbing select-none"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="size-[16px] shrink-0 text-muted-foreground" aria-hidden="true">
                            <svg className="block size-full" fill="currentColor" viewBox="0 0 16 16">
                              <circle cx="5" cy="4" r="1.2" />
                              <circle cx="5" cy="8" r="1.2" />
                              <circle cx="5" cy="12" r="1.2" />
                              <circle cx="11" cy="4" r="1.2" />
                              <circle cx="11" cy="8" r="1.2" />
                              <circle cx="11" cy="12" r="1.2" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground truncate">{session.title}</span>
                        </div>
                        <button
                          onClick={() => closeSession(session.id)}
                          className="p-1 hover:bg-secondary rounded shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Close session"
                        >
                          <svg className="size-[16px]" fill="none" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>

                      {/* Session messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {session.messages.map((message, i) => (
                          <div key={i} className={message.role === "user" ? "text-right" : "text-left"}>
                            <div className={`inline-block px-3 py-2 rounded-lg text-sm leading-relaxed max-w-[85%] ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                              {message.content}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Session input */}
                      <div className="border-t border-border p-3 shrink-0">
                        <div className="bg-input-background rounded-[16px] border border-border flex items-end gap-2 px-3 py-2">
                          <textarea
                            value={session.input}
                            onChange={(e) => handleSessionInputChange(session.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSessionSend(session.id);
                              }
                            }}
                            placeholder="Message this chat…"
                            rows={1}
                            className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground resize-none max-h-[80px] min-h-[24px]"
                          />
                          <button
                            onClick={() => handleSessionSend(session.id)}
                            className="size-[32px] rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors shrink-0"
                            aria-label="Send"
                          >
                            <div className="size-[18px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0832 14.5831">
                                <path d={svgPaths.p3eea9c00} fill="var(--muted-foreground)" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Resize handle (bottom-right corner) */}
                      <div
                        onMouseDown={(e) => handleResizeStart(e, session)}
                        className="absolute bottom-0 right-0 size-[18px] cursor-se-resize flex items-end justify-end p-[3px] text-muted-foreground/60 hover:text-primary z-10"
                        aria-label="Resize session"
                      >
                        <svg className="block size-full" viewBox="0 0 12 12" fill="none">
                          <path d="M11 5L5 11M11 9L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
            <>
            {/* Chat Messages */}
            {chatHistory.length > 0 && (
              <div className="p-6 max-w-[900px] mx-auto pb-48">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`inline-block p-4 rounded-lg max-w-[80%] ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Welcome Message */}
            {chatHistory.length === 0 && (
              <div className={`flex flex-col items-center px-4 pb-[200px] md:pb-32 transition-all duration-300 ${showChatPanel && showMcpDrawer ? 'pt-[72px]' : 'pt-[96px]'}`}>
                <p className={`font-medium text-primary transition-all duration-300 ${showChatPanel && showMcpDrawer ? 'text-[24px] mb-2' : showMcpDrawer ? 'text-[32px] mb-3' : 'text-[40px] mb-4'}`}>
                  Hello, Rachael
                </p>
                <p className={`font-normal text-foreground transition-all duration-300 ${showChatPanel && showMcpDrawer ? 'text-[14px] mb-4' : showMcpDrawer ? 'text-[18px] mb-6' : 'text-[24px] mb-8'}`}>
                  How can I help you today?
                </p>

                {/* Action Cards - Responsive Layout */}
                <div className={`flex gap-3 justify-center items-center transition-all duration-300 ${showMcpDrawer ? 'flex-col xl:flex-row w-[90%] xl:w-[85%] max-w-[782px]' : 'flex-col md:flex-row w-[90%] md:w-[70%] max-w-[782px]'}`}>
                  {actionCards.map((card, index) => (
                    <button
                      key={index}
                      onClick={() => handleActionCardClick(card)}
                      className={`bg-card border border-border rounded-xl text-left hover:border-primary hover:shadow-sm transition-all p-4 flex flex-col items-start gap-2 ${showMcpDrawer ? 'w-full xl:flex-1 xl:min-w-[180px] xl:max-w-[250px]' : 'w-full md:flex-1 md:min-w-[180px] md:max-w-[250px]'}`}
                    >
                      {/* Header with Icon and Title */}
                      <div className="flex items-center gap-2 w-full">
                        <div className="size-[20px] shrink-0 flex items-center justify-center">
                          <div className="size-[14px] relative">{card.icon}</div>
                        </div>
                        <h4 className="font-medium text-foreground text-[14px] leading-[20px]">
                          {card.title}
                        </h4>
                      </div>
                      {/* Content */}
                      <p className="text-[13px] leading-[18px] text-muted-foreground">
                        {card.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Container */}
            <div className={`sticky bottom-4 left-0 right-0 mx-auto transition-all duration-300 z-20 bg-background pt-4 ${showMcpDrawer ? 'xl:absolute xl:bottom-16 w-[90%] xl:w-[85%] max-w-[680px]' : 'md:absolute md:bottom-16 w-[90%] md:w-[70%] max-w-[680px]'}`}>
              <div className="bg-input-background rounded-[20px] border border-border relative transition-all duration-200" style={{ minHeight: `${containerHeight}px` }}>
                {/* Hidden spacer to ensure container grows with textarea */}
                <div style={{ height: `${containerHeight}px`, visibility: 'hidden', pointerEvents: 'none' }} aria-hidden="true" />
                
                {/* Plus Icon - Far Left */}
                <div className="absolute left-[12px] bottom-[8px] z-10">
                  <div className="relative">
                    <button 
                      onClick={() => setShowAttachMenu(!showAttachMenu)}
                      className="size-[28px] rounded-full flex items-center justify-center hover:bg-[rgba(199,199,199,0.25)] transition-colors"
                    >
                      <svg className="block size-[14px]" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 11.5">
                        <path d={svgPaths.pe763897} stroke="var(--muted-foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </button>

                    {/* Attach Menu */}
                    {showAttachMenu && (
                      <div className="absolute bottom-full left-0 mb-3 bg-white rounded-xl shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] border border-border min-w-[280px] z-50">
                        <button
                          onClick={() => {
                            setShowAttachMenu(false);
                            alert("Attach file");
                          }}
                          className="w-full px-4 py-3 flex items-start gap-3 hover:bg-secondary/50 rounded-xl transition-colors text-left"
                        >
                          <div className="size-[24px] text-muted-foreground mt-0.5">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full">
                              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Attach</p>
                            <p className="text-sm text-muted-foreground">Attach a JSON, YAML, TXT, or XML file</p>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Model Selector - Separate */}
                <div className="absolute left-[50px] bottom-[8px] z-10">
                  <div className="relative">
                    <button
                      onClick={() => setShowModelDropdown(!showModelDropdown)}
                      className="text-[14px] font-medium text-muted-foreground hover:text-foreground hover:bg-[rgba(199,199,199,0.25)] transition-colors flex items-center gap-1 rounded-full px-2 py-1"
                    >
                      <span>{selectedModel}</span>
                      <div className="size-[14px]">
                        <svg className="block size-full" fill="none" viewBox="0 0 9.33333 6.02771">
                          <path clipRule="evenodd" d="M0.390524 0.390524C0.585786 0.195262 0.902369 0.195262 1.09763 0.390524L4.66667 3.95956L8.2357 0.390524C8.43096 0.195262 8.74754 0.195262 8.94281 0.390524C9.13807 0.585786 9.13807 0.902369 8.94281 1.09763L5.02022 5.02022C4.82496 5.21548 4.50837 5.21548 4.31311 5.02022L0.390524 1.09763C0.195262 0.902369 0.195262 0.585786 0.390524 0.390524Z" fill="currentColor" fillRule="evenodd" />
                        </svg>
                      </div>
                    </button>

                    {showModelDropdown && (
                      <div className="absolute bottom-full left-0 mb-2 bg-popover rounded-lg shadow-lg border border-border min-w-[160px] z-50">
                        {models.map((model) => (
                          <button
                            key={model}
                            onClick={() => {
                              setSelectedModel(model);
                              setShowModelDropdown(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-secondary first:rounded-t-lg last:rounded-b-lg ${
                              model === selectedModel ? "bg-secondary text-primary" : "text-foreground"
                            }`}
                          >
                            {model}
                            {model === selectedModel && " ✓"}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Input Field */}
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Enter a prompt for Lightspeed"
                  className="absolute top-[4px] left-[4px] w-[calc(100%-8px)] min-h-[32px] max-h-[120px] pl-[16px] pr-[100px] pt-[8px] pb-[24px] bg-transparent outline-none text-[16px] text-foreground placeholder:text-muted-foreground resize-none overflow-y-hidden"
                  rows={1}
                  style={{ paddingBottom: '24px' }}
                />

                {/* Action Buttons - Bottom Right */}
                <div className="absolute bottom-[6px] right-[6px] flex gap-[4px] items-center z-10">
                  <button
                    onClick={() => alert("Voice input")}
                    className="size-[40px] rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors"
                  >
                    <div className="size-[20px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <rect x="7.5" y="3.33" width="5" height="8.33" rx="2.5" stroke="var(--muted-foreground)" strokeWidth="1.5" fill="none" />
                        <path d="M5 10a5 5 0 0010 0" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M10 15v2" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>

                  <button
                    onClick={handleSendMessage}
                    className="size-[40px] rounded-full hover:bg-muted/50 flex items-center justify-center transition-colors"
                  >
                    <div className="size-[20px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.0832 14.5831">
                        <path d={svgPaths.p3eea9c00} fill="var(--muted-foreground)" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Footnote - Below Input */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <p className="text-[12px] leading-[18px] text-muted-foreground">
                  Lightspeed uses AI. Check for mistakes.
                </p>
                <button className="size-[12px] hover:opacity-70 transition-opacity">
                  <svg className="block size-full" fill="none" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="5.25" stroke="var(--muted-foreground)" strokeWidth="1.5" fill="none" />
                    <path d="M6 3.5V6.5M6 8.5V9" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
            </>
            )}
            </>
            )}
          </div>
        </div>

        {/* MCP Servers Drawer (Right Side) - Inline */}
        {showMcpDrawer && (
          <McpServersDrawer isOpen={showMcpDrawer} onClose={closeMcpDrawer} onUsePrompt={handleUsePrompt} />
        )}
      </div>

      {/* Chat Panel (Left Side) - Overlay */}
      {showChatPanel && (
        <div 
          className="absolute top-[140px] left-0 z-40 bg-white shadow-lg flex" 
          style={{ height: 'calc(100% - 140px)', width: `${leftPanelWidth}px` }}
        >
          <div className="flex-1 h-full flex flex-col overflow-hidden">
            {/* Close button */}
            <div className="flex items-center justify-between p-2 border-b border-border">
              <button
                onClick={handleNewChat}
                className="bg-primary text-primary-foreground content-stretch flex gap-[4px] items-center justify-center px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
              >
                <div className="size-[18px] relative">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                    <path d={svgPaths.p16411400} fill="currentColor" />
                  </svg>
                </div>
                <span className="font-medium text-sm">New chat</span>
              </button>
              <button
                onClick={toggleChatPanel}
                className="p-2 hover:bg-secondary rounded transition-colors"
                title="Close panel"
              >
                <svg className="size-[20px]" fill="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="p-4 border-b border-border flex flex-col gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-[40px] pl-10 pr-4 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 size-[18px] pointer-events-none">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p15861e40} fill="var(--muted-foreground)" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <p className="text-xs text-muted-foreground mb-3">Drag a chat to the right to open it, or drop several to work in parallel.</p>
              <p className="text-xs font-medium text-muted-foreground mb-2">Pinned</p>
              <button
                draggable
                onDragStart={(e) => handleChatDragStart(e, "Troubleshoot system crash")}
                onClick={() => openChatSession("Troubleshoot system crash")}
                className="w-full text-left p-2 hover:bg-secondary rounded flex items-center gap-2 mb-1 cursor-grab active:cursor-grabbing"
              >
                <span className="text-sm text-foreground">⭐ Troubleshoot system crash</span>
              </button>
              <button
                draggable
                onDragStart={(e) => handleChatDragStart(e, "Help me document my code")}
                onClick={() => openChatSession("Help me document my code")}
                className="w-full text-left p-2 hover:bg-secondary rounded flex items-center gap-2 mb-4 cursor-grab active:cursor-grabbing"
              >
                <span className="text-sm text-foreground"> Help me document my code</span>
              </button>

              <p className="text-xs font-medium text-muted-foreground mb-2">Recent</p>
              {["Red Hat products and services", "Enterprise Linux installation", "Troubleshoot system crash", "Crashing pod assistance", "OpenShift AI pipelines", "Updating subscription plan", "Red Hat licensing options"].map((item, index) => (
                <button
                  key={index}
                  draggable
                  onDragStart={(e) => handleChatDragStart(e, item)}
                  className="w-full text-left p-2 hover:bg-secondary rounded flex items-center gap-2 mb-1 cursor-grab active:cursor-grabbing"
                  onClick={() => openChatSession(item)}
                >
                  <div className="size-[16px] shrink-0">
                    <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                      <rect width="16" height="16" rx="2" fill="var(--muted)" />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground truncate">{item}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Resize Handle */}
          <div
            onMouseDown={handleMouseDown}
            className={`w-[4px] h-full cursor-col-resize hover:bg-primary/50 transition-colors ${isResizing ? 'bg-primary' : 'bg-border'}`}
          />
        </div>
      )}
    </div>
  );
}