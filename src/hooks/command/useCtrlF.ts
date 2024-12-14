import useDashboardStore from "@hooks/dashboard/store";
import { useEffect } from "react";

export const useCtrlF = () => {
  const { setSearchFocused } = useDashboardStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "f") {
        event.preventDefault();
        setSearchFocused(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
};
