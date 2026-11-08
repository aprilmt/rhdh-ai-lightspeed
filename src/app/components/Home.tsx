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

const TOOL_JSON = `{
  "server_label": "mcp-integration-tools",
  "tools": [
    {
      "name": "software-catalog-mcp-extras.query-catalog-entities",
      "description": "Search and retrieve catalog entities from the Backstage software catalog"
    }
  ]
}`;

function formatStamp(date: Date) {
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatUpdatedAt(timestamp: number) {
  const diffMs = Math.max(0, Date.now() - timestamp);
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Updated just now";
  if (minutes < 60) return `Updated ${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Updated ${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Updated ${days} day${days === 1 ? "" : "s"} ago`;
  return `Updated ${new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

function GuestIcon() {
  return (
    <div className="size-[36px] relative shrink-0 rounded-full overflow-hidden" aria-hidden="true">
      <img
        alt=""
        className="absolute inset-0 size-full object-cover"
        src={`${import.meta.env.BASE_URL}user-avatar.png`}
      />
    </div>
  );
}

function LightspeedMark() {
  return (
    <img
      alt=""
      className="size-[36px] shrink-0 rounded-full object-contain"
      src={`${import.meta.env.BASE_URL}lightspeed-icon.png`}
    />
  );
}

type NotebookDocument = { id: string; name: string };

const ONBOARDING_DOCUMENTS: NotebookDocument[] = [
  { id: "readme", name: "README.md" },
  { id: "tsconfig", name: "tsconfig.json" },
  { id: "present", name: "RHDH present.pdf" },
];

function documentBadge(name: string) {
  const extension = name.split(".").pop()?.toLowerCase();
  if (extension === "md") return { label: "MD", className: "bg-[#e7f1fa] text-[#0066cc]" };
  if (extension === "json") return { label: "JSON", className: "bg-[#fff1e0] text-[#c46100]" };
  if (extension === "pdf") return { label: "PDF", className: "bg-[#fde7e9] text-[#c9190b]" };
  return { label: (extension || "FILE").slice(0, 4).toUpperCase(), className: "bg-secondary text-muted-foreground" };
}

function RenameNotebookModal({
  value,
  onChange,
  onClose,
  onSave,
}: {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rename-notebook-title"
        className="relative w-[min(560px,calc(100vw-32px))] rounded-[24px] bg-white px-6 pb-6 pt-6 shadow-[0px_10px_20px_0px_rgba(41,41,41,0.15)] font-[family-name:var(--font-family-text)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full hover:bg-[#f2f2f2] transition-colors"
          aria-label="Close"
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.4 19 5 17.6 10.6 12 5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4 6.4 19Z" fill="#1F1F1F" />
          </svg>
        </button>

        <h2 id="rename-notebook-title" className="pr-10 text-[20px] font-medium leading-[26px] tracking-[-0.25px] text-[#151515]">
          Rename notebook
        </h2>
        <p className="mt-2 text-[14px] font-normal leading-[24px] text-[#4d4d4d]">
          Enter a new name for this notebook.
        </p>

        <label className="mt-6 block">
          <span className="mb-2 block text-[12px] font-normal leading-[16px] text-[#151515]">
            Name
          </span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value.trim()) onSave();
              if (e.key === "Escape") onClose();
            }}
            className="h-10 w-full rounded-[6px] border-2 border-[#06c] px-4 font-[family-name:var(--font-family-text)] text-[16px] font-normal text-[#151515] outline-none"
          />
        </label>

        <div className="mt-8 flex items-center gap-2">
          <button
            type="button"
            onClick={onSave}
            disabled={!value.trim()}
            className="h-10 rounded-full bg-[#06c] px-4 text-[16px] font-normal text-white hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-full border border-[#06c] px-4 text-[16px] font-normal text-[#06c] hover:bg-[#f2f2f2] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function NotebookWorkspace({
  title,
  initialDocuments,
  panelOpen,
  onTogglePanel,
  onClose,
  onTitleChange,
}: {
  title: string;
  initialDocuments: NotebookDocument[];
  panelOpen: boolean;
  onTogglePanel: () => void;
  onClose: () => void;
  onTitleChange?: (title: string) => void;
}) {
  const [showNotice, setShowNotice] = useState(true);
  const [documents, setDocuments] = useState<NotebookDocument[]>(initialDocuments);
  const [documentMenu, setDocumentMenu] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(title);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitleDraft(title);
  }, [title]);

  useEffect(() => {
    if (!isEditingTitle) return;
    titleInputRef.current?.focus();
    titleInputRef.current?.select();
  }, [isEditingTitle]);

  const addDocuments = (files: FileList | null) => {
    if (!files?.length) return;
    setDocuments((current) => [
      ...current,
      ...Array.from(files).map((file) => ({ id: `${file.name}-${Date.now()}-${Math.random()}`, name: file.name })),
    ]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const deleteDocument = (id: string) => {
    setDocuments((current) => current.filter((document) => document.id !== id));
    setDocumentMenu(null);
  };

  const commitTitle = () => {
    const nextTitle = titleDraft.trim() || title;
    setTitleDraft(nextTitle);
    setIsEditingTitle(false);
    if (nextTitle !== title) onTitleChange?.(nextTitle);
  };

  const cancelTitleEdit = () => {
    setTitleDraft(title);
    setIsEditingTitle(false);
  };

  return (
    <div className="absolute inset-0 flex bg-background">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(event) => addDocuments(event.target.files)}
      />
      {panelOpen && (
        <aside className="w-[280px] shrink-0 border-r border-[#d2d2d2] flex flex-col bg-background">
          <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-4">
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                value={titleDraft}
                onChange={(event) => setTitleDraft(event.target.value)}
                onBlur={commitTitle}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    commitTitle();
                  }
                  if (event.key === "Escape") {
                    event.preventDefault();
                    cancelTitleEdit();
                  }
                }}
                aria-label="Notebook title"
                className="min-w-0 flex-1 rounded border-2 border-[#06c] bg-white px-2 py-0.5 text-[15px] font-medium text-[#151515] outline-none font-[family-name:var(--font-family-text)]"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingTitle(true)}
                title="Rename notebook"
                className="group/title min-w-0 flex-1 inline-flex items-center gap-1.5 rounded px-1 -mx-1 text-left text-[15px] font-medium text-[#151515] hover:bg-[#e7f1fa] transition-colors"
              >
                <span className="min-w-0 flex-1 truncate">{title}</span>
                <svg
                  className="size-3.5 shrink-0 text-[#6a6e73] opacity-0 group-hover/title:opacity-100 transition-opacity pointer-events-none"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M11.3 2.3a1.4 1.4 0 0 1 2 2L5.2 12.3 2 13.1l.8-3.2L11.3 2.3Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={onTogglePanel}
              className="p-2 rounded bg-card text-muted-foreground shadow-sm hover:bg-accent/10 transition-colors shrink-0"
              aria-label="Collapse documents"
            >
              <div className="size-[24px]">
                <CloseIocn />
              </div>
            </button>
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-2">
            <span className="text-[15px] font-normal text-[#6a6e73]">
              {documents.length} {documents.length === 1 ? "Document" : "Documents"}
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-primary text-sm font-medium inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 cursor-pointer hover:bg-[#e8e8e8] transition-colors"
            >
              <svg className="size-4 pointer-events-none" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 5.1v5.8M5.1 8h5.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span>Add</span>
            </button>
          </div>
          {documents.length > 0 && (
            <ul className="px-5 pt-2">
              {documents.map((document) => {
                const badge = documentBadge(document.name);
                return (
                  <li key={document.id} className="flex items-center gap-2 py-2">
                    <span className={`shrink-0 rounded px-1 py-0.5 text-[10px] font-semibold leading-none ${badge.className}`}>
                      {badge.label}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm text-[#151515]" title={document.name}>
                      {document.name}
                    </span>
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setDocumentMenu((open) => (open === document.id ? null : document.id))}
                        className="p-1 rounded-full text-muted-foreground hover:bg-[#e8e8e8] hover:text-foreground transition-colors"
                        aria-label={`Actions for ${document.name}`}
                      >
                        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="5" r="1.6" />
                          <circle cx="12" cy="12" r="1.6" />
                          <circle cx="12" cy="19" r="1.6" />
                        </svg>
                      </button>
                      {documentMenu === document.id && (
                        <div className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded-lg bg-white py-1 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]">
                          <button
                            type="button"
                            onClick={() => deleteDocument(document.id)}
                            className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary/50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <div className="flex items-center justify-end px-6 pt-4 pb-2 shrink-0">
          {!panelOpen && (
            <div className="mr-auto -ml-2 flex flex-col items-center gap-3">
              <div className="relative group/expand-tooltip">
                <button
                  onClick={onTogglePanel}
                  className="p-2 rounded bg-card text-muted-foreground shadow-sm hover:bg-accent/10 transition-colors"
                  aria-label="Expand documents"
                >
                  <div className="size-[24px]">
                    <ArrowMenuOpen />
                  </div>
                </button>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-[#151515] text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/expand-tooltip:opacity-100 transition-opacity z-20">
                  Expand documents
                  <div className="absolute right-full top-1/2 -translate-y-1/2">
                    <div className="border-4 border-transparent border-r-[#151515]"></div>
                  </div>
                </div>
              </div>
              <div className="relative group/add-tooltip">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded bg-card text-muted-foreground shadow-sm hover:bg-accent/10 transition-colors"
                  aria-label="Add documents"
                >
                  <svg className="size-[24px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="7" className="stroke-primary" strokeWidth="1.5" />
                    <path d="M12 8.75v6.5M8.75 12h6.5" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-[#151515] text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/add-tooltip:opacity-100 transition-opacity z-20">
                  Add documents
                  <div className="absolute right-full top-1/2 -translate-y-1/2">
                    <div className="border-4 border-transparent border-r-[#151515]"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-primary text-sm font-medium hover:bg-[#e8e8e8] transition-colors"
            aria-label="Close notebook"
          >
            <span>Close notebook</span>
            <svg className="size-3.5 pointer-events-none" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <img
            alt=""
            className="size-10 mb-5 object-contain"
            src={`${import.meta.env.BASE_URL}notebook-book.png`}
          />
          <h2 className="text-[20px] font-medium text-[#151515] mb-5">Upload a resource to get started</h2>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full border border-primary text-primary px-4 py-1.5 text-sm font-medium hover:bg-primary/5 transition-colors"
          >
            Upload a resource
            <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 10.2V3.4M8 3.4 5.6 5.8M8 3.4l2.4 2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.2 10.2v1.3A1.5 1.5 0 0 0 4.7 13h6.6a1.5 1.5 0 0 0 1.5-1.5v-1.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="shrink-0 px-8 pb-4 w-full max-w-[980px] mx-auto">
          {showNotice && (
            <div className="rounded-lg border border-[#6d5bd0] bg-white px-4 py-3 mb-4 relative">
              <button
                onClick={() => setShowNotice(false)}
                className="absolute top-2.5 right-2.5 text-[#6a6e73] hover:text-[#151515] p-1"
                aria-label="Dismiss notice"
              >
                <svg className="size-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
              <div className="flex gap-3 pr-6">
                <svg className="size-5 shrink-0 text-[#6d5bd0] mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.9-11.2a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0ZM9.2 9.1h1.6v5.2H9.2V9.1Z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-[#151515] mb-0.5">Important</p>
                  <p className="text-sm leading-relaxed text-[#151515]">
                    This feature uses AI technology. Do not include any personal information or any other sensitive information in your input. Interactions may be used to improve Red Hat&apos;s products or services.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-full bg-[#f0f0f0] px-6 py-3.5">
            <input
              type="text"
              placeholder="Ask about your documents..."
              className="w-full bg-transparent outline-none text-[15px] text-foreground placeholder:text-[#8b8d8f]"
            />
          </div>
          <p className="text-center text-xs text-[#8b8d8f] mt-3">Always review AI generated content prior to use.</p>
        </div>
      </div>
    </div>
  );
}

function GeneratingReply() {
  return (
    <div className="mb-6" style={{ animation: "lsp-fade-up 0.35s ease-out" }}>
      <div className="flex items-center gap-3 mb-2">
        <div className="animate-pulse">
          <LightspeedMark />
        </div>
        <span className="text-sm font-medium text-foreground">rhdh-lightspeed-mock</span>
        <span className="text-xs text-muted-foreground">Generating</span>
        <span className="flex items-center gap-1" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="size-1.5 rounded-full bg-primary"
              style={{ animation: "lsp-dot 1s infinite", animationDelay: `${dot * 0.15}s` }}
            />
          ))}
        </span>
      </div>
      <div className="ml-12 space-y-2">
        <div className="h-3 w-2/3 rounded-full bg-secondary animate-pulse" />
        <div className="h-3 w-1/2 rounded-full bg-secondary animate-pulse" />
      </div>
    </div>
  );
}

function ToolCallCard({ sentAt }: { sentAt: number }) {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyJson = () => {
    navigator.clipboard?.writeText(TOOL_JSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full text-left">
      <div className="flex items-center gap-3 mb-3">
        <LightspeedMark />
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <span className="text-sm font-medium text-foreground">rhdh-lightspeed-mock</span>
          <span className="text-[11px] leading-none px-1.5 py-0.5 rounded-full border border-border text-muted-foreground">AI</span>
          <span className="text-xs text-muted-foreground">{formatStamp(new Date(sentAt))}</span>
        </div>
      </div>

      <div className="ml-12 mb-4 space-y-2 text-sm leading-relaxed text-foreground">
        <p>I checked the connected MCP servers for tools that can answer this.</p>
        <p>
          The software catalog integration is available. It can search Backstage entities and return their names, owners, and links. The tool response is below.
        </p>
      </div>

      <div className="border border-border rounded-lg bg-white overflow-hidden ml-12">
        <button
          onClick={() => setOpen((value) => !value)}
          className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-secondary/40 transition-colors"
        >
          <svg className={`size-4 text-muted-foreground transition-transform ${open ? "" : "-rotate-90"}`} viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium text-primary">Tool response: mcp_list_tools</span>
        </button>

        {open && (
          <div className="px-4 pb-4">
            <p className="text-sm text-foreground mb-3">Here's a summary of your response</p>
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <svg className="size-4 text-primary" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M10.2 1.4a1.2 1.2 0 0 1 1.7 0l2.7 2.7a1.2 1.2 0 0 1 0 1.7l-1.1 1.1-4.4-4.4 1.1-1.1zM8.4 3.2 2.2 9.4c-.2.2-.3.4-.4.7l-.7 2.8a.6.6 0 0 0 .7.7l2.8-.7c.3-.1.5-.2.7-.4l6.2-6.2-4.4-4.4z" />
                </svg>
                <span className="text-sm font-medium text-foreground">mcp-integration-tools</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Execution time: 10ms</p>
              <div className="h-px bg-border my-4" />
              <p className="text-sm font-medium text-foreground mb-2">Response</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] leading-none px-1.5 py-0.5 rounded-full border border-border text-muted-foreground">AI</span>
                <span className="text-xs text-muted-foreground">{formatStamp(new Date(sentAt))}</span>
              </div>
              <div className="rounded-md bg-[#1e1e1e] text-[#d4d4d4] overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-medium">JSON</span>
                  <button onClick={copyJson} className="text-white/80 hover:text-white" aria-label="Copy JSON">
                    {copied ? (
                      <span className="text-[11px]">Copied</span>
                    ) : (
                      <svg className="size-4" viewBox="0 0 16 16" fill="none">
                        <rect x="5.5" y="5.5" width="8" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M10.5 5.5V3.2A1.2 1.2 0 0 0 9.3 2H3.2A1.2 1.2 0 0 0 2 3.2v6.1a1.2 1.2 0 0 0 1.2 1.2H5.5" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    )}
                  </button>
                </div>
                <pre className="px-3 pb-3 text-[12px] leading-5 font-mono overflow-x-auto whitespace-pre text-[#9cdcfe]">
{`{
  `}<span className="text-[#9cdcfe]">"server_label"</span>{`: `}<span className="text-[#ce9178]">"mcp-integration-tools"</span>{`,
  `}<span className="text-[#9cdcfe]">"tools"</span>{`: [
    {
      `}<span className="text-[#9cdcfe]">"name"</span>{`: `}<span className="text-[#ce9178]">"software-catalog-mcp-extras.query-catalog-entities"</span>{`,
      `}<span className="text-[#9cdcfe]">"description"</span>{`: `}<span className="text-[#ce9178]">"Search and retrieve catalog entities from the Backstage software catalog"</span>{`
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("llama 3.1.8b");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string; sentAt: number }>>([]);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "notebooks">("chat");
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showMcpDrawer, setShowMcpDrawer] = useState(false);
  const [mcpToolsEnabled, setMcpToolsEnabled] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [containerHeight, setContainerHeight] = useState(76);
  const [leftPanelWidth, setLeftPanelWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [showMcpPromo, setShowMcpPromo] = useState(true);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [notebookMenuOpen, setNotebookMenuOpen] = useState<number | null>(null);
  const [notebookOpen, setNotebookOpen] = useState<"new" | "onboarding" | null>(null);
  const [notebookPanelOpen, setNotebookPanelOpen] = useState(true);
  const [notebookTitles, setNotebookTitles] = useState({
    0: "Onboarding RHDH",
    1: "CI/CD Pipeline",
    2: "Untitled notebook",
  });
  const [notebookUpdatedAt, setNotebookUpdatedAt] = useState({
    0: Date.now() - 2 * 60 * 60 * 1000,
    1: Date.now() - 26 * 60 * 60 * 1000,
    2: Date.now() - 5 * 60 * 1000,
  });
  const [newNotebookTitle, setNewNotebookTitle] = useState("Untitled Notebook");
  const [renameNotebookIndex, setRenameNotebookIndex] = useState<number | null>(null);
  const [renameNotebookDraft, setRenameNotebookDraft] = useState("");

  const touchNotebookUpdatedAt = (index: 0 | 1 | 2) => {
    setNotebookUpdatedAt((current) => ({ ...current, [index]: Date.now() }));
  };
  const [openSessions, setOpenSessions] = useState<Array<{ id: number; title: string; input: string; messages: Array<{ role: string; content: string }>; width?: number; height?: number }>>([]);
  const [draggedChatTitle, setDraggedChatTitle] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggingSessionId, setDraggingSessionId] = useState<number | null>(null);
  const [sessionDropTarget, setSessionDropTarget] = useState<{ id: number; edge: "left" | "right" | "top" | "bottom" } | null>(null);
  const [resizingSession, setResizingSession] = useState<{ id: number; startX: number; startY: number; startW: number; startH: number } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const generationRef = useRef(0);

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
    const text = prompt.trim();
    if (text && !isGenerating) {
      const generation = ++generationRef.current;
      setChatHistory([...chatHistory, { role: "user", content: text, sentAt: Date.now() }]);
      setPrompt("");
      setIsGenerating(true);
      setTimeout(() => {
        if (generationRef.current !== generation) return;
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: `I can help you with that. Let me analyze your request about "${text.substring(0, 50)}..."`, sentAt: Date.now() },
        ]);
        setIsGenerating(false);
      }, 1400);
    }
  };

  const handleActionCardClick = (card: ActionCard) => {
    setPrompt(card.description);
  };

  const handleNewChat = () => {
    generationRef.current += 1;
    setChatHistory([]);
    setPrompt("");
    setOpenSessions([]);
    setIsGenerating(false);
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
  const getDropEdge = (e: React.DragEvent): "left" | "right" | "top" | "bottom" => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const distLeft = x;
    const distRight = rect.width - x;
    const distTop = y;
    const distBottom = rect.height - y;
    const nearest = Math.min(distLeft, distRight, distTop, distBottom);
    if (nearest === distLeft) return "left";
    if (nearest === distRight) return "right";
    if (nearest === distTop) return "top";
    return "bottom";
  };

  const reorderSessions = (draggedId: number, targetId: number, edge: "left" | "right" | "top" | "bottom") => {
    setOpenSessions((prev) => {
      if (draggedId === targetId) return prev;
      const arr = [...prev];
      const from = arr.findIndex((s) => s.id === draggedId);
      if (from < 0) return prev;
      const [moved] = arr.splice(from, 1);
      const to = arr.findIndex((s) => s.id === targetId);
      if (to < 0) return prev;
      const insertAt = edge === "right" || edge === "bottom" ? to + 1 : to;
      arr.splice(insertAt, 0, moved);
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
    setSessionDropTarget(null);
  };

  const handleSessionDragOver = (e: React.DragEvent, id: number) => {
    if (draggingSessionId === null || draggingSessionId === id) return;
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    const edge = getDropEdge(e);
    setSessionDropTarget((current) =>
      current?.id === id && current.edge === edge ? current : { id, edge }
    );
  };

  const handleSessionDrop = (e: React.DragEvent, id: number) => {
    if (draggingSessionId === null || draggingSessionId === id) return;
    e.preventDefault();
    e.stopPropagation();
    const edge = sessionDropTarget?.id === id ? sessionDropTarget.edge : getDropEdge(e);
    reorderSessions(draggingSessionId, id, edge);
    setDraggingSessionId(null);
    setSessionDropTarget(null);
  };

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatHistory.length, isGenerating]);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to calculate scrollHeight properly
      textarea.style.height = '32px';
      // Set height based on scroll height (content)
      const newHeight = Math.min(textarea.scrollHeight, 120); // Max 120px (about 4 lines)
      textarea.style.height = `${newHeight}px`;
      setContainerHeight(Math.max(76, parseInt(textarea.style.height || '32') + 44));
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
          <button
            className="size-[40px] rounded-full hover:bg-[rgba(199,199,199,0.25)] transition-colors flex items-center justify-center"
            onClick={() => { setShowHeaderMenu(!showHeaderMenu); setShowMcpPromo(false); }}
            aria-label="More options"
          >
            <svg className="block size-[24px]" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24" aria-hidden="true"><path></path><path d={svgPaths.p34810300} fill="var(--foreground)" /></svg>
          </button>

          {/* MCP Feature Promo Popover - PatternFly Hint Style */}
          {showMcpPromo && (
            <div className="absolute right-[-8px] top-[44px] z-50 w-[320px] animate-[slideInDown_0.3s_ease-out]">
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
            <div className="absolute right-0 top-[44px] z-50 w-[320px]">
              <Menu onMcpSettingsClick={handleMcpSettingsClick} mcpSettingsDisabled={activeTab === "notebooks"} />
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
              notebookOpen ? (
              <NotebookWorkspace
                key={notebookOpen}
                title={notebookOpen === "onboarding" ? notebookTitles[0] : newNotebookTitle}
                initialDocuments={notebookOpen === "onboarding" ? ONBOARDING_DOCUMENTS : []}
                panelOpen={notebookPanelOpen}
                onTogglePanel={() => setNotebookPanelOpen((open) => !open)}
                onTitleChange={(nextTitle) => {
                  if (notebookOpen === "onboarding") {
                    setNotebookTitles((current) => ({ ...current, 0: nextTitle }));
                    touchNotebookUpdatedAt(0);
                  } else {
                    setNewNotebookTitle(nextTitle);
                  }
                }}
                onClose={() => {
                  setNotebookOpen(null);
                  setNotebookPanelOpen(true);
                  setNewNotebookTitle("Untitled Notebook");
                }}
              />
              ) : (
              /* Notebooks Page - My Notebooks */
              <div className="p-6">
                {/* Header with title and create button */}
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-xl font-semibold text-[#151515]">My Notebooks</h1>
                  <button
                    onClick={() => {
                      setNewNotebookTitle("Untitled Notebook");
                      setNotebookOpen("new");
                    }}
                    className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Create new notebook
                  </button>
                </div>
                
                {/* Notebook cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[
                    { index: 0 as const, documents: "3 Documents", open: () => setNotebookOpen("onboarding") },
                    { index: 1 as const, documents: "3 Documents", open: undefined },
                    { index: 2 as const, documents: "0 Documents", open: undefined },
                  ].map((card) => (
                    <div
                      key={card.index}
                      onClick={card.open}
                      className="@container bg-white border border-border rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer group min-h-[120px] flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="size-5 text-primary shrink-0">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                              <path d="M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm4-8h6v2h-6zm0 4h6v2h-6zm0 4h6v2h-6z"/>
                            </svg>
                          </div>
                          <span className="font-medium text-[#151515] truncate">{notebookTitles[card.index]}</span>
                        </div>
                        <div className="relative shrink-0">
                          <button
                            onClick={(e) => { e.stopPropagation(); setNotebookMenuOpen(notebookMenuOpen === card.index ? null : card.index); }}
                            className="rounded-full p-1 text-muted-foreground hover:bg-[#e8e8e8] hover:text-foreground transition-colors"
                          >
                            <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="5" r="2"/>
                              <circle cx="12" cy="12" r="2"/>
                              <circle cx="12" cy="19" r="2"/>
                            </svg>
                          </button>
                          {notebookMenuOpen === card.index && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] py-1 min-w-[150px] z-50">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setNotebookMenuOpen(null);
                                  setRenameNotebookIndex(card.index);
                                  setRenameNotebookDraft(notebookTitles[card.index]);
                                }}
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
                      <div className="mt-auto flex flex-col gap-0.5 pt-1 @[260px]:flex-row @[260px]:items-center @[260px]:justify-between @[260px]:gap-2">
                        <p className="text-sm text-muted-foreground whitespace-nowrap">{card.documents}</p>
                        <p className="text-xs text-[#6a6e73] whitespace-nowrap">
                          {formatUpdatedAt(notebookUpdatedAt[card.index])}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {renameNotebookIndex !== null && (
                  <RenameNotebookModal
                    value={renameNotebookDraft}
                    onChange={setRenameNotebookDraft}
                    onClose={() => setRenameNotebookIndex(null)}
                    onSave={() => {
                      const nextTitle = renameNotebookDraft.trim();
                      if (!nextTitle) return;
                      setNotebookTitles((current) => ({
                        ...current,
                        [renameNotebookIndex]: nextTitle,
                      }));
                      touchNotebookUpdatedAt(renameNotebookIndex as 0 | 1 | 2);
                      setRenameNotebookIndex(null);
                    }}
                  />
                )}
              </div>
              )
            ) : (
            <>
            <div className="flex h-full min-h-0">
            {/* Left rail — same width as the history/new-chat buttons so content isn't covered */}
            <div className="w-10 shrink-0 ml-2 mt-4 flex flex-col gap-3 z-10">
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
                    onClick={handleNewChat}
                    className="p-2 rounded bg-card text-muted-foreground shadow-sm hover:bg-accent/10 transition-colors"
                    aria-label="New chat"
                  >
                    <div className="size-[24px]">
                      <EditSquare />
                    </div>
                  </button>
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 bg-[#151515] text-white text-xs rounded whitespace-nowrap opacity-0 pointer-events-none group-hover/new-chat-tooltip:opacity-100 transition-opacity z-20">
                    New chat
                    <div className="absolute right-full top-1/2 -translate-y-1/2">
                      <div className="border-4 border-transparent border-r-[#151515]"></div>
                    </div>
                  </div>
                </div>
            </div>
            <div className={`w-px bg-[#c7c7c7] shrink-0 self-stretch ml-2 ${showChatPanel ? 'hidden' : ''}`} />

            <div className="flex-1 min-w-0 min-h-0 overflow-hidden relative">
            {openSessions.length > 0 ? (
              /* Parallel chat sessions workspace */
              <div className="px-4 pb-4 pt-3 h-full overflow-y-auto">
                {/* Model selector for sessions workspace */}
                <div className="flex justify-end items-center h-10 mb-3 z-20">
                  <div className="relative">
                    <button
                      onClick={() => setShowModelDropdown(!showModelDropdown)}
                      className="text-[14px] font-normal text-[#151515] bg-[rgba(199,199,199,0.25)] hover:bg-[rgba(199,199,199,0.4)] transition-colors flex items-center gap-1 rounded-full px-3 py-1"
                    >
                      <span>{selectedModel}</span>
                      <div
                        className="size-[9px] shrink-0 self-center bg-current"
                        style={{
                          WebkitMask: `url(${import.meta.env.BASE_URL}caret-down-solid.png) center / contain no-repeat`,
                          mask: `url(${import.meta.env.BASE_URL}caret-down-solid.png) center / contain no-repeat`,
                        }}
                        aria-hidden="true"
                      />
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
                  {openSessions.map((session) => {
                    const dropEdge =
                      sessionDropTarget?.id === session.id && draggingSessionId !== session.id
                        ? sessionDropTarget.edge
                        : null;
                    return (
                    <div
                      key={session.id}
                      onDragOver={(e) => handleSessionDragOver(e, session.id)}
                      onDragLeave={() => {
                        if (sessionDropTarget?.id === session.id) setSessionDropTarget(null);
                      }}
                      onDrop={(e) => handleSessionDrop(e, session.id)}
                      style={{ width: `${session.width ?? 460}px`, height: `${session.height ?? 440}px` }}
                      className={`relative bg-white border border-border rounded-lg shadow-sm flex flex-col overflow-hidden transition-opacity ${
                        draggingSessionId === session.id ? "opacity-50" : ""
                      }`}
                    >
                      {dropEdge === "left" && (
                        <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-primary z-20 pointer-events-none" />
                      )}
                      {dropEdge === "right" && (
                        <div className="absolute right-0 top-2 bottom-2 w-[3px] rounded-full bg-primary z-20 pointer-events-none" />
                      )}
                      {dropEdge === "top" && (
                        <div className="absolute top-0 left-2 right-2 h-[3px] rounded-full bg-primary z-20 pointer-events-none" />
                      )}
                      {dropEdge === "bottom" && (
                        <div className="absolute bottom-0 left-2 right-2 h-[3px] rounded-full bg-primary z-20 pointer-events-none" />
                      )}
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
                            <div className="size-[14px] shrink-0 flex items-center justify-center">
                              <svg className="block size-[14px]" viewBox="0 0 512 512" aria-hidden="true">
                                <path
                                  fill={session.input.trim() ? "var(--primary)" : "var(--muted-foreground)"}
                                  d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                                />
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
                    );
                  })}
                </div>
              </div>
            ) : (
            <div className="flex flex-col h-full min-h-0">
            {/* Chat Messages */}
            {chatHistory.length > 0 && (
              <div ref={messagesRef} className="flex-1 min-h-0 overflow-y-auto px-6 pt-4 pb-6">
                <div className="max-w-[900px] mx-auto pb-6">
                {chatHistory.map((message, index) => (
                  <div key={index} className="mb-6 text-left" style={message.role === "assistant" ? { animation: "lsp-fade-up 0.45s ease-out" } : undefined}>
                    {message.role === "user" ? (
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <GuestIcon />
                          <span className="text-sm font-medium text-foreground">Guest</span>
                          <span className="text-xs text-muted-foreground">{formatStamp(new Date(message.sentAt))}</span>
                        </div>
                        <div className="ml-12 inline-block px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm">
                          {message.content}
                        </div>
                      </div>
                    ) : mcpToolsEnabled ? (
                      <ToolCallCard sentAt={message.sentAt} />
                    ) : (
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <LightspeedMark />
                          <span className="text-sm font-medium text-foreground">rhdh-lightspeed-mock</span>
                          <span className="text-[11px] leading-none px-1.5 py-0.5 rounded-full border border-border text-muted-foreground">AI</span>
                          <span className="text-xs text-muted-foreground">{formatStamp(new Date(message.sentAt))}</span>
                        </div>
                        <p className="ml-12 text-sm leading-relaxed text-foreground">{message.content}</p>
                      </div>
                    )}
                  </div>
                ))}
                {isGenerating && <GeneratingReply />}
                </div>
              </div>
            )}

            {/* Welcome Message */}
            {chatHistory.length === 0 && (
              <div className={`flex flex-1 min-h-0 flex-col items-center overflow-y-auto px-4 pb-4 ${showChatPanel && showMcpDrawer ? "pt-4" : "pt-12"}`} style={{ justifyContent: "safe center" }}>
                <p className={`font-medium text-primary transition-all duration-300 ${showChatPanel && showMcpDrawer ? 'text-[24px] mb-2' : showMcpDrawer ? 'text-[32px] mb-2' : 'text-[40px] mb-2'}`}>
                  Hello, Rachael
                </p>
                <p className={`font-normal text-foreground transition-all duration-300 ${showChatPanel && showMcpDrawer ? 'text-[14px] mb-4' : showMcpDrawer ? 'text-[18px] mb-4' : 'text-[24px] mb-4'}`}>
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
            <div className={`relative shrink-0 mx-auto z-20 bg-background pt-2 pb-4 ${showMcpDrawer ? 'w-[90%] xl:w-[85%] max-w-[680px]' : 'w-[90%] md:w-[70%] max-w-[680px]'}`}>
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
                      <div
                        className="size-[9px] shrink-0 self-center bg-current"
                        style={{
                          WebkitMask: `url(${import.meta.env.BASE_URL}caret-down-solid.png) center / contain no-repeat`,
                          mask: `url(${import.meta.env.BASE_URL}caret-down-solid.png) center / contain no-repeat`,
                        }}
                        aria-hidden="true"
                      />
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
                  className="absolute top-[4px] left-[4px] w-[calc(100%-8px)] min-h-[28px] max-h-[120px] pl-[16px] pr-[100px] pt-[6px] pb-[20px] bg-transparent outline-none text-[16px] font-normal text-foreground placeholder:font-normal placeholder:text-[#8a8d90] resize-none overflow-y-hidden"
                  rows={1}
                  style={{ paddingBottom: '20px' }}
                />

                {/* Action Buttons - Bottom Right */}
                <div className="absolute bottom-[6px] right-[12px] flex gap-[4px] items-center z-10">
                  <button
                    onClick={() => alert("Voice input")}
                    className="size-[28px] rounded-full flex items-center justify-center hover:bg-[rgba(199,199,199,0.25)] transition-colors"
                    aria-label="Voice input"
                  >
                    <div
                      className="size-[16px] shrink-0 bg-[var(--muted-foreground)]"
                      style={{
                        WebkitMask: `url(${import.meta.env.BASE_URL}microphone-solid.png) center / contain no-repeat`,
                        mask: `url(${import.meta.env.BASE_URL}microphone-solid.png) center / contain no-repeat`,
                      }}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    onClick={handleSendMessage}
                    className="size-[28px] rounded-full flex items-center justify-center hover:bg-[rgba(199,199,199,0.25)] transition-colors"
                    aria-label="Send"
                  >
                    <div className="size-[14px] shrink-0 flex items-center justify-center">
                      <svg className="block size-[14px]" viewBox="0 0 512 512" aria-hidden="true">
                        <path
                          fill={prompt.trim() ? "var(--primary)" : "var(--muted-foreground)"}
                          d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                        />
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
            </div>
            )}
            </div>
            </div>
            </>
            )}
          </div>
        </div>

        {/* MCP Servers Drawer (Right Side) - Inline */}
        {showMcpDrawer && (
          <McpServersDrawer isOpen={showMcpDrawer} onClose={closeMcpDrawer} onUsePrompt={handleUsePrompt} onEnabledChange={setMcpToolsEnabled} />
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
                aria-label="Close panel"
              >
                <div className="size-[24px]">
                  <CloseIocn />
                </div>
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
                <span className="text-sm text-foreground">⭐ Help me document my code</span>
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
                  <div className="size-[16px] shrink-0 text-muted-foreground">
                    <svg className="block size-full" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M3 2.5h10A1.5 1.5 0 0 1 14.5 4v6A1.5 1.5 0 0 1 13 11.5H5.5L3 14V2.5z"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinejoin="round"
                      />
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