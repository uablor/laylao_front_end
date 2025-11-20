// src/application/repositories/hotel.repository.ts
import { ApiClient } from "../apis/api";
// import {
//   CreateHotelCredentialsDto,
//   UpdateHotelCredentialsDto,
// } from "@/application/dto/hotel.dto";
import {
  HotelApiResponse,
  HotelApiResponseList,
  HotelApiResponseSummary,
  HotelListApiResponse,
} from "@/application/response/hotel.response";
import { API_ENDPOINTS } from "@/shared/constants";
import {
  Hotel,
  HotelPaginationParams,
  HotelSummary,
} from "@/domain/entities/hotel.entity";
import { IHotelRepository } from "@/domain/repositories/hotel.interface";
import { get_endpoint_path } from "@/shared/utils/get-endpoint-path";

export class HotelRepositoryImpl implements IHotelRepository {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }

  async create(credentials: any): Promise<HotelApiResponse> {
    const response =
      await this.apiClient.PostOrPutOrPatch_MultipartFormData<Hotel>(
        API_ENDPOINTS.HOTEL.BASE,
        credentials
      );
    return response;
  }

  async update(
    id: number,
    credentials: FormData
  ): Promise<HotelApiResponse> {
    const response =
      await this.apiClient.PostOrPutOrPatch_MultipartFormData<Hotel>(
        get_endpoint_path(API_ENDPOINTS.HOTEL.BASE, id),
        credentials,
        "PATCH"
      );
    return response;
  }

  async delete(id: number): Promise<HotelApiResponse> {
    const response = await this.apiClient.delete<Hotel>(
      get_endpoint_path(API_ENDPOINTS.HOTEL.BASE, id)
    );
    return response;
  }

  async findall(): Promise<HotelApiResponseList> {
    const response = await this.apiClient.get<Hotel[]>(
      API_ENDPOINTS.HOTEL.BASE
    );
    return response;
  }
  async findallWithPagination(
    query: HotelPaginationParams
  ): Promise<HotelListApiResponse> {
    const response = await this.apiClient.getPaginated<Hotel>(
      API_ENDPOINTS.HOTEL.PAGINATION,
      query
    );
    return response;
  }

  async findOne(id: number): Promise<HotelApiResponse> {
    const response = await this.apiClient.get<Hotel>(
      get_endpoint_path(API_ENDPOINTS.HOTEL.BASE, id)
    );
    return response;
  }
  async findOneHotelDetails(id?: number): Promise<HotelApiResponseSummary> {
    const response = await this.apiClient.get_params<HotelSummary>(
      `${API_ENDPOINTS.HOTEL.DETAILS}`,
      { id: id }
    );
    return response;
  }

  // async uploadLogo(images: File[]): Promise<uploadLogo> {
  //   const response = await this.apiClient.uploadLogo<uploadLogo>(
  //     API_ENDPOINTS.HOTEL.UPLOAD_LOGO,
  //     images
  //   );
  //   return response;
  // }
}

export const HotelRepository = new HotelRepositoryImpl();
