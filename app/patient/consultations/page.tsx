import Link from "next/link";
export default function ConsultationsPage() {
  return (
    <div className="p-5">
      <h1
        className="
text-2xl
font-bold
"
      >
        Consultation
      </h1>

      <div
        className="
mt-5
rounded-2xl
border
bg-card
p-5
"
      >
        <p>Request a consultation with the hospital.</p>

        <button
          className="
mt-4
rounded-xl
bg-primary
px-5
py-3
text-white
"
        >
          <Link href="/patient/consultations/new"> Request Consultation</Link>
        </button>
      </div>
    </div>
  );
}
