// src/application/dto/province.dto.ts
import { Province } from "@/domain/entities/province.entity";

export interface CreateProvinceCredentialsDto extends Omit<Province, "id"> {}
export interface UpdateProvinceCredentialsDto extends CreateProvinceCredentialsDto {}
export interface DeleteProvinceCredentialsDto extends Pick<Province, "id"> {}
export interface GetProvinceCredentialsDto extends Pick<Province, "id"> {}
export interface GetProvinceListCredentialsDto extends Province {}