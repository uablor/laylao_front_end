import { IUserService } from "@/application/services/user.interface";
import { UserRepository } from "../repositories/user.repository";
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
import { PaginationParams } from "@/shared/types";

export class UserServiceImpl implements IUserService {
  private userRepo = UserRepository;

  async create(credentials: CreateUserCredentialsDto): Promise<UserApiResponse> {
    return this.userRepo.create(credentials);
  }

  async update(id: number,credentials: UpdateUserCredentialsDto): Promise<UserApiResponse> {
    return this.userRepo.update(id,credentials);
  }

  async delete(id: number): Promise<UserApiResponse> {
    return this.userRepo.delete(id);
  }

  async findAll(): Promise<UserApiResponseList> {
    return this.userRepo.findAll();
  }
  async findAllWithPagination(query: PaginationParams): Promise<UserListApiResponse> {
    return this.userRepo.findAllWithPagination(query);
  }

  async findOne(id: number): Promise<UserApiResponse> {
    return this.userRepo.findOne(id);
  }

  async changePassword(id: number, credentials: ResetPasswordCredentialsDto): Promise<UserApiResponse> {
    return this.userRepo.changePassword(id, credentials);
  }
}

export const UserService = new UserServiceImpl();
