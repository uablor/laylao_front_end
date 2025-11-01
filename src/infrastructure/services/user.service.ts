import { IUserService } from "@/application/services/user.interface";
import { UserRepository } from "../repositories/user.repository";
import {
  CreateUserCredentialsDto,
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

  async update(credentials: UpdateUserCredentialsDto): Promise<UserApiResponse> {
    return this.userRepo.update(credentials);
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
}

export const UserService = new UserServiceImpl();
