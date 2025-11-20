import { District } from "./district.entity";

export interface Province {
  id: number;
  name: string;
  district: District
}