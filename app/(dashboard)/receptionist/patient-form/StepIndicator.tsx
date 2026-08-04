interface Props {
  currentStep: number;
}

const steps = [
  "Personal",
  "Contact",
  "Medical",
  "Emergency",
  "Review",
];

export default function StepIndicator({
  currentStep,
}: Props) {
  return (
    <div className="mb-8 flex items-center justify-between">
      {steps.map((step, index) => {
        const active = index <= currentStep;

        return (
          <div
            key={step}
            className="flex flex-1 items-center"
          >
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300"
                }`}
              >
                {index + 1}
              </div>

              <span className="mt-2 text-xs">
                {step}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`h-1 flex-1 ${
                  active
                    ? "bg-primary"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}