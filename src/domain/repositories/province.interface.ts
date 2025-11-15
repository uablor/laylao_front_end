// src/domain/repositories/province.interface.ts
import { PaginationParams } from "@/shared/types";
import { CreateProvinceCredentialsDto, UpdateProvinceCredentialsDto } from "@/application/dto/province.dto";
import { ProvinceApiResponse, ProvinceListApiResponse } from "@/application/response/province.response";

export interface IProvinceRepository {
  create(credentials: CreateProvinceCredentialsDto): Promise<ProvinceApiResponse>;
  update(credentials: UpdateProvinceCredentialsDto): Promise<ProvinceApiResponse>;
  delete(id: number): Promise<ProvinceApiResponse>;
  findall(query?: PaginationParams): Promise<ProvinceListApiResponse>;
  findOne(id: number): Promise<ProvinceApiResponse>;
}