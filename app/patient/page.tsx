import { auth } from "@/auth";
import patientService from "@/services/patient.service";
import PatientHomePage from "./components/PatientHome";
import ConsultationRequestService from "@/services/consultation-request.service";
export default async function Page() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const dashboard = await patientService.getDashboard(session.user.id);
  const consultation = await ConsultationRequestService.getLatestRequest(
    dashboard.patient._id.toString()
  );
  console.log(consultation)

  

 
  return <PatientHomePage consultation={consultation} dashboard={dashboard} />;
}
