import svgPaths from "./svg-5vp55d19f";

function ContentDown() {
  return (
    <div className="content-center flex flex-wrap gap-[64px_8px] items-center justify-center relative shrink-0 w-full" data-name="Content down">
      <div className="bg-[#d9d9d9] flex-[1_0_0] h-[64px] min-w-[375px] relative" />
      <div className="bg-[#d9d9d9] flex-[1_0_0] h-[64px] min-w-[375px] relative" />
    </div>
  );
}

function MenuBlack48Dp() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="menu_black_48dp 1">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 24 24" width="24">
        <g clipPath="url(#clip0_0_175)" id="menu_black_48dp 1">
          <g id="Vector" />
          <path d={svgPaths.p1d821780} fill="black" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_0_175">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Hamburger() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Hamburger">
      <MenuBlack48Dp />
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#d0d5dd] content-stretch flex items-center justify-center p-[8px] relative rounded-[80px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">SM</p>
    </div>
  );
}

function Avtar() {
  return (
    <div className="bg-white content-stretch flex items-center justify-end relative shrink-0" data-name="Avtar">
      <Frame1 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrow_drop_down">
        <div className="absolute inset-[39.58%_29.17%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="5" preserveAspectRatio="none" viewBox="0 0 10 5" width="10">
            <path d="M0 0L5 5L10 0H0Z" fill="black" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Mobile() {
  return (
    <div className="bg-white h-[64px] relative shrink-0 w-full" data-name="Mobile">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[8px] relative size-full">
          <Hamburger />
          <Avtar />
        </div>
      </div>
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.12)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#344054] text-[12px] whitespace-nowrap">24 of 25 free prompts left</p>
    </div>
  );
}

function Container1() {
  return <div className="bg-[#008dc3] h-[6px] relative rounded-[16777200px] shrink-0 w-[62px]" data-name="Container" />;
}

function Container() {
  return (
    <div className="bg-[#e4e7ec] content-stretch flex flex-col h-[6px] items-start overflow-clip relative rounded-[16777200px] shrink-0 w-[64px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function PromptCounter() {
  return (
    <div className="bg-[#f1f9fd] content-stretch flex gap-[10px] items-center px-[12px] py-[6px] relative rounded-[16777200px] shrink-0" data-name="PromptCounter">
      <div aria-hidden className="absolute border border-[#cae6f9] border-solid inset-0 pointer-events-none rounded-[16777200px]" />
      <div className="relative shrink-0 size-[14px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[12px] text-center tracking-[0.36px] uppercase">
          <p className="leading-[24px]">bolt</p>
        </div>
      </div>
      <Text />
      <Container />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#d0d5dd] content-stretch flex items-center justify-center p-[8px] relative rounded-[80px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">SM</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame2 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="arrow_drop_down">
        <div className="absolute inset-[39.58%_29.17%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" height="5" preserveAspectRatio="none" viewBox="0 0 10 5" width="10">
            <path d="M0 0L5 5L10 0H0Z" fill="black" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Avtar1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] gap-[16px] items-center justify-end min-w-[287px] relative" data-name="Avtar">
      <PromptCounter />
      <Frame30 />
    </div>
  );
}

function Destop() {
  return (
    <div className="bg-white h-[64px] min-w-[900px] relative shrink-0 w-full" data-name="Destop">
      <div className="flex flex-row items-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-w-[inherit] px-[24px] py-[8px] relative size-full">
          <Avtar1 />
        </div>
      </div>
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.12)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Header() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center pb-[124px] relative size-full">
          <ContentDown />
          <Mobile />
          <Destop />
        </div>
      </div>
      <div aria-hidden className="absolute border-[rgba(0,0,0,0.12)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[30px] not-italic overflow-hidden relative shrink-0 text-[#1d2939] text-[20px] text-ellipsis tracking-[0.2px] whitespace-nowrap">Smart Search</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame24 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame29 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[692px]">
      <Frame28 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[750px]">
      <div className="relative shrink-0 size-[28px]" data-name="icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[20px] text-center tracking-[0.6px] uppercase">
          <p className="leading-[24px]">arrow-left</p>
        </div>
      </div>
      <Frame25 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Content">
      <Frame26 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center justify-end min-w-px relative">
      <Content2 />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-center justify-end relative rounded-[8px] shrink-0" data-name="Actions">
      <div className="relative rounded-[6px] shrink-0" data-name="Button">
        <div className="content-stretch flex items-start relative size-full">
          <div className="bg-white relative rounded-[6px] shrink-0" data-name="_Base Button">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[6px] relative size-full">
                <div className="relative shrink-0 size-[16px]" data-name="Icons">
                  <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[16px] text-center tracking-[0.48px] uppercase">
                    <p className="leading-[24px]">clock</p>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">History</p>
              </div>
            </div>
            <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderComponent() {
  return (
    <div className="content-stretch flex gap-[16px] items-start pb-[16px] relative shrink-0 w-full" data-name="Header Component">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <Frame23 />
      <Actions />
    </div>
  );
}

function SolidShapes() {
  return (
    <div className="absolute inset-[27.53%_24%_25.05%_15.75%]" data-name="solid shapes">
      <svg className="absolute block inset-0 size-full" fill="none" height="91.2277" preserveAspectRatio="none" viewBox="0 0 120.487 91.2277" width="120.487">
        <g id="solid shapes">
          <path d={svgPaths.p288fe880} fill="#98A2B3" id="Vector" />
          <path d={svgPaths.p29c8d4c0} fill="#98A2B3" id="Vector_2" />
          <path d={svgPaths.p1e56ca00} fill="#98A2B3" id="Vector_3" />
          <path d={svgPaths.p3d3c1f00} fill="#221F20" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function DottedLines() {
  return (
    <div className="absolute inset-[0.55%_27.02%_1.96%_0.53%]" data-name="dotted lines">
      <div className="absolute inset-[-0.13%_-0.17%]">
        <svg className="block size-full" fill="none" height="188.078" preserveAspectRatio="none" viewBox="0 0 145.413 188.078" width="145.413">
          <g id="dotted lines">
            <path d="M12.559 46.1962V46.6169" id="Vector" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M12.559 47.5851V50.9722" id="Vector_2" stroke="#221F20" strokeDasharray="1.05 1.05" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M12.559 51.4609V51.8817" id="Vector_3" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M12.559 97.8238V98.2446" id="Vector_4" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M12.559 99.2214V102.63" id="Vector_5" stroke="#221F20" strokeDasharray="1.06 1.06" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M12.559 103.128V103.548" id="Vector_6" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M132.854 46.1962V46.6169" id="Vector_7" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M132.854 47.5851V50.9722" id="Vector_8" stroke="#221F20" strokeDasharray="1.05 1.05" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M132.854 51.4609V51.8817" id="Vector_9" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p10bcc400} id="Vector_10" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p2da91400} id="Vector_11" stroke="#221F20" strokeDasharray="0.91 0.91" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M90.7663 35.1849H90.3455" id="Vector_12" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M137.209 46.1962H136.789" id="Vector_13" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M135.875 46.1962H129.007" id="Vector_14" stroke="#221F20" strokeDasharray="0.99 0.99" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M128.54 46.1962H128.119" id="Vector_15" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M90.6317 46.1962H90.2109" id="Vector_16" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p28a05680} id="Vector_17" stroke="#221F20" strokeDasharray="0.91 0.91" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M145.163 37.5721V37.9928" id="Vector_18" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p3e80300} id="Vector_19" stroke="#221F20" strokeDasharray="0.91 0.91" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p23260f80} id="Vector_20" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p6c237c0} id="Vector_21" stroke="#221F20" strokeDasharray="0.94 0.94" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M127.279 149.451H126.858" id="Vector_22" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M127.363 149.451H126.943" id="Vector_23" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p1fd16000} id="Vector_24" stroke="#221F20" strokeDasharray="0.91 0.91" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M28.3793 103.505H28.8001" id="Vector_25" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p26bd8900} id="Vector_26" stroke="#221F20" strokeDasharray="0.91 0.91" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M129.762 51.882H130.182" id="Vector_27" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p2bf2d480} id="Vector_28" stroke="#221F20" strokeDasharray="0.94 0.94" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M145.163 65.3411V65.7619" id="Vector_29" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M27.5588 97.8238H27.138" id="Vector_30" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p34492500} id="Vector_31" stroke="#221F20" strokeDasharray="0.91 0.91" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M92.2292 51.882H92.6499" id="Vector_32" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p2214c500} id="Vector_33" stroke="#221F20" strokeDasharray="0.91 0.91" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p1c393580} id="Vector_34" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p1ec5f280} id="Vector_35" stroke="#221F20" strokeDasharray="0.96 0.96" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p48ea680} id="Vector_36" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p1221a300} id="Vector_37" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p39133c80} id="Vector_38" stroke="#221F20" strokeDasharray="0.88 0.88" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p3e997d00} id="Vector_39" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.p2ffa1d00} id="Vector_40" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.pd2f8700} id="Vector_41" stroke="#221F20" strokeDasharray="0.9 0.9" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d={svgPaths.pcde2000} id="Vector_42" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M18.7765 187.828H19.1972" id="Vector_43" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M20.0156 187.828H55.8122" id="Vector_44" stroke="#221F20" strokeDasharray="0.89 0.89" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
            <path d="M56.2222 187.828H56.643" id="Vector_45" stroke="#221F20" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="0.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function InvertedLines() {
  return (
    <div className="absolute inset-[60.84%_61.06%_23.79%_27.27%]" data-name="inverted lines">
      <div className="absolute inset-[-1.54%_-1.95%_-1.54%_-1.96%]">
        <svg className="block size-full" fill="none" height="30.4924" preserveAspectRatio="none" viewBox="0 0 24.2545 30.4924" width="24.2545">
          <g id="inverted lines">
            <path d={svgPaths.p2e446980} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.912518" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SolidLines() {
  return (
    <div className="absolute inset-[8.88%_0.53%_0.55%_4.85%]" data-name="solid lines">
      <div className="absolute inset-[-0.13%_-0.12%]">
        <svg className="block size-full" fill="none" height="174.717" preserveAspectRatio="none" viewBox="0 0 189.711 174.717" width="189.711">
          <g id="solid lines">
            <path d={svgPaths.p3b188f80} id="Vector" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p202a3080} id="Vector_2" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p2a400} id="Vector_3" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p9f9ae64} id="Vector_4" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p26344b80} id="Vector_5" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p2d2e8f00} id="Vector_6" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p2e078800} id="Vector_7" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p35827f50} id="Vector_8" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.pd3d6780} id="Vector_9" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p175000} id="Vector_10" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p2b1eed00} id="Vector_11" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p3a3cc000} id="Vector_12" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p2dbfb00} id="Vector_13" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p8b85300} id="Vector_14" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p19ec95e0} id="Vector_15" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p66dbd00} id="Vector_16" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p90d6680} id="Vector_17" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p159bd580} id="Vector_18" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d="M98.5289 44.1346V36.9816" id="Vector_19" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p216a6a00} id="Vector_20" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p2ba7aeb0} id="Vector_21" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p351da600} id="Vector_22" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p17ddb900} id="Vector_23" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d="M106.493 17.3852H112.826" id="Vector_24" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.pe778480} id="Vector_25" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p3f183000} id="Vector_26" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p2b6a8be0} id="Vector_27" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.pa975700} id="Vector_28" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p214b1e00} id="Vector_29" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d={svgPaths.p2251e800} id="Vector_30" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
            <path d="M95.8271 19.2689H97.7942" id="Vector_31" stroke="#221F20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.456259" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IllustrationBusinessDataBlue() {
  return (
    <div className="h-[192.405px] overflow-clip relative shrink-0 w-[200px]" data-name="illustration_business_data_blue">
      <SolidShapes />
      <DottedLines />
      <InvertedLines />
      <SolidLines />
    </div>
  );
}

