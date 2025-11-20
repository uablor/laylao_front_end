// src/application/response/zone.response.ts
import { Zone } from "@/domain/entities/zone.entity";
import { ApiResponse, PaginatedResponse } from "@/shared/types";

export interface ZoneApiResponse extends ApiResponse<Zone> {}
export interface ZoneApiResponseList extends ApiResponse<Zone[]> {}

export interface ZoneListApiResponse extends PaginatedResponse<Zone> {}
