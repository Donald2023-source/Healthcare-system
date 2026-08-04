"use client";

import { useQuery } from "@tanstack/react-query";

import { searchPatients } from "@/services/patients-api";

export function usePatientSearch(query: string) {
  return useQuery({
    queryKey: ["patients", query],

    queryFn: () => searchPatients(query),

    enabled: query.length >= 2,

    staleTime: 1000 * 60,
  });
}