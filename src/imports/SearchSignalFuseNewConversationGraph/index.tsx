import svgPaths from "./svg-rr5gmxbgj1";

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
        <g clipPath="url(#clip0_0_813)" id="menu_black_48dp 1">
          <g id="Vector" />
          <path d={svgPaths.p1d821780} fill="black" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_0_813">
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

function Frame() {
  return (
    <div className="bg-[#d0d5dd] content-stretch flex items-center justify-center p-[8px] relative rounded-[80px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">SM</p>
    </div>
  );
}

function Avtar() {
  return (
    <div className="bg-white content-stretch flex items-center justify-end relative shrink-0" data-name="Avtar">
      <Frame />
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

function Frame1() {
  return (
    <div className="bg-[#d0d5dd] content-stretch flex items-center justify-center p-[8px] relative rounded-[80px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">SM</p>
    </div>
  );
}

function Avtar1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_0] items-center justify-end min-w-[287px] relative" data-name="Avtar">
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

function Frame20() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[30px] not-italic overflow-hidden relative shrink-0 text-[#1d2939] text-[20px] text-ellipsis tracking-[0.2px] whitespace-nowrap">Unnamed List</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame20 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame31 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[692px]">
      <Frame30 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal h-[21px] leading-[21px] not-italic overflow-hidden relative shrink-0 text-[#475467] text-[14px] text-ellipsis tracking-[0.14px] w-[750px] whitespace-nowrap">Smart Search</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[750px]">
      <div className="relative shrink-0 size-[28px]" data-name="icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[20px] text-center tracking-[0.6px] uppercase">
          <p className="leading-[24px]">arrow-left</p>
        </div>
      </div>
      <Frame21 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Content">
      <Frame22 />
    </div>
  );
}

function Frame19() {
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
                <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">History</p>
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
      <Frame19 />
      <Actions />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">Business Information</p>
      <div className="relative shrink-0 size-[14px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">sort</p>
        </div>
      </div>
    </div>
  );
}

function TableTitle() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="_Table Title">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[16px] text-center tracking-[0.48px] uppercase">
          <p className="leading-[24px]">Lock</p>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[24px] leading-[24px] not-italic overflow-hidden relative shrink-0 text-[#1d2939] text-[16px] text-ellipsis w-[79px] whitespace-nowrap">P*******</p>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">location-dot</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Santa Clara, CA</p>
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="3">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">phone</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">(310) ***-****</p>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component />
      <Component2 />
    </div>
  );
}

function BusinessInformation() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Business Information">
      <Row />
    </div>
  );
}

function BaseTableCellDetailed() {
  return (
    <div className="h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[12px] px-[16px] relative size-full">
        <TableTitle />
        <BusinessInformation />
      </div>
    </div>
  );
}

function TableTitle1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="_Table Title">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[16px] text-center tracking-[0.48px] uppercase">
          <p className="leading-[24px]">Lock</p>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[24px] leading-[24px] not-italic overflow-hidden relative shrink-0 text-[#1d2939] text-[16px] text-ellipsis w-[79px] whitespace-nowrap">X********</p>
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">location-dot</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Corona, CA</p>
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="3">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">phone</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">(510) ***-****</p>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component1 />
      <Component3 />
    </div>
  );
}

function BusinessInformation1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Business Information">
      <Row1 />
    </div>
  );
}

function BaseTableCellDetailed1() {
  return (
    <div className="h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[12px] px-[16px] relative size-full">
        <TableTitle1 />
        <BusinessInformation1 />
      </div>
    </div>
  );
}

function TableTitle2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="_Table Title">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[16px] text-center tracking-[0.48px] uppercase">
          <p className="leading-[24px]">Lock</p>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[24px] leading-[24px] not-italic overflow-hidden relative shrink-0 text-[#1d2939] text-[16px] text-ellipsis w-[79px] whitespace-nowrap">Q******</p>
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">location-dot</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Corona, CA</p>
    </div>
  );
}

function Component5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="3">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">phone</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">(310) ***-****</p>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component4 />
      <Component5 />
    </div>
  );
}

function BusinessInformation2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Business Information">
      <Row2 />
    </div>
  );
}

