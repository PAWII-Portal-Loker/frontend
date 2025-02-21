import { FieldValues } from "react-hook-form";
import { AnyObject, ISchema, Reference } from "yup";

export type APIFieldError = {
  field: string;
  message: string;
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

export type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type WithPagination<T> = {
  data: T;
  pagination: Pagination;
};

export type APIResponse<T = void> = {
  success: boolean;
  status_code: number;
  message: string;
  errors: APIFieldError[];
  data: T;
  pagination?: Pagination;
};

export type FilterType = {
  page: Pagination["page"];
  limit: Pagination["limit"];
  order: "desc" | "asc";
  sort: "createdAt" | "updatedAt";
};

export type FetchCallback<T> = {
  onSuccess: (data: T) => void;
  onError: (errMessage: string) => void;
  onFullfilled?: () => void;
};

export type APIResponseWithPagination<T> = APIResponse<T> & {
  pagination: Pagination;
};

export type FilterParams = {
  params: {
    [key: string]: string | number;
  };
};

export interface FieldConfig<T extends FieldValues> {
  name: keyof T;
  label: string;
  type: string;
  placeholder: string | undefined;
  rules:
    | Reference<unknown>
    | ISchema<
        string | string[] | number | Date | boolean | undefined | unknown,
        AnyObject
      >;
}
