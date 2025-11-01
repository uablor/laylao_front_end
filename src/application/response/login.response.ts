import type { User } from "../../domain/entities/user.entity";

export interface LoginApiResponse {
  user: User;
  access_token: string;
}

export interface AuthTokenApiResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}
