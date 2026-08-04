export async function searchPatients(query: string) {
  const response = await fetch(
    `/api/receptionist/patients/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to search patients");
  }

  return response.json();
}