function BaseTableCellDetailed2() {
  return (
    <div className="h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[12px] px-[16px] relative size-full">
        <TableTitle2 />
        <BusinessInformation2 />
      </div>
    </div>
  );
}

function TableTitle3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="_Table Title">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[16px] text-center tracking-[0.48px] uppercase">
          <p className="leading-[24px]">Lock</p>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[24px] leading-[24px] not-italic overflow-hidden relative shrink-0 text-[#1d2939] text-[16px] text-ellipsis w-[79px] whitespace-nowrap">Z* ****</p>
    </div>
  );
}

function Component6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">location-dot</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Corona, CA</p>
    </div>
  );
}

function Component7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="3">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">phone</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">(510) ***-****</p>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component6 />
      <Component7 />
    </div>
  );
}

function BusinessInformation3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Business Information">
      <Row3 />
    </div>
  );
}

function BaseTableCellDetailed3() {
  return (
    <div className="h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[12px] px-[16px] relative size-full">
        <TableTitle3 />
        <BusinessInformation3 />
      </div>
    </div>
  );
}

function TableTitle4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="_Table Title">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[16px] text-center tracking-[0.48px] uppercase">
          <p className="leading-[24px]">Lock</p>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium h-[24px] leading-[24px] not-italic overflow-hidden relative shrink-0 text-[#1d2939] text-[16px] text-ellipsis w-[269px] whitespace-nowrap">A**** ****</p>
    </div>
  );
}

function Component8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">location-dot</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Santa Clara, CA</p>
    </div>
  );
}

function Component9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="3">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">phone</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">(510) ***-****</p>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component8 />
      <Component9 />
    </div>
  );
}

function BusinessInformation4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Business Information">
      <Row4 />
    </div>
  );
}

function BaseTableCellDetailed4() {
  return (
    <div className="h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[12px] px-[16px] relative size-full">
        <TableTitle4 />
        <BusinessInformation4 />
      </div>
    </div>
  );
}

function BaseColumnType() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="_Base_Column Type">
      <div className="bg-[#f2f4f7] h-[40px] relative rounded-tl-[8px] shrink-0 w-full" data-name="_Base_Column Header">
        <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid border-t inset-0 pointer-events-none rounded-tl-[8px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[16px] py-[8px] relative size-full">
            <Text />
          </div>
        </div>
      </div>
      <BaseTableCellDetailed />
      <BaseTableCellDetailed1 />
      <BaseTableCellDetailed2 />
      <BaseTableCellDetailed3 />
      <BaseTableCellDetailed4 />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">Business Details</p>
      <div className="relative shrink-0 size-[14px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">sort</p>
        </div>
      </div>
    </div>
  );
}

function Component10() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">industry-alt</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Restaurants 8021-01</p>
    </div>
  );
}

function Component11() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="3">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">money-bills</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Less than $500,000</p>
    </div>
  );
}

function Component12() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="4">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">user-group</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">51-100</p>
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component10 />
      <Component11 />
      <Component12 />
    </div>
  );
}

function BusinessInformation5() {
  return (
    <div className="content-stretch flex flex-col h-[68px] items-start relative shrink-0 w-full" data-name="Business Information">
      <Row5 />
    </div>
  );
}

function BaseTableCellDetailed5() {
  return (
    <div className="bg-white h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[16px] pt-[24px] px-[16px] relative size-full">
          <BusinessInformation5 />
        </div>
      </div>
    </div>
  );
}

function Component13() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">industry-alt</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Restaurants 8021-01</p>
    </div>
  );
}

function Component14() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="3">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">money-bills</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Less than $500,000</p>
    </div>
  );
}

function Component15() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="4">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">user-group</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">51-100</p>
    </div>
  );
}

function Row6() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component13 />
      <Component14 />
      <Component15 />
    </div>
  );
}

function BusinessInformation6() {
  return (
    <div className="content-stretch flex flex-col h-[68px] items-start relative shrink-0 w-full" data-name="Business Information">
      <Row6 />
    </div>
  );
}