function Frame4() {
  return (
    <div className="bg-[#edf0ff] content-stretch flex items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#016dee] text-[11px] uppercase whitespace-nowrap">AI Resource Depleted</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Frame">
      <Frame4 />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] min-w-full not-italic relative shrink-0 text-[#1d2939] text-[32px] tracking-[-0.64px] w-[min-content]">Your prospecting engine has run out of fuel</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-w-full not-italic relative shrink-0 text-[#475467] text-[16px] w-[min-content]">{`You've successfully generated maximum free prospects. To launch your next target list with deep-level insights, upgrade to a premium account today.`}</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Frame">
      <div className="relative rounded-[6px] shrink-0 w-[157px]" data-name="Button">
        <div className="content-stretch flex items-start relative size-full">
          <div className="bg-[#008dc3] flex-[1_0_0] min-w-px relative rounded-[8px]" data-name="_Base Button">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center px-[16px] py-[10px] relative size-full">
                <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">View Plans</p>
              </div>
            </div>
            <div aria-hidden className="absolute border border-[#008dc3] border-solid inset-0 pointer-events-none rounded-[8px]" />
          </div>
        </div>
      </div>
      <div className="relative rounded-[6px] shrink-0 w-[157px]" data-name="Button">
        <div className="content-stretch flex items-start relative size-full">
          <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[8px]" data-name="_Base Button">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center px-[16px] py-[10px] relative size-full">
                <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">Buy Credits</p>
              </div>
            </div>
            <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[520px]" data-name="Frame">
      <Frame3 />
      <Frame5 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[64px] h-[742px] items-center justify-center p-[64px] relative shrink-0 w-[1185px]" data-name="Content">
      <IllustrationBusinessDataBlue />
      <Frame />
    </div>
  );
}

