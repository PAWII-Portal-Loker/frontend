import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useIsNavbarActive = (href: string) => {
  const pathname = usePathname();
  return pathname.startsWith(href);
};

export const useHideNavbarOnScroll = () => {
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;

      if (isScrollingDown && !isNavbarHidden) {
        setIsNavbarHidden(true);
      } else if (!isScrollingDown && isNavbarHidden) {
        setIsNavbarHidden(false);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNavbarHidden]);

  return isNavbarHidden;
};
