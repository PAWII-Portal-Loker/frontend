import { FilterParams } from "@types";
export const mapObjectToFilterParams = <
  T extends Record<string, string | number | boolean>
>(obj: T): FilterParams => {
  const params = Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === "string" && value !== "") {
      acc[key] = value;
    } else if (typeof value === "number") {
      acc[key] = value;
    } else if (typeof value === "boolean") {
      acc[key] = value.toString();
    }
    return acc;
  }, {} as FilterParams["params"]);

  return { params };
};
