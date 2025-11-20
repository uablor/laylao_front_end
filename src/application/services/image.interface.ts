import {
  ImageApiResponse,
  ImageApiResponseList,
} from "../response/image.response";

export interface IImageService {
  create(credentials: any): Promise<ImageApiResponseList>;
  findAll(): Promise<ImageApiResponseList>;
  findOne(id: number): Promise<ImageApiResponse>;
    delete(id: number): Promise<ImageApiResponse>;
        createOne(image: any): Promise<ImageApiResponseList> 
}
