import { ApiResponse } from "@/shared/types";
import { LoginCredentialsDto } from "../../application/dto/login.dto";
import { AuthTokenApiResponse, LoginApiResponse } from "../../application/response/login.response";
import { UserApiResponse } from "@/application/response/user.response";

export interface IAuthRepository {
  login(credentials: LoginCredentialsDto): Promise<ApiResponse<LoginApiResponse>>; // Promise<LoginApiResponse>;
  logout(token: string): Promise<void>;
  refreshToken(): Promise<ApiResponse<AuthTokenApiResponse>>;
  getCurrentUser(token: string): Promise<any>;
  authme(token: string): Promise<any>;
    authme(): Promise<UserApiResponse>;
}
