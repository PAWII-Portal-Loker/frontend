export const isValidImageUrl = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://");
};
