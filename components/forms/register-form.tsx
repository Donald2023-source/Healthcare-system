"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterSchema } from "@/lib/validations/auth";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import {
  Eye,
  EyeOff,
  Loader2,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { toast } from "@/components/ui/toast";

import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  async function nextStep() {
    let fields: any = [];

    if (step === 1) {
      fields = ["firstName", "lastName", "email", "phoneNumber", "password"];
    }

    if (step === 2) {
      fields = [
        "gender",
        "dateOfBirth",
        "bloodGroup",
        "genotype",
        "maritalStatus",
      ];
    }

    const valid = await trigger(fields);

    if (valid) setStep(step + 1);
  }

  async function onSubmit(data: RegisterSchema) {
    console.log(data);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result);
      toast.add({
        title: "Error",
        description: result.message,
      });

      return;
    }

    toast.add({
      title: "Success",
      description: "Patient account created",
    });

    router.push("/login");
  }

  return (
    <Card className="mx-auto w-full max-w-xl shadow-xl">
      <CardHeader>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Patient Registration</h1>

          <p className="text-sm text-muted-foreground">Step {step}/3</p>
        </div>

        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i <= step ? "bg-primary" : "bg-muted"
              }`}
            ></div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {step === 1 && (
            <>
              <Field label="First Name" error={errors.firstName?.message}>
                <Input {...register("firstName")} />
              </Field>

              <Field label="Last Name" error={errors.lastName?.message}>
                <Input {...register("lastName")} />
              </Field>

              <Field label="Email" error={errors.email?.message}>
                <Input type="email" {...register("email")} />
              </Field>

              <Field label="Phone Number" error={errors.phoneNumber?.message}>
                <Input
                  placeholder="+2348012345678"
                  {...register("phoneNumber")}
                />
              </Field>

              <Field label="Password" error={errors.password?.message}>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <Field label="Gender">
                <select
                  className="border rounded-md p-2 w-full"
                  {...register("gender")}
                >
                  <option value="">Select gender</option>

                  <option value="MALE">Male</option>

                  <option value="FEMALE">Female</option>
                </select>
              </Field>

              <Field label="Date of Birth">
                <Input type="date" {...register("dateOfBirth")} />
              </Field>

              <Field label="Blood Group">
                <Input placeholder="O+" {...register("bloodGroup")} />
              </Field>

              <Field label="Genotype">
                <Input placeholder="AA" {...register("genotype")} />
              </Field>

              <Field label="Marital Status">
                <Input placeholder="Single" {...register("maritalStatus")} />
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <Field label="Address">
                <textarea
                  className="border rounded-md p-3 w-full"
                  rows={4}
                  {...register("address")}
                />
              </Field>

              <Field label="Emergency Contact Name">
                <Input {...register("emergencyContactName")} />
              </Field>

              <Field label="Emergency Contact Phone">
                <Input {...register("emergencyContactPhone")} />
              </Field>
            </>
          )}

          <div className="flex justify-between pt-5">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                <ChevronLeft size={18} />
                Back
              </Button>
            )}

            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ChevronRight size={18} />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check />
                    Create Account
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({ label, children, error }: any) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {children}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
