import {
  ImageApiResponse,
  ImageApiResponseList,
} from "@/application/response/image.response";
import { ApiClient } from "../apis/api";
import { API_ENDPOINTS } from "@/shared/constants";
import { Images } from "@/domain/entities/image.entity";
import { IImageRepository } from "@/domain/repositories/imags.interface";

export class ImageRepositoryImpl implements IImageRepository {
  private apiClient: ApiClient;

  constructor() {
    this.apiClient = new ApiClient();
  }
  async findAll(): Promise<ImageApiResponseList> {
    const response = await this.apiClient.get<Images[]>(
      API_ENDPOINTS.IMAGE.BASE
    );
    return response;
  }

  async findOne(id: number): Promise<ImageApiResponse> {
    const response = await this.apiClient.get<Images>(
      `${API_ENDPOINTS.IMAGE.BASE}/${id}`
    );
    return response;
  }

  async delete(id: number): Promise<ImageApiResponse> {
    const response = await this.apiClient.delete<Images>(
      `${API_ENDPOINTS.IMAGE.BASE}/${id}`
    );
    return response;
  }

  async create(image: any): Promise<ImageApiResponseList> {
    const response = await this.apiClient.PostOrPutOrPatch_MultipartFormData<Images[]>(
      API_ENDPOINTS.IMAGE.BASE,
      image,
      "POST"
    );
    return response;
  }
  async createOne(image: any): Promise<ImageApiResponseList> {
    const response = await this.apiClient.PostOrPutOrPatch_MultipartFormData<Images[]>(
      API_ENDPOINTS.IMAGE.BASE,
      image,
      "POST"
    );
    return response;
  }
}

export const imageRepository = new ImageRepositoryImpl();
