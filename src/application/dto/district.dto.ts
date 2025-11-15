import { District } from "@/domain/entities/district.entity";

// src/application/dto/district.dto.ts
export interface CreateDistrictCredentialsDto extends Omit<District, 'id'> {}

export interface UpdateDistrictCredentialsDto extends CreateDistrictCredentialsDto {}

// export interface DeleteDistrictCredentialsDto extends Pick<District, 'id'> {}

// export interface GetDistrictCredentialsDto extends Pick<District, 'id'> {}

// export interface GetDistrictListCredentialsDto extends District {}
