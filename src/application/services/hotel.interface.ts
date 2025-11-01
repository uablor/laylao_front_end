
import { CreateHotelCredentialsDto, UpdateHotelCredentialsDto } from "../dto/hotel.dto";
import {
  HotelApiResponse,
  HotelApiResponseList,
  HotelApiResponseSummary,
  HotelListApiResponse,
  // uploadLogo,
} from "../response/hotel.response";
import { HotelPaginationParams } from "@/domain/entities/hotel.entity";

export interface IHotelService {
  create(credentials: CreateHotelCredentialsDto): Promise<HotelApiResponse>;
  update(credentials: UpdateHotelCredentialsDto): Promise<HotelApiResponse>;
  delete(id: number): Promise<HotelApiResponse>;
  findall(): Promise<HotelApiResponseList>;
  findallWithPagination(query: HotelPaginationParams): Promise<HotelListApiResponse>;
  findOne(id: number): Promise<HotelApiResponse>;
  findOneHotelDetails(id: number): Promise<HotelApiResponseSummary>;
  // uploadLogo(urls: string): Promise<uploadLogo>;
}