function BaseTableCellDetailed6() {
  return (
    <div className="bg-white h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[16px] pt-[24px] px-[16px] relative size-full">
          <BusinessInformation6 />
        </div>
      </div>
    </div>
  );
}

function Component16() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">industry-alt</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Restaurants 8021-01</p>
    </div>
  );
}

function Component17() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="3">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">money-bills</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Less than $500,000</p>
    </div>
  );
}

function Component18() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="4">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">user-group</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">51-100</p>
    </div>
  );
}

function Row7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component16 />
      <Component17 />
      <Component18 />
    </div>
  );
}

function BusinessInformation7() {
  return (
    <div className="content-stretch flex flex-col h-[68px] items-start relative shrink-0 w-full" data-name="Business Information">
      <Row7 />
    </div>
  );
}

function BaseTableCellDetailed7() {
  return (
    <div className="bg-white h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[16px] pt-[24px] px-[16px] relative size-full">
          <BusinessInformation7 />
        </div>
      </div>
    </div>
  );
}

function Component19() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">industry-alt</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Restaurants 8021-01</p>
    </div>
  );
}

function Component20() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="3">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">money-bills</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Less than $500,000</p>
    </div>
  );
}

function Component21() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="4">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">user-group</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">51-100</p>
    </div>
  );
}

function Row8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component19 />
      <Component20 />
      <Component21 />
    </div>
  );
}

function BusinessInformation8() {
  return (
    <div className="content-stretch flex flex-col h-[68px] items-start relative shrink-0 w-full" data-name="Business Information">
      <Row8 />
    </div>
  );
}

function BaseTableCellDetailed8() {
  return (
    <div className="bg-white h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[16px] pt-[24px] px-[16px] relative size-full">
          <BusinessInformation8 />
        </div>
      </div>
    </div>
  );
}

function Component22() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">industry-alt</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Restaurants 8021-01</p>
    </div>
  );
}

function Component23() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="3">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">money-bills</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">Less than $500,000</p>
    </div>
  );
}

function Component24() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="4">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">user-group</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">51-100</p>
    </div>
  );
}

function Row9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component22 />
      <Component23 />
      <Component24 />
    </div>
  );
}

function BusinessInformation9() {
  return (
    <div className="content-stretch flex flex-col h-[68px] items-start relative shrink-0 w-full" data-name="Business Information">
      <Row9 />
    </div>
  );
}

function BaseTableCellDetailed9() {
  return (
    <div className="bg-white h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pb-[16px] pt-[24px] px-[16px] relative size-full">
          <BusinessInformation9 />
        </div>
      </div>
    </div>
  );
}

function BaseColumnType1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="_Base_Column Type">
      <div className="bg-[#f2f4f7] h-[40px] relative shrink-0 w-full" data-name="_Base_Column Header">
        <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[16px] py-[8px] relative size-full">
            <Text1 />
          </div>
        </div>
      </div>
      <BaseTableCellDetailed5 />
      <BaseTableCellDetailed6 />
      <BaseTableCellDetailed7 />
      <BaseTableCellDetailed8 />
      <BaseTableCellDetailed9 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">Contacts</p>
      <div className="relative shrink-0 size-[14px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">sort</p>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#1d2939] text-[16px]">P*******</p>
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[16px] text-center tracking-[0.48px] uppercase">
          <p className="leading-[24px]">caret-down</p>
        </div>
      </div>
    </div>
  );
}

function Component25() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">user</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">CEO</p>
    </div>
  );
}

function Component26() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="4">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">at</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#1d2939] text-[16px]">***** *****</p>
    </div>
  );
}

function Row10() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component25 />
      <Component26 />
    </div>
  );
}

function BusinessInformation10() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-full" data-name="Business Information">
      <Row10 />
    </div>
  );
}

function BaseTableCellDetailed10() {
  return (
    <div className="bg-white h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[12px] px-[16px] relative size-full">
        <Frame23 />
        <BusinessInformation10 />
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#1d2939] text-[16px]">X** C****</p>
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[16px] text-center tracking-[0.48px] uppercase">
          <p className="leading-[24px]">caret-down</p>
        </div>
      </div>
    </div>
  );
}

