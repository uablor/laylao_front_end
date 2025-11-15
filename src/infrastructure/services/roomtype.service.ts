import { IRoomTypeService } from "@/application/services/roomtype.interface";
import { RoomTypeRepository } from "../repositories/roomtype.repository";
// import {
//   CreateRoomTypeCredentialsDto,
//   UpdateRoomTypeCredentialsDto,
// } from "@/application/dto/roomtype.dto";
import {
  RoomTypeApiResponse,
  RoomTypeApiResponselist,
  RoomTypeListApiResponse,
} from "@/application/response/roomtype.response";
import { RoomTypePaginationParams } from "@/domain/entities/roomtype.entity";

export class RoomTypeServiceImpl implements IRoomTypeService {
  private roomTypeRepo = RoomTypeRepository;

  async create(
    credentials: FormData
  ): Promise<RoomTypeApiResponse> {
    return this.roomTypeRepo.create(credentials);
  }

  async update(
    id: number,
    credentials: FormData
  ): Promise<RoomTypeApiResponse> {
    return this.roomTypeRepo.update(id,credentials);
  }

  async delete(id: number): Promise<RoomTypeApiResponse> {
    return this.roomTypeRepo.delete(id);
  }

  async findall(id?: number): Promise<RoomTypeApiResponselist> {
    return this.roomTypeRepo.findall(id);
  }
  async findallWithPagination(
    query: RoomTypePaginationParams
  ): Promise<RoomTypeListApiResponse> {
    return this.roomTypeRepo.findallWithPagination(query);
  }

  async findOne(id: number): Promise<RoomTypeApiResponse> {
    return this.roomTypeRepo.findOne(id);
  }
}

export const RoomTypeService = new RoomTypeServiceImpl();
