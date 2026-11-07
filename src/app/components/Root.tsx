import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import svgPaths from "../../imports/svg-4cexv9f4rn";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`group absolute left-0 right-0 h-[48px] cursor-pointer bg-[#f2f2f2] ${
        isActive ? "" : "hover:bg-[#e8e8e8]"
      }`}
    >
      <span
        className={`pointer-events-none absolute top-1 right-3 bottom-1 left-3 rounded-lg bg-white shadow-sm ${
          isActive ? "opacity-100" : "opacity-0 group-focus-visible:opacity-100"
        }`}
      />
      <p className="absolute z-10 font-['Red_Hat_Text:Regular',sans-serif] font-normal leading-[20px] left-[54px] text-[#151515] text-[14px] top-[calc(50%-10px)] whitespace-nowrap pointer-events-none">
        {label}
      </p>
      <div className="-translate-y-1/2 absolute left-[24px] z-10 size-[24px] top-1/2 pointer-events-none">
        {icon}
      </div>
    </button>
  );
}

export default function Root() {
  const navigate = useNavigate();
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [focusedNav, setFocusedNav] = useState("lightspeed");

  const navigationItems = [
    {
      path: "/",
      label: "Home",
      icon: (
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="Home">
            <path clipRule="evenodd" d={svgPaths.p28858c80} fill="var(--fill-0, #707070)" fillRule="evenodd" id="Shape" />
          </g>
        </svg>
      ),
    },
    {
      path: "/catalog",
      label: "Catalog",
      icon: (
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g clipPath="url(#clip0_1_5533)" id="Category">
            <g id="Vector" />
            <path d={svgPaths.p3ffda0c0} fill="var(--fill-0, #707070)" id="Vector_2" />
          </g>
          <defs>
            <clipPath id="clip0_1_5533">
              <rect fill="white" height="24" width="24" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      path: "/apis",
      label: "APIs",
      icon: (
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g clipPath="url(#clip0_1_5411)" id="Extension">
            <g id="Vector" />
            <path d={svgPaths.p31800c00} fill="var(--fill-0, #707070)" id="Vector_2" />
          </g>
          <defs>
            <clipPath id="clip0_1_5411">
              <rect fill="white" height="24" width="24" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      path: "/docs",
      label: "Docs",
      icon: (
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g clipPath="url(#clip0_1_5576)" id="Library books">
            <g id="Vector" />
            <path d={svgPaths.p35748100} fill="var(--fill-0, #707070)" id="Vector_2" />
          </g>
          <defs>
            <clipPath id="clip0_1_5576">
              <rect fill="white" height="24" width="24" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      path: "/learning-paths",
      label: "Learning Paths",
      icon: (
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g clipPath="url(#clip0_1_5427)" id="School">
            <g id="Vector" />
            <path d={svgPaths.p5112380} fill="var(--fill-0, #707070)" id="Vector_2" />
          </g>
          <defs>
            <clipPath id="clip0_1_5427">
              <rect fill="white" height="24" width="24" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      path: "/clusters",
      label: "Clusters",
      icon: (
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g clipPath="url(#clip0_1_5516)" id="Device hub">
            <g id="Vector" />
            <g clipPath="url(#clip1_1_5516)" id="hub_FILL0_wght400_GRAD0_opsz48 2">
              <path d={svgPaths.p17450d00} fill="var(--fill-0, #707070)" id="Vector_2" />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_1_5516">
              <rect fill="white" height="24" width="24" />
            </clipPath>
            <clipPath id="clip1_1_5516">
              <rect fill="white" height="24" transform="translate(0 1)" width="24" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      path: "/tech-radar",
      label: "Tech Radar",
      icon: (
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="Add Circle Outline">
            <path clipRule="evenodd" d={svgPaths.p16114e80} fill="var(--fill-0, #707070)" fillRule="evenodd" id="Shape" />
            <circle cx="12" cy="12" fill="var(--fill-0, #707070)" id="Ellipse 29" r="4" />
            <rect fill="var(--fill-0, #707070)" height="4" id="Rectangle 808" width="2" x="11" />
            <rect fill="var(--fill-0, #707070)" height="4" id="Rectangle 809" width="2" x="11" y="20" />
            <rect fill="var(--fill-0, #707070)" height="4" id="Rectangle 810" transform="rotate(-90 20 13)" width="2" x="20" y="13" />
            <rect fill="var(--fill-0, #707070)" height="4" id="Rectangle 811" transform="rotate(-90 0 13)" width="2" y="13" />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <div className="relative w-full h-screen bg-[#f2f2f2] overflow-hidden">
      {/* Logo */}
      <div className="absolute h-[64px] left-0 top-0 w-[194px] z-20 bg-[#f2f2f2] border-b border-[#c7c7c7]">
        <div className="absolute h-[40px] left-[24px] top-[12px] w-[150px]">
          <img
            alt="Red Hat Developer Hub"
            className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
            src={`${import.meta.env.BASE_URL}logo.png`}
          />
        </div>
      </div>

      {/* Global Header */}
      <div className="absolute h-[64px] left-[194px] right-0 top-0 bg-[#f2f2f2] border-b border-[#c7c7c7] z-10 flex items-center justify-between px-6">
        {/* Search */}
        <div className="flex items-center gap-2 flex-1 max-w-[500px]">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full h-[40px] pl-10 pr-4 rounded-lg border border-[#e0e0e0] bg-white text-[16px] font-['Red_Hat_Text:Regular',sans-serif] text-[#4d4d4d] focus:outline-none focus:border-[#06c]"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 size-[24px] pointer-events-none">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d={svgPaths.p15861e40} fill="var(--fill-0, #707070)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <button className="relative size-[24px] hover:opacity-70 transition-opacity" onClick={() => alert("Self-service clicked")}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path d={svgPaths.pfb10b00} fill="var(--fill-0, #1F1F1F)" />
            </svg>
          </button>
          <button className="relative size-[24px] hover:opacity-70 transition-opacity" onClick={() => alert("Starred items")}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path d={svgPaths.p9628000} fill="var(--fill-0, #1F1F1F)" />
            </svg>
          </button>
          <button className="relative size-[24px] hover:opacity-70 transition-opacity" onClick={() => alert("Apps")}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path d={svgPaths.p2c42bc80} fill="var(--fill-0, #1F1F1F)" />
            </svg>
          </button>
          <button className="relative size-[24px] hover:opacity-70 transition-opacity" onClick={() => alert("Help")}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path d={svgPaths.p54dfa80} fill="var(--fill-0, #1F1F1F)" />
            </svg>
          </button>
          <button className="relative size-[24px] hover:opacity-70 transition-opacity" onClick={() => alert("Notifications")}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path d={svgPaths.p8a21180} fill="var(--fill-0, #1F1F1F)" />
            </svg>
          </button>
          <div className="h-[40px] w-px bg-[#c7c7c7]" />
          <button
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="relative size-[24px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <path d={svgPaths.paa44300} fill="var(--fill-0, #1F1F1F)" />
              </svg>
            </div>
            <span className="font-['Red_Hat_Text:Medium',sans-serif] font-medium text-[#151515] text-[14px]">John Smith</span>
          </button>
        </div>
      </div>

      {/* Navigation Sidebar */}
      <div className="absolute left-0 top-[64px] w-[224px] h-[calc(100vh-64px)] bg-[#f2f2f2] border-r border-[#c7c7c7] z-10">
        <div className="relative h-full flex flex-col">
          {/* Top Navigation Items */}
          <div className="relative h-[353px] overflow-clip shrink-0">
            {navigationItems.map((item, index) => (
              <div key={item.path} className="relative" style={{ top: `${index < 6 ? index * 48 : 305}px` }}>
                {index === 6 && (
                  <div className="absolute h-[17px] w-[224px] -top-[17px]">
                    <div className="absolute bg-[#c7c7c7] h-px left-0 right-0 top-[8px]" />
                  </div>
                )}
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isActive={focusedNav === item.path}
                  onClick={() => {
                    setFocusedNav(item.path);
                    navigate(item.path);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="relative h-[48px]">
            <NavItem
              icon={
                <svg className="absolute block size-full" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    fill="var(--fill-0, #707070)"
                    d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"
                  />
                </svg>
              }
              label="Lightspeed"
              path="/lightspeed"
              isActive={focusedNav === "lightspeed"}
              onClick={() => {
                setFocusedNav("lightspeed");
                navigate("/");
              }}
            />
          </div>

          {/* Bottom Administration */}
          <div className="absolute bottom-0 left-0 right-0 h-[65px]">
            <div className="absolute bg-[#c7c7c7] h-px left-0 right-0 top-0" />
            <button
              onClick={() => setFocusedNav("administration")}
              className={`group absolute h-[48px] left-0 top-[17px] w-[224px] border-r border-[#c7c7c7] box-border bg-[#f2f2f2] ${
                focusedNav === "administration" ? "" : "hover:bg-[#e8e8e8]"
              }`}
            >
              <span
                className={`pointer-events-none absolute top-1 right-3 bottom-1 left-3 rounded-lg bg-white shadow-sm ${
                  focusedNav === "administration" ? "opacity-100" : "opacity-0 group-focus-visible:opacity-100"
                }`}
              />
              <p className="absolute z-10 font-['Red_Hat_Text:SemiBold',sans-serif] font-semibold leading-[20px] left-[54px] text-[#151515] text-[14px] top-[calc(50%-10px)] whitespace-nowrap pointer-events-none">
                Administration
              </p>
              <div className="absolute left-[24px] z-10 size-[24px] top-[12px] pointer-events-none">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <path d={svgPaths.p381cb480} fill="var(--fill-0, #707070)" />
                </svg>
              </div>
              <div className="absolute left-[176px] z-10 size-[24px] top-[12px] pointer-events-none">
                <div className="-rotate-90">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p2b1b0180} fill="var(--fill-0, #1F1F1F)" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute left-[224px] top-[64px] right-0 bottom-0 overflow-auto">
        <Outlet />
      </div>

      {/* User Menu Dropdown */}
      {showUserMenu && (
        <div className="absolute right-6 top-[70px] bg-white rounded-lg shadow-lg border border-[#e0e0e0] z-50 min-w-[200px]">
          <button
            className="w-full px-4 py-3 text-left hover:bg-[#f2f2f2] font-['Red_Hat_Text:Regular',sans-serif] text-[14px] text-[#151515] border-b border-[#e0e0e0]"
            onClick={() => {
              alert("Profile clicked");
              setShowUserMenu(false);
            }}
          >
            Profile
          </button>
          <button
            className="w-full px-4 py-3 text-left hover:bg-[#f2f2f2] font-['Red_Hat_Text:Regular',sans-serif] text-[14px] text-[#151515] border-b border-[#e0e0e0]"
            onClick={() => {
              alert("Settings clicked");
              setShowUserMenu(false);
            }}
          >
            Settings
          </button>
          <button
            className="w-full px-4 py-3 text-left hover:bg-[#f2f2f2] font-['Red_Hat_Text:Regular',sans-serif] text-[14px] text-[#151515]"
            onClick={() => {
              alert("Logging out...");
              setShowUserMenu(false);
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}