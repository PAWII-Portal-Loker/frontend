import { usePathname } from "next/navigation";

export const useIsNotHomePage = () => {
  const pathname = usePathname();
  return pathname !== "/";
};
