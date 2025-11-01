// src/application/services/room.service.ts
import { IRoomService } from "@/application/services/room.interface";
import { PaginationParams } from "@/shared/types";
import { RoomRepository } from "../repositories/room.repository";
import {
  CreateRoomCredentialsDto,
  UpdateRoomCredentialsDto,
} from "@/application/dto/room.dto";
import {
  RoomApiResponse,
  RoomApiResponseList,
  RoomListApiResponse,
} from "@/application/response/room.response";

export class RoomServiceImpl implements IRoomService {
  private roomRepo = RoomRepository;

  async create(
    credentials: CreateRoomCredentialsDto
  ): Promise<RoomApiResponse> {
    return this.roomRepo.create(credentials);
  }

  async update(
    credentials: UpdateRoomCredentialsDto
  ): Promise<RoomApiResponse> {
    return this.roomRepo.update(credentials);
  }

  async delete(id: number): Promise<RoomApiResponse> {
    return this.roomRepo.delete(id);
  }

  async findall(): Promise<RoomApiResponseList> {
    return this.roomRepo.findall();
  }
  async findallWithPagination(
    query: PaginationParams
  ): Promise<RoomListApiResponse> {
    return this.roomRepo.findallWithPagination(query);
  }

  async findOne(id: number): Promise<RoomApiResponse> {
    return this.roomRepo.findOne(id);
  }
}

export const RoomService = new RoomServiceImpl();
