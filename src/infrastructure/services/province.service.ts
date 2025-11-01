// src/application/services/province.service.ts
import { IProvinceService } from "@/application/services/province.interface";
import { CreateProvinceCredentialsDto, UpdateProvinceCredentialsDto } from "@/application/dto/province.dto";
import { ProvinceApiResponse, ProvinceListApiResponse } from "@/application/response/province.response";
import { PaginationParams } from "@/shared/types";
import { ProvinceRepository} from "../repositories/province.repository";

export class ProvinceServiceImpl implements IProvinceService {
    private repo = ProvinceRepository;

  create(dto: CreateProvinceCredentialsDto): Promise<ProvinceApiResponse> {
    return this.repo.create(dto);
  }
  update(dto: UpdateProvinceCredentialsDto): Promise<ProvinceApiResponse> {
    return this.repo.update(dto);
  }
  delete(id: number): Promise<ProvinceApiResponse> {
    return this.repo.delete(id);
  }
  findall(query: PaginationParams): Promise<ProvinceListApiResponse> {
    return this.repo.findall(query);
  }
  findOne(id: number): Promise<ProvinceApiResponse> {
    return this.repo.findOne(id);
  }
}

export const ProvinceService = new ProvinceServiceImpl();
