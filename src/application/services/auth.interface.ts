import { LoginCredentialsDto } from "../../application/dto/login.dto";
import { AuthTokenApiResponse, LoginApiResponse } from "../../application/response/login.response";
import { ApiResponse } from '../../shared/types/index';
import { UserApiResponse } from "../response/user.response";

export interface IAuthService {
  login(credentials: LoginCredentialsDto): Promise<ApiResponse<LoginApiResponse>>; // Promise<LoginApiResponse>;
  logout(token: string): Promise<void>;
  refreshToken(): Promise<AuthTokenApiResponse>;
  getCurrentUser(token: string): Promise<any>;
  authme(): Promise<UserApiResponse>;
}
