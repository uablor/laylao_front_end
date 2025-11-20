import { PaginationParams } from "@/shared/types";
import {
  CreateDistrictCredentialsDto,
  UpdateDistrictCredentialsDto,
} from "../dto/district.dto";
import {
  DistrictApiResponse,
  DistrictListApiResponse,
} from "../response/district.response";

export interface IDistrictService {
  create(credentials: CreateDistrictCredentialsDto): Promise<DistrictApiResponse>;
  update(credentials: UpdateDistrictCredentialsDto): Promise<DistrictApiResponse>;
  delete(id: number): Promise<DistrictApiResponse>;
  findall(query: PaginationParams): Promise<DistrictListApiResponse>; // paginated
  findOne(id: number): Promise<DistrictApiResponse>;
}
