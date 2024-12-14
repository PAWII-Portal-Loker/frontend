import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useMainStore from "@hooks/main/store";

export const useIsNavbarActive = (href: string) => {
  const pathname = usePathname();
  return pathname.startsWith(href);
};

export const useHideNavbarOnScroll = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const { isNavigationOpen } = useMainStore();

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;

      if (isNavigationOpen) {
        setIsNavbarHidden(false);
        return;
      }

      if (isScrollingDown && !isNavbarHidden) {
        setIsNavbarHidden(true);
      } else if (!isScrollingDown && isNavbarHidden) {
        setIsNavbarHidden(false);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNavbarHidden, isNavigationOpen]);

  return isNavbarHidden;
};
