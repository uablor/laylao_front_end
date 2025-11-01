
import { Images } from "@/domain/entities/image.entity";
import { ApiResponse, PaginatedResponse } from "@/shared/types";

export interface HotelApiResponse extends ApiResponse<Images> {
}

export interface HotelListApiResponse extends PaginatedResponse<Images> {
}