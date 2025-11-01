// src/application/services/zone.interface.ts
import { PaginationParams } from "@/shared/types";
import {
  CreateZoneCredentialsDto,
  UpdateZoneCredentialsDto,
} from "../dto/zone.dto";
import { ZoneApiResponse, ZoneApiResponseList, ZoneListApiResponse } from "../response/zone.response";

export interface IZoneService {
  create(credentials: CreateZoneCredentialsDto): Promise<ZoneApiResponse>;
  update(credentials: UpdateZoneCredentialsDto): Promise<ZoneApiResponse>;
  delete(id: number): Promise<ZoneApiResponse>;
  findall(): Promise<ZoneApiResponseList>; // paginated
  findAllWithPagination(query: PaginationParams): Promise<ZoneListApiResponse>; // paginated
  findOne(id: number): Promise<ZoneApiResponse>;
}
