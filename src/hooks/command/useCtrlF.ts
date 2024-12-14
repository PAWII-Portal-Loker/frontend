import useDashboardStore from "@hooks/dashboard/store";
import { useEffect } from "react";

export const useCtrlF = () => {
  const { setIsSearchFocused } = useDashboardStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "f") {
        event.preventDefault();
        setIsSearchFocused(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
};
