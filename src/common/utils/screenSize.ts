import { useMediaQuery } from "@chakra-ui/react";

export const useScreenSize = () => {
  const [isXs] = useMediaQuery(["(min-width: 30em)"], { ssr: true, fallback: [false] }); 
  const [isSm] = useMediaQuery(["(min-width: 36em)"], { ssr: true, fallback: [false] }); 
  const [isMd] = useMediaQuery(["(min-width: 48em)"], { ssr: true, fallback: [false] }); 
  const [isLg] = useMediaQuery(["(min-width: 62em)"], { ssr: true, fallback: [false] }); 
  const [isXl] = useMediaQuery(["(min-width: 80em)"], { ssr: true, fallback: [false] }); 
  const [is2xl] = useMediaQuery(["(min-width: 96em)"], { ssr: true, fallback: [false] }); 

  return { isXs, isSm, isMd, isLg, isXl, is2xl };
};