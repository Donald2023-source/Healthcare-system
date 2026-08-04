export function generateHospitalNumber() {
  const year = new Date().getFullYear();

  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `HSP-${year}-${random}`;
}