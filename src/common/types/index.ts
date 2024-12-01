export type APIResponse<T = void> = {
  status: boolean;
  status_code: number;
  message: string;
  errors: APIFieldError[];
  data: T;
  pagination?: Pagination;
};

export type FilterType = {
  order_by?: 'desc' | 'asc';
  sort?: string;
};

export type FetchCallback<T> = {
  onSuccess: (data: T) => void;
  onError: (errMessage: string) => void;
  onFullfilled?: () => void;
};

export type Pagination = {
  page: number;
  limit: number;
  total_pages: number;
  total_items: number;
};

export type NoPagination<T> = {
  data: T;
};

export type WithPagination<T> = {
  data: T;
  pagination: Pagination;
};

export type APIResponseWithPagination<T> = APIResponse<T> & {
  pagination: Pagination;
};

export type FilterParams = {
  params: {
    [key: string]: string | number;
  };
};

export type APIFieldError = {
  field: string;
  message: string;
};

export type CommonParams = {
  limit: number;
  page: number;
  order_by: 'created_at' | 'updated_at';
  sort: 'desc' | 'asc';
};