function Component27() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">user</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">CEO</p>
    </div>
  );
}

function Component28() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="4">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">at</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">get email address</p>
    </div>
  );
}

function Row11() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component27 />
      <Component28 />
    </div>
  );
}

function BusinessInformation11() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-full" data-name="Business Information">
      <Row11 />
    </div>
  );
}

function BaseTableCellDetailed11() {
  return (
    <div className="bg-white h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[12px] px-[16px] relative size-full">
        <Frame24 />
        <BusinessInformation11 />
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#1d2939] text-[16px]">Q**** P*</p>
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[16px] text-center tracking-[0.48px] uppercase">
          <p className="leading-[24px]">caret-down</p>
        </div>
      </div>
    </div>
  );
}

function Component29() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">user</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">CEO</p>
    </div>
  );
}

function Component30() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="4">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">at</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">get email address</p>
    </div>
  );
}

function Row12() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component29 />
      <Component30 />
    </div>
  );
}

function BusinessInformation12() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-full" data-name="Business Information">
      <Row12 />
    </div>
  );
}

function BaseTableCellDetailed12() {
  return (
    <div className="bg-white h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[12px] px-[16px] relative size-full">
        <Frame25 />
        <BusinessInformation12 />
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#1d2939] text-[16px]">Z* O***</p>
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[16px] text-center tracking-[0.48px] uppercase">
          <p className="leading-[24px]">caret-down</p>
        </div>
      </div>
    </div>
  );
}

function Component31() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">user</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">CEO</p>
    </div>
  );
}

function Component32() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="4">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">at</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">get email address</p>
    </div>
  );
}

function Row13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component31 />
      <Component32 />
    </div>
  );
}

function BusinessInformation13() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-full" data-name="Business Information">
      <Row13 />
    </div>
  );
}

function BaseTableCellDetailed13() {
  return (
    <div className="bg-white h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[12px] px-[16px] relative size-full">
        <Frame26 />
        <BusinessInformation13 />
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[24px] min-w-px not-italic relative text-[#1d2939] text-[16px]">A**** S****</p>
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[16px] text-center tracking-[0.48px] uppercase">
          <p className="leading-[24px]">caret-down</p>
        </div>
      </div>
    </div>
  );
}

function Component33() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="1">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">user</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">CEO</p>
    </div>
  );
}

function Component34() {
  return (
    <div className="content-stretch flex gap-[8px] items-baseline relative shrink-0 w-full" data-name="4">
      <div className="relative shrink-0 size-[16px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
          <p className="leading-[24px]">at</p>
        </div>
      </div>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#475467] text-[14px]">get email address</p>
    </div>
  );
}

function Row14() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Row">
      <Component33 />
      <Component34 />
    </div>
  );
}

function BusinessInformation14() {
  return (
    <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-full" data-name="Business Information">
      <Row14 />
    </div>
  );
}

function BaseTableCellDetailed14() {
  return (
    <div className="bg-white h-[117.5px] relative shrink-0 w-full" data-name="_Base_Table Cell_Detailed">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[12px] px-[16px] relative size-full">
        <Frame27 />
        <BusinessInformation14 />
      </div>
    </div>
  );
}

function BaseColumnType2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="_Base_Column Type">
      <div className="bg-[#f2f4f7] h-[40px] relative shrink-0 w-full" data-name="_Base_Column Header">
        <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid border-t inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[16px] py-[8px] relative size-full">
            <Text2 />
          </div>
        </div>
      </div>
      <BaseTableCellDetailed10 />
      <BaseTableCellDetailed11 />
      <BaseTableCellDetailed12 />
      <BaseTableCellDetailed13 />
      <BaseTableCellDetailed14 />
    </div>
  );
}

function Rows() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Rows">
      <BaseColumnType />
      <BaseColumnType1 />
      <BaseColumnType2 />
    </div>
  );
}

