"use client";

import useDashboardStore from "@/hooks/dashboard/store";
import { useEffect } from "react";
import { useJobTypestore } from "@/contexts/enums/stores/jobType";
import { useIncomeTypestore } from "@/contexts/enums/stores/incomeType";
import { motion } from "framer-motion";
import { fadeVariants } from "@/common/types/animationVariants";
import useAuthStore from "@/contexts/auth/store";
import { hasPermission } from "@/common/utils/permissions";
import JobSeekerDashboard from "@/components/layouts/jobSeekerDashboard";
import CompanyDashboard from "@/components/layouts/companyDashboard";

const Home = () => {
  const { auth } = useAuthStore();
  const { setIsSearchFocused } = useDashboardStore();
  const { getJobTypes } = useJobTypestore();
  const { getIncomeTypes } = useIncomeTypestore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "f") {
        event.preventDefault();
        setIsSearchFocused(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsSearchFocused]);

  useEffect(() => {
    getJobTypes();
    getIncomeTypes();
  }, [getJobTypes, getIncomeTypes]);

  return (
    <motion.div
      className="flex min-h-screen flex-col items-center justify-center bg-slate-500 text-gray-100"
      style={{
        backgroundImage: "url('/hero.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
      }}
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {hasPermission(auth, "companyDashboard:view") ? (
        <CompanyDashboard />
      ) : (
        <JobSeekerDashboard />
      )}
    </motion.div>
  );
};

export default Home;
