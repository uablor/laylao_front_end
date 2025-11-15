// src/application/services/zone.interface.ts
import { PaginationParams } from "@/shared/types";
import { CreateZoneCredentialsDto, UpdateZoneCredentialsDto } from "@/application/dto/zone.dto";
import { ZoneApiResponse, ZoneApiResponseList, ZoneListApiResponse } from "@/application/response/zone.response";

export interface IZoneRepository {
  create(credentials: CreateZoneCredentialsDto): Promise<ZoneApiResponse>;
  update(credentials: UpdateZoneCredentialsDto): Promise<ZoneApiResponse>;
  findall(): Promise<ZoneApiResponseList>;
  findAllWithPagination(query: PaginationParams): Promise<ZoneListApiResponse>; // paginated
  findOne(id: number): Promise<ZoneApiResponse>;
}
