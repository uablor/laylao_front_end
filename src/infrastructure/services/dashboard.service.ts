import { DashboardResponse } from "@/application/response/dashboard.response";
import { IDashboardService } from "../../application/services/dashboard.interface";
import { DashboardRepository } from "../repositories/dashboard.repository";
export class DashboardServiceImpl implements IDashboardService {
  private readonly repository = DashboardRepository;
  async get_report(): Promise<DashboardResponse> {
    return await this.repository.get_report();
  }
}

export const DashboardService = new DashboardServiceImpl();
