
import { Images } from "@/domain/entities/image.entity";
import { ApiResponse} from "@/shared/types";

export interface ImageApiResponse extends ApiResponse<Images> {
}

export interface ImageApiResponseList extends ApiResponse<Images[]> {
}