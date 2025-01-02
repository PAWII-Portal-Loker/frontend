"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useJobTypestore } from "@enums/stores/jobType";
import { useIncomeTypestore } from "@enums/stores/incomeType";
import { useCtrlF } from "@hooks/command/useCtrlF";
import { fadeVariants } from "@consts/animationVariants";
import { hasPermission } from "@utils/permissions";
import CompanyDashboard from "@components/layouts/companyDashboard";
import JobSeekerDashboard from "@components/layouts/jobSeekerDashboard";
import useAuthStore from "@auth/store";

const Home = () => {
  const { auth } = useAuthStore();
  const { getJobTypes } = useJobTypestore();
  const { getIncomeTypes } = useIncomeTypestore();

  useCtrlF();

  useEffect(() => {
    getJobTypes();
    getIncomeTypes();
  }, []);

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
      {hasPermission(auth, "companyDashboard", "view") ? (
        <CompanyDashboard />
      ) : (
        <JobSeekerDashboard />
      )}
    </motion.div>
  );
};

export default Home;
