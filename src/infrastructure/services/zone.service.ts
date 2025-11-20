import { IZoneService } from "@/application/services/zone.interface";
import { PaginationParams } from "@/shared/types";
import { ZoneRepository } from "../repositories/zone.repository";
import {
  ZoneApiResponse,
  ZoneApiResponseList,
  ZoneListApiResponse,
} from "@/application/response/zone.response";
import {
  CreateZoneCredentialsDto,
  UpdateZoneCredentialsDto,
} from "@/application/dto/zone.dto";

export class ZoneServiceImpl implements IZoneService {
  private zoneRepo = ZoneRepository;

  async create(
    credentials: CreateZoneCredentialsDto
  ): Promise<ZoneApiResponse> {
    return this.zoneRepo.create(credentials);
  }

  async update(
    credentials: UpdateZoneCredentialsDto
  ): Promise<ZoneApiResponse> {
    return this.zoneRepo.update(credentials);
  }

  async delete(id: number): Promise<ZoneApiResponse> {
    return this.zoneRepo.delete(id);
  }

  async findall(): Promise<ZoneApiResponseList> {
    return this.zoneRepo.findall();
  }
  async findAllWithPagination(
    query: PaginationParams
  ): Promise<ZoneListApiResponse> {
    return this.zoneRepo.findAllWithPagination(query);
  }

  async findOne(id: number): Promise<ZoneApiResponse> {
    return this.zoneRepo.findOne(id);
  }
}

export const ZoneService = new ZoneServiceImpl();
