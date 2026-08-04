"use client";

interface Props {
  isFirst: boolean;
  isLast: boolean;
  onPrevious(): void;
  onNext(): void;
  onSubmit(): void;
}

export default function WizardNavigation({
  isFirst,
  isLast,
  onPrevious,
  onNext,
  onSubmit,
}: Props) {
  return (
    <div className="mt-8 flex justify-between">
      <button
        type="button"
        disabled={isFirst}
        onClick={onPrevious}
        className="rounded-md border px-5 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      {isLast ? (
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-md bg-primary px-5 py-2 text-white"
        >
          Submit
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-primary px-5 py-2 text-white"
        >
          Continue
        </button>
      )}
    </div>
  );
}