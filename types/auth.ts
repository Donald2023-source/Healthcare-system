import { UserRole } from "@/models/User";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}