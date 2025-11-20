import { BaseEntity } from "@/shared/types";
import { Role } from "./role.entity";
import { Hotel } from "./hotel.entity";

export interface User extends BaseEntity {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  roles: Role[];
  hotels: Hotel[]
  is_active: boolean;
}

export interface User_Password
  extends Omit<
    User,
    "createdAt" | "updatedAt" | "roles" | "hotels" | "is_active" | "createdAt" | "updatedAt"
  >
  {
    password: string;
  }

export interface RolePayload {
  id: number;
  name: string;
}
export interface HotelPayload {
  id: number;
  name: string;
  logo: string;
}

export interface AuthPayload {
  id: number;
  email: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  hotels: HotelPayload[];
  roles: RolePayload[];
  iat?: number;
  exp?: number;
}