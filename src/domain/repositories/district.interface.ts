// src/domain/repositories/district.interface.ts
import {
  CreateDistrictCredentialsDto,
  UpdateDistrictCredentialsDto,
} from "@/application/dto/district.dto";
import { DistrictApiResponse, DistrictListApiResponse } from "@/application/response/district.response";
import { PaginationParams } from "@/shared/types";

export interface IDistrictRepository {
  create(credentials: CreateDistrictCredentialsDto): Promise<DistrictApiResponse>;
  update(credentials: UpdateDistrictCredentialsDto): Promise<DistrictApiResponse>;
  delete(id: number): Promise<DistrictApiResponse>;
  findall(query?: PaginationParams): Promise<DistrictListApiResponse>; // paginated
  findOne(id: number): Promise<DistrictApiResponse>;
}
