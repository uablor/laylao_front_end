// src/application/response/province.response.ts
import { Province } from "@/domain/entities/province.entity";
import { ApiResponse, PaginatedResponse } from "@/shared/types";

export interface ProvinceApiResponse extends ApiResponse<Province> {}
export interface ProvinceListApiResponse extends PaginatedResponse<Province> {}