import { Images } from "@/domain/entities/image.entity";


export interface CreateImagesCredentialsDto extends Omit<Images, 'id' | 'created_At' | 'updated_At'> {}

export interface DeleteImagesCredentialsDto extends  Pick<Images, 'id'> {}
