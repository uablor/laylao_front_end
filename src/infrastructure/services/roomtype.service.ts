import { IRoomTypeService } from "@/application/services/roomtype.interface";
import { PaginationParams } from "@/shared/types";
import { RoomTypeRepository } from "../repositories/roomtype.repository";
import {
  CreateRoomTypeCredentialsDto,
  UpdateRoomTypeCredentialsDto,
} from "@/application/dto/roomtype.dto";
import {
  RoomTypeApiResponse,
  RoomTypeApiResponselist,
  RoomTypeListApiResponse,
} from "@/application/response/roomtype.response";

export class RoomTypeServiceImpl implements IRoomTypeService {
  private roomTypeRepo = RoomTypeRepository;

  async create(
    credentials: CreateRoomTypeCredentialsDto
  ): Promise<RoomTypeApiResponse> {
    return this.roomTypeRepo.create(credentials);
  }

  async update(
    credentials: UpdateRoomTypeCredentialsDto
  ): Promise<RoomTypeApiResponse> {
    return this.roomTypeRepo.update(credentials);
  }

  async delete(id: number): Promise<RoomTypeApiResponse> {
    return this.roomTypeRepo.delete(id);
  }

  async findall(): Promise<RoomTypeApiResponselist> {
    return this.roomTypeRepo.findall();
  }
  async findallWithPagination(
    query: PaginationParams
  ): Promise<RoomTypeListApiResponse> {
    return this.roomTypeRepo.findallWithPagination(query);
  }

  async findOne(id: number): Promise<RoomTypeApiResponse> {
    return this.roomTypeRepo.findOne(id);
  }
}

export const RoomTypeService = new RoomTypeServiceImpl();
