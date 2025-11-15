// src/application/services/district.service.ts
import { IDistrictService } from '@/application/services/district.interface';
import { DistrictRepository } from '../repositories/district.repository';
import { CreateDistrictCredentialsDto, UpdateDistrictCredentialsDto } from '@/application/dto/district.dto';
import { DistrictApiResponse, DistrictListApiResponse } from '@/application/response/district.response';
import { PaginationParams } from '@/shared/types';

export class DistrictServiceImpl implements IDistrictService {
  private districtRepo = DistrictRepository;

  async create(credentials: CreateDistrictCredentialsDto): Promise<DistrictApiResponse> {
    return this.districtRepo.create(credentials);
  }

  async update(credentials: UpdateDistrictCredentialsDto): Promise<DistrictApiResponse> {
    return this.districtRepo.update(credentials);
  }

  async delete(id: number): Promise<DistrictApiResponse> {
    return this.districtRepo.delete(id);
  }

  async findall(query: PaginationParams, provinceId?: string): Promise<DistrictListApiResponse> {
    return this.districtRepo.findall(query, provinceId);
  }

  async findOne(id: number): Promise<DistrictApiResponse> {
    return this.districtRepo.findOne(id);
  }
}

export const DistrictService = new DistrictServiceImpl();
