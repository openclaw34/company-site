const steps = [
  { num: 1, label: 'Date & Guests' },
  { num: 2, label: 'Your Info' },
  { num: 3, label: 'Confirm & Pay' },
] as const;

export default function BookingProgress({
  currentStep,
}: {
  currentStep: 1 | 2 | 3;
}) {
  return (
    <div className="flex items-center justify-between mb-10 max-w-md mx-auto">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                currentStep >= s.num
                  ? 'bg-forest-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {currentStep > s.num ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                s.num
              )}
            </div>
            <span
              className={`text-xs mt-1.5 ${
                currentStep >= s.num ? 'text-forest-700' : 'text-gray-400'
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-16 md:w-24 h-0.5 mx-2 mb-5 ${
                currentStep > s.num ? 'bg-forest-600' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
