import { ApiClient } from "../apis/api";
import {
  CreateUserCredentialsDto,
  ResetPasswordCredentialsDto,
  UpdateUserCredentialsDto,
} from "@/application/dto/user.dto";
import {
  UserApiResponse,
  UserApiResponseList,
  UserListApiResponse,
} from "@/application/response/user.response";
import { API_ENDPOINTS } from "@/shared/constants";
import { User } from "@/domain/entities/user.entity";
import { PaginationParams } from "@/shared/types";
import { IUserRepository } from "@/domain/repositories/user.interface";
import { get_endpoint_path} from "@/shared/utils/get-endpoint-path";

export class UserRepositoryImpl implements IUserRepository {
  private apiClient: ApiClient;
  constructor() {
    this.apiClient = new ApiClient();
  }

  async create(
    credentials: CreateUserCredentialsDto
  ): Promise<UserApiResponse> {
    const response = await this.apiClient.post<User>(
      API_ENDPOINTS.USER.BASE,
      credentials
    );
    return response;
  }

  async update(
    id: number,
    credentials: UpdateUserCredentialsDto
  ): Promise<UserApiResponse> {
    const response = await this.apiClient.putOrPatch<User>(
      get_endpoint_path(API_ENDPOINTS.USER.BASE, id),
      credentials,
      "PATCH"
    );
    return response;
  }

  async delete(id: number): Promise<UserApiResponse> {
    const response = await this.apiClient.delete<User>(
     get_endpoint_path(API_ENDPOINTS.USER.BASE, id)
    );
    return response;
  }

  async findAll(): Promise<UserApiResponseList> {
    const response = await this.apiClient.get<User[]>(API_ENDPOINTS.USER.BASE);
    return response;
  }

  async findAllWithPagination(
    query: PaginationParams
  ): Promise<UserListApiResponse> {
    const response = await this.apiClient.getPaginated<User>(
      API_ENDPOINTS.USER.PAGINATION,
      query
    );
    return response;
  }

  async findOne(id: number): Promise<UserApiResponse> {
    const response = await this.apiClient.get<User>(
      `${API_ENDPOINTS.USER.BASE}/${id}`
    );
    return response;
  }

  async changePassword(id: number, credentials: ResetPasswordCredentialsDto): Promise<UserApiResponse> {
    const response = await this.apiClient.putOrPatch<User>(
      get_endpoint_path(API_ENDPOINTS.USER.RESET_PASSWORD, id),
      credentials,
      "PATCH"
    );
    return response;
  }
}

export const UserRepository = new UserRepositoryImpl();
