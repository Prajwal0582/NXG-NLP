import svgPaths from "./svg-7i0zq8tlic";

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
        <g clipPath="url(#clip0_0_116)" id="menu_black_48dp 1">
          <g id="Vector" />
          <path d={svgPaths.p1d821780} fill="black" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_0_116">
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

function Frame21() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[30px] not-italic overflow-hidden relative shrink-0 text-[#1d2939] text-[20px] text-ellipsis tracking-[0.2px] whitespace-nowrap">Unnamed List</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame21 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Frame26 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[692px]">
      <Frame25 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal h-[21px] leading-[21px] not-italic overflow-hidden relative shrink-0 text-[#475467] text-[14px] text-ellipsis tracking-[0.14px] w-[750px] whitespace-nowrap">Smart Search</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[750px]">
      <div className="relative shrink-0 size-[28px]" data-name="icons">
        <div className="[word-break:break-word] absolute flex flex-col font-['Font_Awesome_6_Pro:Light',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#475467] text-[20px] text-center tracking-[0.6px] uppercase">
          <p className="leading-[24px]">arrow-left</p>
        </div>
      </div>
      <Frame22 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Content">
      <Frame23 />
    </div>
  );
}

function Frame20() {
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
      <Frame20 />
      <Actions />
    </div>
  );
}

function Frame29() {
  return (
    <div className="bg-[#f2f4f7] content-stretch flex items-center justify-center px-[7px] py-[6px] relative rounded-[8px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] text-right whitespace-nowrap">Go ahead</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-[#d0d5dd] content-stretch flex items-center justify-center p-[3.918px] relative rounded-[39.175px] shrink-0">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[10.284px] not-italic relative shrink-0 text-[6.856px] text-black whitespace-nowrap">SM</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-full">
      <Frame29 />
      <Frame2 />
    </div>
  );
}

function NormalState() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Normal state">
      <div className="relative shrink-0 size-[16px]" data-name="">
        <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
          <path d={svgPaths.p2c5b6600} fill="url(#paint0_linear_0_112)" id="ï¢" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_0_112" x1="8" x2="8" y1="-6" y2="22">
              <stop offset="0.2" stopColor="#F599ED" />
              <stop offset="0.5" stopColor="#016DEE" />
              <stop offset="0.85" stopColor="#2DFBF9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">SignalFuse</p>
    </div>
  );
}

function Frame31() {
  return (
    <div className="h-[13px] relative shrink-0 w-[15px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="13" preserveAspectRatio="none" viewBox="0 0 15 13" width="15">
        <g id="Frame 1000002534" />
      </svg>
    </div>
  );
}

function AnswerCard() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="AnswerCard">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] text-center whitespace-nowrap">Thought process</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Button">
      <AnswerCard />
      <Icon />
    </div>
  );
}

function Collapsible() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Collapsible">
      <Button />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">Texas Restaurants with More Than 20 Employees</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pt-[12px] relative shrink-0 w-[1002px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#344054] text-[0px] whitespace-nowrap">
        <span className="leading-[20px] text-[14px]">{`I found `}</span>
        <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] text-[14px]">11,029 restaurants in Texas with more than 20 employees.</span>
        <span className="leading-[20px] text-[14px]">{` `}</span>
        <span className="leading-[0px] text-[#016dee] text-[10.5px]">1</span>
      </p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col h-[32px] items-start pt-[12px] relative shrink-0 w-[1002px]" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">The largest employers include:</p>
    </div>
  );
}

function Text() {
  return <div className="border border-[#98a2b3] border-solid relative rounded-[16777200px] shrink-0 size-[4px]" data-name="Text" />;
}

function TextMargin() {
  return (
    <div className="content-stretch flex items-start pt-[8px] relative shrink-0" data-name="Text:margin">
      <Text />
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#344054] text-[0px] whitespace-nowrap">
        <span className="leading-[20px] text-[14px]">Kades Corp</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px]">{` (Pasadena) - 2,700 employees`}</span>
      </p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-start relative shrink-0 w-full" data-name="List Item">
      <TextMargin />
      <Text1 />
    </div>
  );
}

function Text2() {
  return <div className="border border-[#98a2b3] border-solid relative rounded-[16777200px] shrink-0 size-[4px]" data-name="Text" />;
}

function TextMargin1() {
  return (
    <div className="content-stretch flex items-start pt-[8px] relative shrink-0" data-name="Text:margin">
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#344054] text-[0px] whitespace-nowrap">
        <span className="leading-[20px] text-[14px]">Kemah Waterfront</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px]">{` (Kemah) - 1,000 employees`}</span>
      </p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[26px] items-start pt-[6px] relative shrink-0 w-[1002px]" data-name="List Item">
      <TextMargin1 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return <div className="border border-[#98a2b3] border-solid relative rounded-[16777200px] shrink-0 size-[4px]" data-name="Text" />;
}

