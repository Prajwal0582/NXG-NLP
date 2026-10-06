interface WelcomeModalProps {
  isSubscriber: boolean;
  onGetStarted: () => void;
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6">
      <path
        d="M12 2C12 2 13.8 7.8 17.25 9.75C20.7 11.7 22 12 22 12C22 12 20.7 12.3 17.25 14.25C13.8 16.2 12 22 12 22C12 22 10.2 16.2 6.75 14.25C3.3 12.3 2 12 2 12C2 12 3.3 11.7 6.75 9.75C10.2 7.8 12 2 12 2Z"
        fill="url(#welcome-sparkle)"
      />
      <defs>
        <linearGradient id="welcome-sparkle" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="size-9 rounded-lg bg-[#f0f9ff] flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-[14px] font-medium leading-[20px] text-[#1d2939]">{title}</p>
        <p className="text-[13px] font-normal leading-[19px] text-[#667085] mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export default function WelcomeModal({ isSubscriber, onGetStarted }: WelcomeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-[520px] animate-fade-in overflow-hidden">
        {/* Gradient header band */}
        <div className="h-2 bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4]" />

        <div className="px-10 pt-8 pb-10">
          {/* Icon + Title */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="size-14 rounded-full bg-gradient-to-br from-[#eff6ff] to-[#f0fdf4] flex items-center justify-center mb-4">
              <SparkleIcon />
            </div>
            <h2 className="text-[22px] font-semibold leading-[30px] text-[#1d2939] mb-2">
              Welcome to SalesGenie
            </h2>
            <p className="text-[14px] font-normal leading-[22px] text-[#475467] max-w-[380px]">
              Find your ideal leads faster with AI-powered Smart Search.
              Just describe who you're looking for in plain language.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-4 mb-8">
            <FeatureItem
              icon={
                <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="#008dc3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="8" r="5.5" />
                  <path d="m18 18-4.5-4.5" />
                </svg>
              }
              title="Natural-language search"
              desc="Describe leads in your own words — no filters to learn."
            />
            <FeatureItem
              icon={
                <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="#008dc3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v14h14" />
                  <path d="M7 13l3-4 3 2 4-5" />
                </svg>
              }
              title="Instant insights"
              desc="Get lead counts, data breakdowns, and recommendations in seconds."
            />
            <FeatureItem
              icon={
                <svg viewBox="0 0 20 20" fill="none" className="size-5" stroke="#008dc3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 1L1 8h5l-1 5 6-7H6L7 1Z" transform="translate(3,3) scale(0.8)" />
                </svg>
              }
              title="20 free prompts"
              desc={isSubscriber
                ? "Start with 20 free prompts, then continue at 2 credits per prompt."
                : "Explore lead generation with 20 free prompts to get started."
              }
            />
          </div>

          {/* CTA */}
          <button
            onClick={onGetStarted}
            className="w-full py-3 text-[16px] font-medium leading-[24px] text-white bg-[#008dc3] border border-[#008dc3] hover:bg-[#007aab] rounded-lg transition-colors"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
