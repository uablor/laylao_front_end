import { DashboardResponse } from "../response/dashboard.response";

export interface IDashboardService {
  get_report(): Promise<DashboardResponse>;
}

