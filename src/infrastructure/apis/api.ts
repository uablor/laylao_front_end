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
    console.log(response);
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

async uploadLogo<T>(endpoint: string, images: File[]): Promise<T> {
  const formData = new FormData();
  for (const image of images) {
    formData.append("images", image);
  }
  const response = await api.post<T>(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
}
