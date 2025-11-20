import { ApiClient } from "../apis/api";
import type { IAuthRepository } from "../../domain/repositories/auth.interface";
import {
  AuthTokenApiResponse,
  LoginApiResponse,
} from "../../application/response/login.response";
import { LoginCredentialsDto } from "../../application/dto/login.dto";
import { API_ENDPOINTS } from "../../shared/constants";
import { ApiResponse } from "@/shared/types";
import { UserApiResponse } from "@/application/response/user.response";
import { User } from "@/domain/entities/user.entity";

export class AuthRepositoryImpl implements IAuthRepository {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }
  async login(credentials: LoginCredentialsDto): Promise<ApiResponse<LoginApiResponse>> {
    const response = await this.apiClient.post<LoginApiResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response;
  }
  async authme(): Promise<UserApiResponse> {
    return await this.apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
  }

  async logout(): Promise<void> {
    try {
      await this.apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {});
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  async refreshToken(): Promise<ApiResponse<AuthTokenApiResponse>> {
    try {
      const response = await this.apiClient.post<AuthTokenApiResponse>(
        "/auth/refresh",
        {}
      );
      return response;
    } catch (error) {
      throw new Error("Token refresh failed");
    }
  }

  async getCurrentUser(): Promise<any> {
    try {
      const response = await this.apiClient.get("/auth/me");
      return response;
    } catch (error) {
      throw new Error("Failed to get current user");
    }
  }
}