function Select() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-full" data-name="Select">
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">30 rows</p>
          <div className="relative shrink-0 size-[16px]" data-name="Icons">
            <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[16px] text-center tracking-[0.48px] uppercase">
              <p className="leading-[24px]">caret-down</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Rows1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Rows">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">Rows per page</p>
      <div className="relative rounded-[8px] shrink-0" data-name="Dropdown Menu">
        <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-center relative size-full">
            <Select />
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">1 - 30 of 12,931</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Content">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1d2939] text-[14px] whitespace-nowrap">1</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 z-[1]" data-name="Input">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip px-[16px] py-[8px] relative rounded-[inherit] size-full">
        <Content3 />
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Field() {
  return (
    <div className="content-stretch flex flex-col isolate items-start relative shrink-0" data-name="Field">
      <Input />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative">
      <div className="relative shrink-0 size-[20px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[20px] text-center tracking-[0.6px] uppercase">
          <p className="leading-[24px]">angles-left</p>
        </div>
      </div>
      <div className="relative shrink-0 size-[20px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[20px] text-center tracking-[0.6px] uppercase">
          <p className="leading-[24px]">angle-left</p>
        </div>
      </div>
      <div className="relative shrink-0" data-name="Text field">
        <div className="content-stretch flex flex-col items-start relative size-full">
          <div className="relative shrink-0" data-name="_Base Component: Text Field">
            <div className="content-stretch flex flex-col gap-[8px] items-start relative size-full">
              <Field />
            </div>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">of 140 pages</p>
      <div className="relative shrink-0 size-[20px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[20px] text-center tracking-[0.6px] uppercase">
          <p className="leading-[24px]">angle-right</p>
        </div>
      </div>
      <div className="relative shrink-0 size-[20px]" data-name="Icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[20px] text-center tracking-[0.6px] uppercase">
          <p className="leading-[24px]">angles-right</p>
        </div>
      </div>
    </div>
  );
}

function DataTable() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[991px]" data-name="Data Table">
      <div aria-hidden className="absolute border border-[#eaecf0] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
      <Rows />
      <div className="bg-[#f9fafb] relative rounded-bl-[8px] rounded-br-[8px] shrink-0 w-[1031px]" data-name="_Base_Pagination">
        <div className="flex flex-row justify-center size-full">
          <div className="content-stretch flex items-start justify-between p-[16px] relative size-full">
            <Rows1 />
            <Frame28 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] w-[498px]">SignalFuse</p>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] w-[995px]">Business type breakdown</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] w-[995px]">Independent focus — Stay with independent operators - they typically evaluate vendors faster than franchise networks.</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] w-[995px]">Verified contacts — Prioritise companies with verified contacts to improve connect rates on first outreach.</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] w-[995px]">Texas focus — Concentrate early outreach in Houston, Dallas, Austin where match density is highest.</p>
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] w-[995px]">Top Qualified Leads</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] w-[995px]">Ranked by revenue and employee count with verified contact information.</p>
      <DataTable />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <div className="relative shrink-0 size-[16px]" data-name="">
        <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
          <path d={svgPaths.p2c5b6600} fill="url(#paint0_linear_0_811)" id="ï¢" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_811" x1="8" x2="8" y1="-6" y2="22">
              <stop offset="0.2" stopColor="#F599ED" />
              <stop offset="0.5" stopColor="#016DEE" />
              <stop offset="0.85" stopColor="#2DFBF9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Frame40 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col h-[695px] items-start overflow-clip relative shrink-0 w-[1061px]">
      <Frame39 />
    </div>
  );
}

