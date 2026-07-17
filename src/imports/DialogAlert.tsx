import svgPaths from "./svg-odlfft3nuv";

interface DialogAlertProps {
  onClose?: () => void;
  onSave?: () => void;
  serverName?: string;
  error?: boolean;
}

function PrimaryHover() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-[6px] relative rounded-[999px] shrink-0" data-name="Primary hover">
      <div aria-hidden="true" className="absolute border border-[#06c] border-solid inset-0 pointer-events-none rounded-[999px]" />
      <p className="font-['Red_Hat_Text:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#06c] text-[16px] text-center whitespace-nowrap">Cancel</p>
    </div>
  );
}

function CloseIcon() {
  return (
    <div className="absolute right-[24px] size-[24px] top-[24px]" data-name="Close Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Close Icon">
          <g id="Vector" />
          <path d={svgPaths.p3fd9e500} fill="var(--fill-0, #1F1F1F)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function CloseButton() {
  return (
    <div className="absolute contents right-[16px] top-[16px]" data-name="Close Button">
      <div className="absolute bg-white right-[16px] rounded-[1000px] size-[40px] top-[16px]" data-name="Background" />
      <CloseIcon />
    </div>
  );
}

function InputText() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="input-text">
      <div className="flex flex-col font-['Red_Hat_Text:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#151515] text-[16px] whitespace-nowrap">
        <p className="leading-[16px]">************</p>
      </div>
      <div className="h-[16px] relative shrink-0 w-0" data-name="Caret">
        <div className="absolute inset-[-3.13%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 17">
            <path d="M0.5 0.5V16.5" id="Caret" stroke="var(--stroke-0, #0066CC)" strokeLinecap="square" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LabelText() {
  return (
    <div className="absolute bg-white content-stretch flex items-center left-[-4px] px-[4px] top-[-16px]" data-name="label-text">
      <p className="font-['Red_Hat_Text:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#151515] text-[12px] whitespace-nowrap">Personal Access Token</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[40px] items-start justify-center min-h-px min-w-px relative" data-name="content">
      <InputText />
      <LabelText />
    </div>
  );
}

function StateLayer() {
  return (
    <div className="relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 w-full" data-name="state-layer">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pl-[16px] py-[8px] relative w-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function TextField({ error = false }: { error?: boolean }) {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[6px] shrink-0 w-full" data-name="text field">
      <div aria-hidden="true" className={`absolute border-2 border-solid inset-0 pointer-events-none rounded-[6px] ${error ? "border-[#c9190b]" : "border-[#06c]"}`} />
      <StateLayer />
    </div>
  );
}

function SupportingText({ error = false }: { error?: boolean }) {
  return (
    <div className="relative shrink-0 w-full" data-name="supporting-text">
      <div className="content-stretch flex items-start pt-[4px] px-[16px] relative w-full">
        <p className={`flex-[1_0_0] font-['Red_Hat_Text:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[12px] ${error ? "text-[#c9190b]" : "text-[#4d4d4d]"}`}>{error ? "Error access token, please try again" : "Enter your token"}</p>
      </div>
    </div>
  );
}

function StateLayer1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[8px] relative shrink-0" data-name="state-layer">
      <div className="relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[8.33%]" data-name="icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p2d220900} fill="var(--fill-0, #707070)" fillRule="evenodd" id="icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[100px] shrink-0" data-name="container">
      <StateLayer1 />
    </div>
  );
}

export default function DialogAlert({ onClose, onSave, serverName = "GitHub", error = false }: DialogAlertProps) {
  return (
    <div className="relative size-full" data-name="Dialog Alert">
      <div className="-translate-y-1/2 absolute bg-white h-[326px] left-0 rounded-[24px] shadow-[0px_10px_20px_0px_rgba(41,41,41,0.15)] top-1/2 w-[608px]" />
      <button 
        className="absolute bg-[#06c] bottom-[24px] content-stretch flex gap-[8px] h-[40px] items-center justify-center left-[24px] px-[16px] py-[6px] rounded-[999px] cursor-pointer hover:opacity-90 transition-opacity" 
        data-name="Button"
        onClick={onSave}
      >
        <p className="font-['Red_Hat_Text:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Save</p>
      </button>
      <button 
        className="absolute bottom-[24px] content-stretch flex items-start left-[109px] rounded-[999px] cursor-pointer" 
        data-name="Button"
        onClick={onClose}
      >
        <PrimaryHover />
      </button>
      <button 
        className="absolute contents right-[16px] top-[16px] cursor-pointer" 
        data-name="Close Button"
        onClick={onClose}
      >
        <div className="absolute bg-white right-[16px] rounded-[1000px] size-[40px] top-[16px]" data-name="Background" />
        <CloseIcon />
      </button>
      <p className="absolute font-['Red_Hat_Text:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#4d4d4d] text-[14px] top-[66px] w-[560px]">Credentials are encrypted at rest and scoped to your profile. Lightspeed will operate with your exact {serverName} permissions.</p>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Red_Hat_Text:Medium',sans-serif] font-medium justify-center leading-[0] left-[55px] text-[#151515] text-[20px] top-[37px] tracking-[-0.25px] whitespace-nowrap">
        <p className="leading-[26px]">Configure {serverName} Server</p>
      </div>
      <div className="absolute left-[27px] size-[18px] top-[26px]" data-name="fa-lock">
        <div className="absolute inset-[0_4.17%_0_8.33%]" data-name="lock">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.75 18">
            <path clipRule="evenodd" d={svgPaths.p25cdf800} fill="var(--fill-0, #151515)" fillRule="evenodd" id="lock" />
          </svg>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col h-[56px] items-start left-[24px] rounded-tl-[4px] rounded-tr-[4px] top-[146px] w-[553px]" data-name="Text field">
        <TextField error={error} />
        <SupportingText error={error} />
      </div>
      <div className="absolute content-stretch cursor-pointer flex flex-col items-center justify-center left-[524px] size-[48px] top-[150px]" data-name="trailing-icon">
        <Container />
      </div>
    </div>
  );
}