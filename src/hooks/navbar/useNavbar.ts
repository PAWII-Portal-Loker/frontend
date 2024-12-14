import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useMainStore from "@hooks/main/store";

export const useIsNavbarActive = (href: string) => {
  const pathname = usePathname();
  return pathname.startsWith(href);
};

export const useHideNavbarOnScroll = () => {
  const [isNavbarHidden, setNavbarHidden] = useState(false);
  const { isNavigationOpen } = useMainStore();

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;

      if (isNavigationOpen) {
        setNavbarHidden(false);
        return;
      }

      if (isScrollingDown && !isNavbarHidden) {
        setNavbarHidden(true);
      } else if (!isScrollingDown && isNavbarHidden) {
        setNavbarHidden(false);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNavbarHidden, isNavigationOpen]);

  return isNavbarHidden;
};
