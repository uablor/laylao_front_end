import {
  ImageApiResponse,
  ImageApiResponseList,
} from "@/application/response/image.response";
import { IImageService } from "@/application/services/image.interface";
import { imageRepository } from "../repositories/image.repository";

export class IImageServiceImpl implements IImageService {
  private repo = imageRepository;

  constructor() {}
  async findAll(): Promise<ImageApiResponseList> {
    const response = await this.repo.findAll();
    return response;
  }

  async findOne(id: number): Promise<ImageApiResponse> {
    const response = await this.repo.findOne(id);
    return response;
  }

  async delete(id: number): Promise<ImageApiResponse> {
    const response = await this.repo.delete(id);
    return response;
  }

  async create(image: any): Promise<ImageApiResponseList> {
    const response = await this.repo.create(image);
    return response;
  }

  async createOne(image: any): Promise<ImageApiResponseList> {
    const response = await this.repo.createOne(image);
    return response;
  }
}

export const ImageService = new IImageServiceImpl();