function TextMargin2() {
  return (
    <div className="content-stretch flex items-start pt-[8px] relative shrink-0" data-name="Text:margin">
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#344054] text-[0px] whitespace-nowrap">
        <span className="leading-[20px] text-[14px]">Future Infrastructure</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px]">{` (Mesquite) - 1,000 employees`}</span>
      </p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[26px] items-start pt-[6px] relative shrink-0 w-[1002px]" data-name="List Item">
      <TextMargin2 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return <div className="border border-[#98a2b3] border-solid relative rounded-[16777200px] shrink-0 size-[4px]" data-name="Text" />;
}

function TextMargin3() {
  return (
    <div className="content-stretch flex items-start pt-[8px] relative shrink-0" data-name="Text:margin">
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#344054] text-[0px] whitespace-nowrap">
        <span className="leading-[20px] text-[14px]">{`McDonald's Management Office`}</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px]">{` (Longview) - 600 employees`}</span>
      </p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[26px] items-start pt-[6px] relative shrink-0 w-[1002px]" data-name="List Item">
      <TextMargin3 />
      <Text7 />
    </div>
  );
}

function Text8() {
  return <div className="border border-[#98a2b3] border-solid relative rounded-[16777200px] shrink-0 size-[4px]" data-name="Text" />;
}

function TextMargin4() {
  return (
    <div className="content-stretch flex items-start pt-[8px] relative shrink-0" data-name="Text:margin">
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#344054] text-[0px] whitespace-nowrap">
        <span className="leading-[20px] text-[14px]">Shellers</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px]">{` (Cedar Park) - 600 employees`}</span>
      </p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[26px] items-start pt-[6px] relative shrink-0 w-[1002px]" data-name="List Item">
      <TextMargin4 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return <div className="border border-[#98a2b3] border-solid relative rounded-[16777200px] shrink-0 size-[4px]" data-name="Text" />;
}

function TextMargin5() {
  return (
    <div className="content-stretch flex items-start pt-[8px] relative shrink-0" data-name="Text:margin">
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#344054] text-[0px] whitespace-nowrap">
        <span className="leading-[20px] text-[14px]">Brinker International, Inc</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] text-[14px]">{` (Coppell) - 600 employees`}</span>
      </p>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[26px] items-start pt-[6px] relative shrink-0 w-[1002px]" data-name="List Item">
      <TextMargin5 />
      <Text11 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col h-[162px] items-start pt-[12px] relative shrink-0 w-[1002px]" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[12px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#344054] text-[0px] w-[1002px]">
        <span className="leading-[20px] text-[14px]">{`The dataset includes a mix of restaurant management companies, full-service restaurants, and fast-food chains across Texas, with employee counts ranging from just over 20 to several thousand. `}</span>
        <span className="leading-[0px] text-[#016dee] text-[10.5px]">2</span>
      </p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[20px] relative shrink-0 w-[1002px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
      <Paragraph2 />
      <List />
      <Paragraph3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex gap-[6px] h-[20px] items-center relative shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] text-center whitespace-nowrap">Sources (2)</p>
      <Icon1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col h-[40px] items-start pt-[20px] relative shrink-0 w-[1002px]" data-name="Container">
      <Button1 />
    </div>
  );
}

function Text12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap">Is this useful?</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_109)" id="Icon">
          <path d={svgPaths.p11f53400} id="Vector" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 6.66667V14.6667" id="Vector_2" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_109">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonHelpful() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Button - Helpful">
      <Icon2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_105)" id="Icon">
          <path d={svgPaths.p106fa00} id="Vector" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11.3333 9.33333V1.33333" id="Vector_2" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_105">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonNotHelpful() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Button - Not helpful">
      <Icon3 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_89)" id="Icon">
          <path d={svgPaths.p2d183500} id="Vector" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p11f26280} id="Vector_2" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_0_89">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonGiveFeedback() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Button - Give feedback">
      <Icon4 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Container">
      <Text12 />
      <ButtonHelpful />
      <ButtonNotHelpful />
      <ButtonGiveFeedback />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d={svgPaths.p185fb780} id="Vector" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p30ca5e80} id="Vector_2" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pac25b80} id="Vector_3" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.72667 9.00667L10.28 11.66" id="Vector_4" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p533300} id="Vector_5" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Button">
      <Icon5 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] text-center whitespace-nowrap">Share</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M8 10V2" id="Vector" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p23ad1400} id="Vector_2" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p19411800} id="Vector_3" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Button">
      <Icon6 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#475467] text-[14px] text-center whitespace-nowrap">Download PDF</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between pt-[16px] relative shrink-0 w-[1002px]" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Collapsible />
      <Container1 />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#1d2939] text-[14px] whitespace-nowrap">Good now i can see the data format.THe SIC codes are 6-digit codes, and manufacturing SIC codes range from 20-39 (first 2 digits)</p>
      <Container />
    </div>
  );
}

