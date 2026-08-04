"use client";

interface Props {
  totalSteps: number;
  currentStep: number;
}

export default function WizardProgress({
  totalSteps,
  currentStep,
}: Props) {
  const percentage =
    ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="mb-2 flex justify-between">
        <span className="font-medium">
          Step {currentStep + 1} of {totalSteps}
        </span>

        <span>
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-muted">
        <div
          style={{
            width: `${percentage}%`,
          }}
          className="h-2 rounded-full bg-primary transition-all"
        />
      </div>
    </div>
  );
}