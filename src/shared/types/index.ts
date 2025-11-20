export interface ApiResponse<T> {
  result: T;
  message: string;
  status_code: number;
}

export interface ApiResponseError {
  message: string;
  statusCode: number;
  error: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  search_field?: string;
  type?: string;
  sort?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type TimeRange = {
  startTime: string;
  endTime: string;
};

export interface BaseEntity {
  createdAt: string;
  updatedAt: string;
}
