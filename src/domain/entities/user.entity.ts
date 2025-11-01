import { BaseEntity } from "@/shared/types";
import { Role } from "./role.entity";

export interface User extends BaseEntity {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  roles: Role[];
  is_active: boolean;
  hotels?: any[];
}

export interface User_Password
  extends Omit<
      User,
      "createdAt" | "updatedAt" | "roles" | "hotels" | "is_active"
    >,
    User {
  password: string;
}
