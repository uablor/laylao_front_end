import { District } from "@/domain/entities/district.entity";
import { ApiResponse, PaginatedResponse } from "@/shared/types";

export interface DistrictApiResponse extends ApiResponse<District> {}

export interface DistrictListApiResponse extends PaginatedResponse<District> {}
