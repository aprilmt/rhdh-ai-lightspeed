import svgPaths from "./svg-40f6ewtnue";

interface MenuProps {
  onMcpSettingsClick?: () => void;
  mcpSettingsDisabled?: boolean;
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <p className="font-['Red_Hat_Text_VF:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[#4d4d4d] text-[12px] whitespace-nowrap">Display mode</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[21px]" data-name="IconWrapper">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[14px] top-[calc(50%+0.5px)]" data-name="🖼️ Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p1c9da500} fill="var(--fill-0, #1F1F1F)" id="ð¼ï¸ Icon" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Red_Hat_Text_VF:Regular',sans-serif] font-normal h-full justify-center leading-[0] relative shrink-0 text-[#151515] text-[14px] w-[134px]">
        <p className="leading-[21px]">Overlay</p>
      </div>
      
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[21px]" data-name="IconWrapper">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[14px] top-[calc(50%+0.5px)]" data-name="🖼️ Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 10.5">
            <path d={svgPaths.p26ebc000} fill="var(--fill-0, #1F1F1F)" id="ð¼ï¸ Icon" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Red_Hat_Text_VF:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#151515] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Dock to window</p>
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex items-center justify-center opacity-0 p-[8px] relative rounded-[6px] shrink-0 size-[30px]" data-name="Icon Button (Plain Button)">
        <div className="h-[14px] relative shrink-0 w-[16px]" data-name="IconWrapper">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[14px] top-[calc(50%+0.5px)]" data-name="🖼️ Icon">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0009 10.0009">
              <path d={svgPaths.p26e24f0} fill="var(--fill-0, #1F1F1F)" id="ð¼ï¸ Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[21px]" data-name="IconWrapper">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[14px] top-[calc(50%+0.5px)]" data-name="🖼️ Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p194fcb50} fill="var(--fill-0, #1F1F1F)" id="ð¼ï¸ Icon" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['Red_Hat_Text_VF:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#151515] text-[14px] whitespace-nowrap">
        <p className="leading-[21px]">Fullscreen</p>
      </div>
      <div className="relative shrink-0 size-[30px]" data-name="IconWrapper">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.5px)] size-[14px] top-[calc(50%+0.5px)]" data-name="🖼️ Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9998 10.4393">
            <path d={svgPaths.p172defc0} fill="var(--fill-0, #0066CC)" id="ð¼ï¸ Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return <div className="bg-[#c7c7c7] h-px shrink-0 w-full" />;
}

function Frame6({ disabled }: { disabled?: boolean }) {
  const iconFill = disabled ? "#A8A8A8" : "#151515";
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[18px]" data-name="gear">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill={iconFill}
            d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81a.49.49 0 0 0-.49-.41h-3.82a.49.49 0 0 0-.49.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.71 8.87a.49.49 0 0 0 .12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.49.41h3.82c.24 0 .44-.17.49-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58ZM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2Z"
          />
        </svg>
      </div>
      <div className={`flex flex-col font-['Red_Hat_Text_VF:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] whitespace-nowrap ${disabled ? "text-[#A8A8A8]" : "text-[#151515]"}`}>
        <p className="leading-[21px]">Chat settings</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#5e40be] content-stretch flex h-[17px] items-center justify-center left-[212px] overflow-clip px-[8px] rounded-[64px] top-[12px] w-[38px]" data-name="Badge">
      <p className="font-['Red_Hat_Text:Medium',sans-serif] font-medium h-[16px] leading-[18px] relative shrink-0 text-[12px] text-center text-white w-[25px]">New</p>
    </div>
  );
}

function MenuItem({ onMcpSettingsClick, mcpSettingsDisabled }: MenuProps) {
  return (
    <div
      onClick={mcpSettingsDisabled ? undefined : onMcpSettingsClick}
      aria-disabled={mcpSettingsDisabled || undefined}
      className={`absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col gap-[4px] items-start justify-center left-0 px-[24px] py-[8px] top-[256px] w-full transition-colors ${
        mcpSettingsDisabled
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-[#f2f2f2]"
      }`}
      data-name=".MenuItem"
    >
      <Frame6 disabled={mcpSettingsDisabled} />
    </div>
  );
}

function Arrow() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[17.578px] left-[calc(50%+0.71px)] top-[calc(50%-0.21px)] w-[11.414px]" data-name="Arrow">
      
    </div>
  );
}

function Menu1({ onMcpSettingsClick, mcpSettingsDisabled }: MenuProps) {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[301px] items-start left-0 py-[8px] rounded-[6px] shadow-[0px_4px_9px_0px_rgba(41,41,41,0.15)] top-0 w-[320px]" data-name="Menu">
      <div className="bg-[rgba(255,255,255,0)] hover:bg-[#f2f2f2] relative shrink-0 w-full cursor-pointer transition-colors" data-name=".MenuItem">
        <div className="content-stretch flex flex-col items-start px-[24px] py-[8px] relative w-full">
          <Frame />
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] hover:bg-[#f2f2f2] h-[46px] relative shrink-0 w-full cursor-pointer transition-colors" data-name=".MenuItem">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col gap-[4px] items-start justify-center px-[24px] py-[8px] relative size-full">
            <Frame3 />
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] hover:bg-[#f2f2f2] relative shrink-0 w-full cursor-pointer transition-colors" data-name=".MenuItem">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col gap-[4px] items-start justify-center px-[24px] py-[8px] relative w-full">
            <Frame4 />
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0)] hover:bg-[#f2f2f2] relative shrink-0 w-full cursor-pointer transition-colors" data-name=".MenuItem">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col gap-[4px] items-start justify-center px-[24px] py-[8px] relative w-full">
            <Frame5 />
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-start py-[8px] relative shrink-0 w-full" data-name=".MenuItem">
        <Frame2 />
      </div>
      <div className="bg-[rgba(255,255,255,0)] relative shrink-0 w-full" data-name=".MenuItem">
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col gap-[4px] items-start justify-center px-[24px] py-[8px] w-full" />
        </div>
      </div>
      <MenuItem onMcpSettingsClick={onMcpSettingsClick} mcpSettingsDisabled={mcpSettingsDisabled} />
      <div className="absolute left-[155px] size-[24px] top-[269px]" data-name="Cursors / Pointer">
        <Arrow />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute left-0 top-[196px] w-full h-[54px] bg-[rgba(255,255,255,0)] hover:bg-[#f2f2f2] cursor-pointer transition-colors" data-name=".MenuItem">
      <div className="flex gap-[8px] items-center px-[24px] py-[8px] h-full w-full">
        <div className="relative shrink-0 w-[21px] h-[12px]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 12">
            <path d={svgPaths.p358b3580} fill="var(--fill-0, #707070)" id="Vector" />
          </svg>
        </div>
        <div className="flex flex-col gap-[4px] flex-1">
          <p className="font-['Red_Hat_Text:Regular',sans-serif] font-normal leading-[24px] text-[#1f1f1f] text-[14px]">Disable pinned chat</p>
          <p className="font-['Red_Hat_Text:Regular',sans-serif] font-normal leading-[18px] text-[#4d4d4d] text-[12px] whitespace-nowrap">Favorite chats are currently enabled</p>
        </div>
      </div>
    </div>
  );
}

export default function Menu({ onMcpSettingsClick, mcpSettingsDisabled }: MenuProps) {
  return (
    <div className="relative size-full" data-name="menu">
      <Menu1 onMcpSettingsClick={onMcpSettingsClick} mcpSettingsDisabled={mcpSettingsDisabled} />
      <Group />
    </div>
  );
}