function Content1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative w-full" data-name="Content">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[32px] items-center p-[24px] relative size-full">
          <HeaderComponent />
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[1024px] items-center left-[257px] top-0 w-[1239px]" data-name="Content">
      <Header />
      <Content1 />
    </div>
  );
}

function Logo() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Logo">
      <svg className="absolute block inset-0 size-full" fill="none" height="40" preserveAspectRatio="none" viewBox="0 0 40 40" width="40">
        <g id="Logo">
          <g id="Frame 5">
            <g id="Vector">
              <path d={svgPaths.p1d53de80} fill="#231F20" />
              <path d={svgPaths.p2da09300} fill="#231F20" />
              <path d={svgPaths.pcaf4500} fill="#231F20" />
              <path d={svgPaths.p10572d00} fill="#231F20" />
              <path d={svgPaths.p286d9000} fill="#231F20" />
              <path d={svgPaths.pb8f4100} fill="#231F20" />
              <path d={svgPaths.p27855ef2} fill="#231F20" />
              <path d={svgPaths.p30456e00} fill="#009FDB" />
              <path d={svgPaths.p20066630} fill="#231F20" />
              <path d={svgPaths.p3333ae00} fill="#231F20" />
              <path d={svgPaths.p2cc74b00} fill="#231F20" />
              <path d={svgPaths.p35269000} fill="#231F20" />
            </g>
          </g>
          <g id="Frame 4">
            <path d={svgPaths.p3ea06b00} fill="white" id="Vector_2" />
          </g>
          <g id="Vector_3">
            <path d={svgPaths.p3f9b9300} fill="#231F20" />
            <path d={svgPaths.p308da280} fill="#231F20" />
            <path d={svgPaths.p2da09300} fill="#231F20" />
            <path d={svgPaths.pf99c000} fill="#231F20" />
            <path d={svgPaths.p10572d00} fill="#231F20" />
            <path d={svgPaths.p286d9000} fill="#231F20" />
            <path d={svgPaths.p18391640} fill="#231F20" />
            <path d={svgPaths.p27855ef2} fill="#231F20" />
            <path d={svgPaths.p20066630} fill="#231F20" />
            <path d={svgPaths.p22e78400} fill="#231F20" />
            <path d={svgPaths.p2cc74b00} fill="#231F20" />
            <path d={svgPaths.p35269000} fill="#231F20" />
          </g>
          <g id="Frame 2">
            <path d={svgPaths.p30456e00} fill="#009FDB" id="Vector_4" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Title() {
  return (
    <div className="h-[24px] relative shrink-0 w-[128.697px]" data-name="Title">
      <svg className="absolute block inset-0 size-full" fill="none" height="24" preserveAspectRatio="none" viewBox="0 0 128.697 24" width="128.697">
        <g id="Title">
          <g id="Vector">
            <path d={svgPaths.p39168a00} fill="white" />
            <path d={svgPaths.p13536460} fill="white" />
            <path d={svgPaths.paee1600} fill="white" />
            <path d={svgPaths.p2308d500} fill="white" />
            <path d={svgPaths.p489800} fill="white" />
            <path d={svgPaths.p2b176300} fill="white" />
            <path d={svgPaths.p1c3ab800} fill="white" />
            <path d={svgPaths.p274a8a70} fill="white" />
            <path d={svgPaths.pe5bbe72} fill="white" />
            <path d={svgPaths.p205ed500} fill="white" />
            <path d={svgPaths.p1dea3f00} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Brand() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center relative shrink-0 w-[176.697px]" data-name="Brand">
      <Logo />
      <Title />
    </div>
  );
}

