"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface WizardContextType {
  currentStep: number;
  next: () => void;
  previous: () => void;
  goTo: (step: number) => void;
}

const WizardContext =
  createContext<WizardContextType | null>(null);

export function WizardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentStep, setCurrentStep] =
    useState(0);

  return (
    <WizardContext.Provider
      value={{
        currentStep,

        next: () =>
          setCurrentStep((prev) => prev + 1),

        previous: () =>
          setCurrentStep((prev) => prev - 1),

        goTo: (step) => setCurrentStep(step),
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);

  if (!context) {
    throw new Error(
      "useWizard must be used inside WizardProvider"
    );
  }

  return context;
}