import { IAuthService } from "../../application/services/auth.interface";
import type { IAuthRepository } from "../../domain/repositories/auth.interface";
import { AuthRepositoryImpl } from "../repositories/auth.repository";
import { LoginCredentialsDto } from "../../application/dto/login.dto";
import { ApiResponse } from "../../shared/types/index";
import {
  AuthTokenApiResponse,
  LoginApiResponse,
} from "../../application/response/login.response";
import { UserApiResponse } from "@/application/response/user.response";

export class AuthServiceImpl implements IAuthService {
  private repository: IAuthRepository;
  private token: string | null = null;

  constructor(repository?: IAuthRepository) {
    this.repository = repository || new AuthRepositoryImpl();
  }

  async login(
    credentials: LoginCredentialsDto
  ): Promise<ApiResponse<LoginApiResponse>> {
    const response = await this.repository.login(credentials);
    this.token =
      response.status_code === 200 ? response.result.access_token : null;
    response.result.access_token
      ? localStorage.setItem("access_token", response.result.access_token)
      : null;
    localStorage.setItem(
      "roles",
      JSON.stringify(response.result.user.roles.map((r) => r.name))
    );

    return response;
  }
  async authme(): Promise<UserApiResponse> {
    return await this.repository.authme();
  }

  async logout(): Promise<void> {
    try {
      this.token = null;
      localStorage.removeItem("access_token");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.token = null;
      localStorage.removeItem("auth_token");
    }
  }

  async refreshToken(): Promise<AuthTokenApiResponse> {
    try {
      const response = await this.repository.refreshToken();
      const { access_token, refresh_token, expires_in } = response.result;

      this.token = access_token;
      localStorage.setItem("auth_token", access_token);

      return { access_token, refresh_token, expires_in };
    } catch (error) {
      throw new Error("Token refresh failed");
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const parts = token.split(".");
      if (parts.length !== 3) return false;

      const payload = parts[1] ? JSON.parse(atob(parts[1])) : null;
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  async getCurrentUser(): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) throw new Error("No token found");

      return await this.repository.getCurrentUser(token);
    } catch (error) {
      throw new Error("Failed to get current user");
    }
  }

  public getToken(): string | null {
    if (this.token) return this.token;

    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      this.token = storedToken;
      return storedToken;
    }

    return null;
  }
}

export const authService = new AuthServiceImpl();
