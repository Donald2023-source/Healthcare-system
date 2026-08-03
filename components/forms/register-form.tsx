"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, RegisterSchema } from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterSchema) {
    console.log(data);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.status === 201) {
        toast.add({
          title: result.message,
          type: "success",
        });
      } else {
         toast.add({
          title: result.message,
          type: "error",
        });
      }
      console.log(result);
    } catch (err) {
      console.log("Something went wrong", err);
        toast.add({
          title: result.message,
          type: "error",
        });
    }
  }

  return (
    <Card>
      <CardHeader className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="text-muted-foreground">Register to book appointments</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label>Full Name</Label>
            <Input
              className="rounded-sm mt-2"
              {...register("fullName")}
              placeholder="John Doe"
            />
            <p className="text-sm text-red-500">{errors.fullName?.message}</p>
          </div>

          <div>
            <Label>Email</Label>
            <Input
              className="rounded-sm mt-2"
              {...register("email")}
              placeholder="john@example.com"
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>

          <div>
            <Label>Phone Number</Label>

            <div className="relative">
              <Input
                className="rounded-sm mt-2"
                type={"tel"}
                placeholder="+2348149384729"
                {...register("phoneNumber")}
              />
            </div>

            <p className="text-sm text-red-500">
              {errors.phoneNumber?.message}
            </p>
          </div>

          <div>
            <Label>Password</Label>

            <div className="relative">
              <Input
                className="rounded-sm mt-2"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />

              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="text-sm text-red-500">{errors.password?.message}</p>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </Button>

          <div className="text-center">
            <Link href="/login" className="text-primary">
              Already have an account?
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
