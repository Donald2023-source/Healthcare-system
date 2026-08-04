import PatientForm from "@/app/(dashboard)/receptionist/patient-form/PatientForm";

export default function RegisterPatientPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Register New Patient</h1>

      <PatientForm />
    </div>
  );
}