function Frame6() {
  return (
    <div className="h-[64px] relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
          <Brand />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#1d2939] text-[14px] whitespace-nowrap">Business</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Consumer</p>
    </div>
  );
}

function DatasetToggle() {
  return (
    <div className="bg-[#344054] content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[9999px] shrink-0 w-[199px]" data-name="Dataset Toggle">
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="h-[60px] relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative size-full">
          <DatasetToggle />
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white tracking-[0.72px] uppercase">
          <p className="leading-[24px]">Search</p>
        </div>
      </div>
    </div>
  );
}

function NavigationListItem() {
  return (
    <div className="bg-[#344054] relative rounded-[4px] shrink-0 w-full" data-name="Navigation list item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <Frame9 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Search</p>
        </div>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white tracking-[0.72px] uppercase">
          <p className="leading-[24px]">square-list</p>
        </div>
      </div>
    </div>
  );
}

function NavigationListItem1() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Navigation list item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <Frame13 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Saved lists</p>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white tracking-[0.72px] uppercase">
          <p className="leading-[24px]">at</p>
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0">
      <div className="relative shrink-0 size-[20px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[16px] text-center text-white tracking-[0.48px] uppercase">
          <p className="leading-[24px]">Info-circle</p>
        </div>
      </div>
    </div>
  );
}

