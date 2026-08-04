import { UseFormReturn } from "react-hook-form";

import { PatientSchema } from "@/lib/validations/patients";

interface Props {
  form: UseFormReturn<PatientSchema>;
}

export default function ReviewStep({ form }: Props) {
  const values = form.getValues();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">
        Review Information
      </h2>

      {/* Personal Information */}
      <div className="rounded-lg border p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Personal Information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <ReviewItem label="First Name" value={values.firstName} />
          <ReviewItem label="Middle Name" value={values.middleName} />
          <ReviewItem label="Last Name" value={values.lastName} />
          <ReviewItem label="Gender" value={values.gender} />
          <ReviewItem
            label="Date of Birth"
            value={String(values.dateOfBirth)}
          />
          <ReviewItem
            label="Marital Status"
            value={values.maritalStatus}
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg border p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Contact Information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <ReviewItem label="Email" value={values.email} />
          <ReviewItem label="Phone" value={values.phoneNumber} />
          <ReviewItem label="Address" value={values.address} />
        </div>
      </div>

      {/* Medical Information */}
      <div className="rounded-lg border p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Medical Information
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <ReviewItem
            label="Blood Group"
            value={values.bloodGroup}
          />

          <ReviewItem
            label="Genotype"
            value={values.genotype}
          />

          <ReviewItem
            label="Allergies"
            value={values.allergies}
          />

          <ReviewItem
            label="Medical Conditions"
            value={values.medicalConditions}
          />
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="rounded-lg border p-5">
        <h3 className="mb-4 text-lg font-semibold">
          Emergency Contact
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <ReviewItem
            label="Name"
            value={values.emergencyContactName}
          />

          <ReviewItem
            label="Relationship"
            value={values.emergencyRelationship}
          />

          <ReviewItem
            label="Phone"
            value={values.emergencyContactPhone}
          />

          <ReviewItem
            label="Address"
            value={values.emergencyContactAddress}
          />
        </div>
      </div>

      <div className="rounded-lg bg-muted p-4 text-sm">
        Please verify all information before registering the patient.
      </div>
    </div>
  );
}

function ReviewItem({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="font-medium">
        {value || "-"}
      </p>
    </div>
  );
}