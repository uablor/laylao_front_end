import { DashboardResponse } from "@/application/response/dashboard.response";

export interface IDashboardRepository {
    get_report(): Promise<DashboardResponse>;
}