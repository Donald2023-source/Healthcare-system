import { ReactNode } from "react";

export interface WizardStep {
  id: string;
  title: string;
  component: ReactNode;
}