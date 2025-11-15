import api from "../../common/axios.config";
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from "../../shared/types";

export class ApiClient {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await api.get<ApiResponse<T>>(endpoint);
    return response.data;
  }
  async get_params<T>(endpoint: string, params: any): Promise<ApiResponse<T>> {
    const response = await api.get<ApiResponse<T>>(endpoint, { params });
    return response.data;
  }

  async getPaginated<T>(
    endpoint: string,
    params: PaginationParams
  ): Promise<PaginatedResponse<T>> {
    const response = await api.get<PaginatedResponse<T>>(endpoint, { params });
    return response.data;
  }

  async post<T, U = unknown>(
    endpoint: string,
    data: U
  ): Promise<ApiResponse<T>> {
    const response = await api.post<ApiResponse<T>>(endpoint, data);
    return response.data;
  }

  async putOrPatch<T, U = unknown>(
    endpoint: string,
    data: U,
    method: "PUT" | "PATCH" = "PUT"
  ): Promise<ApiResponse<T>> {
    const response =
      method === "PUT"
        ? await api.put<ApiResponse<T>>(endpoint, data)
        : await api.patch<ApiResponse<T>>(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await api.delete<ApiResponse<T>>(endpoint);
    return response.data;
  }

  async PostOrPutOrPatch_MultipartFormData<T>(endpoint: string, data: any, method: "PUT" | "PATCH" | "POST" = "POST"): Promise<ApiResponse<T>> {
    const headers = { "Content-Type": "multipart/form-data" };
    const response = method === "POST" ?
      await api.post<ApiResponse<T>>(endpoint, data, { headers }) :
      method === "PUT" ?
        await api.put<ApiResponse<T>>(endpoint, data, { headers }) :
        await api.patch<ApiResponse<T>>(endpoint, data, { headers });
    return response.data as ApiResponse<T>;
  }
}