function Select1() {
  return (
    <div className="bg-white h-[32px] relative rounded-[8px] shrink-0 w-full" data-name="Select">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative size-full">
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] whitespace-nowrap">SignalFuse</p>
          <div className="relative shrink-0 size-[14px]" data-name="Icons">
            <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Solid',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#98a2b3] text-[14px] text-center tracking-[0.42px] uppercase">
              <p className="leading-[24px]">caret-down</p>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <div className="relative rounded-[8px] shrink-0" data-name="Dropdown Menu">
        <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-center relative size-full">
            <Select1 />
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#98a2b3] text-[14px] w-[498px]">Ask me to refine, expand or narrow your lead list...</p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex gap-[8px] items-start justify-end relative shrink-0">
      <div className="relative rounded-[6px] shrink-0" data-name="Button">
        <div className="content-stretch flex items-start relative size-full">
          <div className="bg-white relative rounded-[6px] shrink-0" data-name="_Base Button">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center p-[8px] relative size-full">
                <div className="relative shrink-0 size-[16px]" data-name="Icons">
                  <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[16px] text-center tracking-[0.48px] uppercase">
                    <p className="leading-[24px]">microphone</p>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
        </div>
      </div>
      <div className="relative rounded-[6px] shrink-0" data-name="Button">
        <div className="content-stretch flex items-start relative size-full">
          <div className="bg-white relative rounded-[6px] shrink-0" data-name="_Base Button">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center p-[8px] relative size-full">
                <div className="relative shrink-0 size-[16px]" data-name="Icons">
                  <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Regular',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[16px] text-center tracking-[0.48px] uppercase">
                    <p className="leading-[24px]">SEND</p>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame36 />
      <Frame34 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="border-[#f599ed] border-[1.5px] border-solid content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[12px] shrink-0 w-full">
      <Frame33 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame32 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[1061px]">
      <Frame35 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#1d2939] text-[12px] text-center w-full">SalesGenie AI my make mistakes. Review criteria before opening your list</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="h-[960px] relative shrink-0 w-full" data-name="Content">
      <div aria-hidden className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-between p-[24px] relative size-full">
          <HeaderComponent />
          <Frame38 />
          <Frame37 />
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

function Frame5() {
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

function Frame6() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[21px] not-italic relative shrink-0 text-[#1d2939] text-[14px] whitespace-nowrap">Business</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Consumer</p>
    </div>
  );
}

function DatasetToggle() {
  return (
    <div className="bg-[#344054] content-stretch flex gap-[2px] items-center p-[2px] relative rounded-[9999px] shrink-0 w-[199px]" data-name="Dataset Toggle">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function Frame10() {
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

function Frame2() {
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
          <Frame2 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Search</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
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
          <Frame3 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Saved lists</p>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
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

function Frame8() {
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
          <Frame4 />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[26px] min-w-px not-italic relative text-[16px] text-white">Email campaigns</p>
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function Frame12() {
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

function Frame13() {
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
          <Frame12 />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[26px] min-w-px not-italic relative text-[16px] text-white">Direct mail</p>
          <Frame13 />
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
          <p className="leading-[24px]">calendar</p>
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
          <Frame14 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white w-[132px]">Tasks</p>
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
          <Frame16 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Settings</p>
        </div>
      </div>
    </div>
  );
}

function Frame17() {
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
          <Frame17 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Support</p>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
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

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full">
      <Frame5 />
      <Frame10 />
      <Frame9 />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Title">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-w-px not-italic relative text-[14px] text-white">Get started today!</p>
    </div>
  );
}

function Frame29() {
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
      <Frame29 />
      <div className="relative rounded-[6px] shrink-0 w-full" data-name="Button">
        <div className="content-stretch flex items-start relative size-full">
          <div className="bg-[#008dc3] flex-[1_0_0] min-w-px relative rounded-[6px]" data-name="_Base Button">
            <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative size-full">
                <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">See options</p>
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
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[0px] text-center text-white w-full">
        <span className="leading-[20px] text-[14px]">{`Contact us at `}</span>
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px]">877.708.3844</span>
        <span className="leading-[20px] text-[14px]">{` or `}</span>
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px]">genie@data-axle.com</span>
      </p>
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

function Frame18() {
  return (
    <div className="content-stretch flex items-start justify-center p-[8px] relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#98a2b3] text-[12px] whitespace-nowrap">© 2024 Data Axle, All Rights Reserved</p>
    </div>
  );
}

function Sidebar1() {
  return (
    <div className="bg-[#1d2939] content-stretch flex flex-col h-[1024px] items-center justify-between pb-[8px] relative shrink-0 w-[256px]" data-name="Sidebar">
      <Frame11 />
      <Section />
      <Frame18 />
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

export default function SearchSignalFuseNewConversationGraph() {
  return (
    <div className="relative size-full" data-name="Search > SignalFuse > New conversation > Graph">
      <Content />
      <Navigation />
    </div>
  );
}