function NormalState1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[94px] items-start relative shrink-0 w-full" data-name="Normal state">
      <Frame31 />
      <Frame32 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[100px]">
      <NormalState />
      <NormalState1 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[41px] h-[695px] items-start overflow-clip relative shrink-0 w-[1061px]">
      <Frame28 />
      <Frame30 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="Icon">
          <path d="M3.5 5.25L7 8.75L10.5 5.25" id="Vector" stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white border border-[#d0d5dd] border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[6px] relative rounded-[8px] shrink-0" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#667085] text-[14px] text-center whitespace-nowrap">SignalFuse</p>
      <Icon7 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="content-stretch flex flex-[784.891_0_0] flex-col h-[20px] items-start justify-center min-w-px overflow-clip relative" data-name="Text Input">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#98a2b3] text-[14px] w-full">Ask me to find businesses...</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-[927_0_0] gap-[14px] items-center min-w-px relative" data-name="Container">
      <Button4 />
      <TextInput />
    </div>
  );
}

function Icon8() {
  return (
    <div className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M8 12.6667V14.6667" id="Vector" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p4f72080} id="Vector_2" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1c53e800} id="Vector_3" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function ButtonVoiceInput() {
  return (
    <div className="bg-white border border-[#d0d5dd] border-solid grid grid-cols-[_30px] grid-rows-[_30px] relative rounded-[6px] shrink-0 size-[32px]" data-name="Button - Voice input">
      <Icon8 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="col-1 justify-self-center relative row-1 self-center shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d={svgPaths.p2056f080} id="Vector" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 8H14.6667" id="Vector_2" stroke="#475467" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function ButtonSend() {
  return (
    <div className="bg-white border border-[#d0d5dd] border-solid grid grid-cols-[_30px] grid-rows-[_30px] opacity-40 relative rounded-[6px] shrink-0 size-[32px]" data-name="Button - Send">
      <Icon9 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <ButtonVoiceInput />
      <ButtonSend />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-[1011px]" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container7() {
  return (
    <div className="border-[#f599ed] border-[1.5px] border-solid content-stretch flex flex-col items-start p-[8px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <Container8 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Paragraph">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#1d2939] text-[12px] whitespace-nowrap">SalesGenie AI may make mistakes. Review criteria before opening your list</p>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="12" preserveAspectRatio="none" viewBox="0 0 12 12" width="12">
        <g id="Icon">
          <path d={svgPaths.p24e68700} id="Vector" stroke="#344054" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#344054] text-[12px] whitespace-nowrap">4 of 4 free prompts left</p>
    </div>
  );
}

function Container13() {
  return <div className="bg-[#016dee] h-[6px] relative rounded-[16777200px] shrink-0 w-full" data-name="Container" />;
}

function Container12() {
  return (
    <div className="bg-[#e4e7ec] content-stretch flex flex-col h-[6px] items-start overflow-clip relative rounded-[16777200px] shrink-0 w-[64px]" data-name="Container">
      <Container13 />
    </div>
  );
}

function PromptCounter() {
  return (
    <div className="bg-[#f0f9ff] border border-[#bae6fd] border-solid content-stretch flex gap-[10px] items-center px-[12px] py-[6px] relative rounded-[16777200px] shrink-0" data-name="PromptCounter">
      <Icon10 />
      <Text13 />
      <Container12 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph4 />
      <PromptCounter />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-center pt-[8px] relative shrink-0 w-full" data-name="Container:margin">
      <Container11 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-[1029px]" data-name="Container">
      <Container7 />
      <ContainerMargin />
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
          <Frame27 />
          <Container6 />
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

function Frame3() {
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
          <Frame3 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Search</p>
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
          <Frame4 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Saved lists</p>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
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

function Frame12() {
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
          <Frame8 />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[26px] min-w-px not-italic relative text-[16px] text-white">Email campaigns</p>
          <Frame12 />
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
          <p className="leading-[24px]">envelopes-bulk</p>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
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
          <Frame13 />
          <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[26px] min-w-px not-italic relative text-[16px] text-white">Direct mail</p>
          <Frame14 />
        </div>
      </div>
    </div>
  );
}

function Frame15() {
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

function Frame16() {
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
          <Frame15 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white w-[132px]">Tasks</p>
          <Frame16 />
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
          <Frame17 />
          <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[26px] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Settings</p>
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
          <Frame18 />
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

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Title1 />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[12px] text-white w-full">{`Whether you're all in or just need a list, we’ve got flexible options to help you start faster.`}</p>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Content">
      <Frame24 />
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
        <Content3 />
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

function Frame19() {
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
      <Frame19 />
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

export default function SearchSignalFuseNewConversation() {
  return (
    <div className="relative size-full" data-name="Search > SignalFuse > New conversation">
      <Content />
      <Navigation />
    </div>
  );
}