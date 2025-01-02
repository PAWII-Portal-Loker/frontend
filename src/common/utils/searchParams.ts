export const extractQueryParams = (
  searchParams: URLSearchParams
): { [key: string]: string | number | boolean } => {
  const params: { [key: string]: string | number | boolean } = {};

  searchParams.forEach((value, key) => {
    if (key === "page" || key === "limit") {
      params[key] = parseInt(value);
    } else if (
      key === "ownedByMe" ||
      key === "isClosed" ||
      key === "ownedByMe"
    ) {
      params[key] = value === "true";
    } else {
      params[key] = value;
    }
  });

  return params;
};