function NavigationListItem2() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Navigation list item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <Frame14 />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[26px] min-w-px not-italic relative text-[16px] text-white">Email campaigns</p>
          <Frame15 />
        </div>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white tracking-[0.72px] uppercase">
          <p className="leading-[24px]">envelopes-bulk</p>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0">
      <div className="relative shrink-0 size-[20px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[16px] text-center text-white tracking-[0.48px] uppercase">
          <p className="leading-[24px]">Info-circle</p>
        </div>
      </div>
    </div>
  );
}

function NavigationListItem3() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Navigation list item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <Frame16 />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[26px] min-w-px not-italic relative text-[16px] text-white">Direct mail</p>
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white tracking-[0.72px] uppercase">
          <p className="leading-[24px]">calendar</p>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0">
      <div className="relative shrink-0 size-[20px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[16px] text-center text-white tracking-[0.48px] uppercase">
          <p className="leading-[24px]">gem</p>
        </div>
      </div>
    </div>
  );
}

function NavigationListItem4() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Navigation list item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <Frame18 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white w-[132px]">Tasks</p>
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white tracking-[0.72px] uppercase">
          <p className="leading-[24px]">gear</p>
        </div>
      </div>
    </div>
  );
}

function NavigationListItem5() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Navigation list item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <Frame20 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Settings</p>
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex items-start p-[8px] relative shrink-0">
      <div className="relative shrink-0 size-[24px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[24px] text-center text-white tracking-[0.72px] uppercase">
          <p className="leading-[24px]">headset</p>
        </div>
      </div>
    </div>
  );
}

function NavigationListItem6() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Navigation list item">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
          <Frame21 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Support</p>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative size-full">
        <NavigationListItem />
        <NavigationListItem1 />
        <NavigationListItem2 />
        <NavigationListItem3 />
        <NavigationListItem4 />
        <NavigationListItem5 />
        <NavigationListItem6 />
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full">
      <Frame6 />
      <Frame11 />
      <Frame10 />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Title">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[14px] text-white">Get started today!</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Title1 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-white w-full">{`Whether you're all in or just need a list, we’ve got flexible options to help you start faster.`}</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content">
      <Frame27 />
      <div className="relative rounded-[6px] shrink-0 w-full" data-name="Button">
        <div className="content-stretch flex items-start relative size-full">
          <div className="bg-[#008dc3] flex-[1_0_0] min-w-px relative rounded-[6px]" data-name="_Base Button">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative size-full">
                <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">See options</p>
              </div>
            </div>
            <div aria-hidden className="absolute border border-[#008dc3] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavFeaturedCard() {
  return (
    <div className="bg-[#475467] relative rounded-[8px] shrink-0 w-full" data-name="_Nav featured card">
      <div aria-hidden className="absolute border border-[#98a2b3] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
        <Content4 />
      </div>
    </div>
  );
}

function Feature() {
  return (
    <div className="relative shrink-0 w-full" data-name="Feature">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[16px] relative size-full">
          <NavFeaturedCard />
        </div>
      </div>
    </div>
  );
}

function Feature1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Feature">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white w-full">Contact us at 877.708.3844 or genie@data-axle.com</p>
    </div>
  );
}

function Section() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Section">
      <Feature />
      <Feature1 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex items-start justify-center p-[8px] relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#98a2b3] text-[12px] whitespace-nowrap">© 2024 Data Axle, All Rights Reserved</p>
    </div>
  );
}

function Sidebar1() {
  return (
    <div className="bg-[#1d2939] content-stretch flex flex-col h-[1024px] items-center justify-between pb-[8px] relative shrink-0 w-[256px]" data-name="Sidebar">
      <Frame12 />
      <Section />
      <Frame22 />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="content-stretch flex h-[1024px] items-start max-w-[256px] min-w-[256px] overflow-clip relative shrink-0 w-[256px]" data-name="Sidebar">
      <Sidebar1 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute bg-[#1d2939] content-stretch flex flex-col h-[900px] items-center left-0 pb-[24px] top-0" data-name="Navigation">
      <Sidebar />
    </div>
  );
}

export default function SearchNewConversation() {
  return (
    <div className="relative size-full" data-name="Search > New conversation">
      <Content />
      <Navigation />
    </div>
  );
}