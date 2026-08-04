import CheckInForm from "../../../components/CheckInForm";

export default async function Page({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;

  return (
    <div className="p-6">
      <CheckInForm patientId={patientId} />
    </div>
  );
}
