import { IDashboardRepository } from "@/domain/repositories/dashboard.interface";
import { ApiClient } from "../apis/api";
import { DashboardResponse } from "@/application/response/dashboard.response";
import { DashboardData } from "@/domain/entities/report.entity";
import { API_ENDPOINTS } from "@/shared/constants";


export class IDashboardRepositoryImpl implements IDashboardRepository {
    private apiClient: ApiClient;
    constructor() {
      this.apiClient = new ApiClient();
    }
  async get_report(): Promise<DashboardResponse> {
    return this.apiClient.post<DashboardData>(API_ENDPOINTS.REPORT.ALL, {});
  }
}

export const DashboardRepository = new IDashboardRepositoryImpl();