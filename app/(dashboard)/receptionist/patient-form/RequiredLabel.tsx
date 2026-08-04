import { Label } from "@/components/ui/label";

interface RequiredLabelProps {
  children: React.ReactNode;
  required?: boolean;
}

export default function RequiredLabel({
  children,
  required = true,
}: RequiredLabelProps) {
  return (
    <Label className="text-sm font-medium">
      {children}

      {required && (
        <span className="ml-1 text-red-500">*</span>
      )}
    </Label>
  );
}