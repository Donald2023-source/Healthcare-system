"use client";

import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange(value: string): void;
}

export default function PatientSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <input
        className="w-full rounded-lg border py-2 pl-10 pr-4"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search patient..."
      />
    </div>
  );
}