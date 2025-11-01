// src/application/dto/zone.dto.ts
import { Zone } from "@/domain/entities/zone.entity";

export interface CreateZoneCredentialsDto extends Omit<Zone, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UpdateZoneCredentialsDto extends Omit<Zone, 'createdAt' | 'updatedAt'> {
}

export interface DeleteZoneCredentialsDto extends Pick<Zone, 'id'> {}

export interface GetZoneCredentialsDto extends Pick<Zone, 'id'> {}

