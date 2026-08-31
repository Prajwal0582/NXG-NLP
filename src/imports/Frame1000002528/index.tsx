function Frame4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[3px] items-start leading-[18px] not-italic relative shrink-0 text-[#344054] text-[12px] whitespace-nowrap">
      <p className="relative shrink-0">Restaurants</p>
      <p className="relative shrink-0">Pizza establishments</p>
      <p className="relative shrink-0">Coffee shops</p>
      <p className="relative shrink-0">Restaurants</p>
      <p className="relative shrink-0">Pizza establishments</p>
      <p className="relative shrink-0">Coffee shops</p>
      <p className="relative shrink-0">Restaurants</p>
      <p className="relative shrink-0">Pizza establishments</p>
      <p className="relative shrink-0">Pizza establishments</p>
      <p className="relative shrink-0">Pizza establishments</p>
      <p className="relative shrink-0">Coffee shops</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[609px] items-center min-w-px relative rounded-[8px]">
      <div className="bg-gradient-to-b flex-[1_0_0] from-[#0ba38c] min-h-px relative rounded-[5px] to-[#005980] w-full" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[243px] items-center min-w-px relative rounded-[5px]">
      <div className="bg-gradient-to-b flex-[1_0_0] from-[#0ba38c] min-h-px relative rounded-[5px] to-[#005980] w-full" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-[243px] items-center min-w-px relative rounded-[5px]">
      <div className="bg-gradient-to-b flex-[1_0_0] from-[#0ba38c] min-h-px relative rounded-[5px] to-[#005980] w-full" />
    </div>
  );
}

function Frame() {
  return (
    <div className="flex h-[226px] items-center justify-center relative shrink-0 w-[609px]">
      <div className="flex-none rotate-90">
        <div className="content-stretch flex gap-[8px] h-[609px] items-end relative w-[226px]">
          <Frame1 />
          <Frame2 />
          <Frame3 />
          <div className="bg-[#f2f4f7] flex-[1_0_0] h-[171px] min-w-px relative rounded-[5px]" />
          <div className="bg-[#f2f4f7] flex-[1_0_0] h-[135px] min-w-px relative rounded-[5px]" />
          <div className="bg-[#f2f4f7] flex-[1_0_0] h-[96px] min-w-px relative rounded-[5px]" />
          <div className="bg-[#f2f4f7] flex-[1_0_0] h-[65px] min-w-px relative rounded-[5px]" />
          <div className="bg-[#f2f4f7] flex-[1_0_0] h-[39px] min-w-px relative rounded-[5px]" />
          <div className="bg-[#f2f4f7] flex-[1_0_0] h-[14px] min-w-px relative rounded-[5px]" />
          <div className="bg-[#f2f4f7] flex-[1_0_0] h-[14px] min-w-px relative rounded-[5px]" />
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[3px] items-start leading-[18px] not-italic relative shrink-0 text-[#344054] text-[12px] whitespace-nowrap">
      <p className="relative shrink-0">41</p>
      <p className="relative shrink-0">11</p>
      <p className="relative shrink-0">10</p>
      <p className="relative shrink-0">9</p>
      <p className="relative shrink-0">8</p>
      <p className="relative shrink-0">7</p>
      <p className="relative shrink-0">6</p>
      <p className="relative shrink-0">5</p>
      <p className="relative shrink-0">4</p>
      <p className="relative shrink-0">3</p>
      <p className="relative shrink-0">2</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0">
      <Frame4 />
      <Frame />
      <Frame7 />
    </div>
  );
}

export default function Frame6() {
  return (
    <div className="bg-white border border-[#d0d5dd] border-solid content-stretch flex flex-col gap-[10px] items-start p-[24px] relative rounded-[8px] size-full">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap">Top restaurants types among qualified matches</p>
      <Frame5 />
    </div>
  );
}