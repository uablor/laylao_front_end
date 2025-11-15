import { Hotel, HotelSummary } from "@/domain/entities/hotel.entity";
import { ApiResponse, PaginatedResponse } from "@/shared/types";

export interface HotelApiResponse extends ApiResponse<Hotel> {}
export interface HotelApiResponseList extends ApiResponse<Hotel[]> {}
export interface HotelApiResponseSummary extends ApiResponse<HotelSummary> {}

export interface HotelListApiResponse extends PaginatedResponse<Hotel> {}

export interface uploadLogo {
    urls : string
}
