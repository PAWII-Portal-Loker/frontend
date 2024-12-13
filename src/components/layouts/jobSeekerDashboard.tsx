import { scaleVariants, slideVariants } from "@/common/types/animationVariants";
import { Input } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaKey } from "react-icons/fa";
import Dropdown from "../containers/dropdown";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useDashboardStore from "@/hooks/dashboard/store";
import { useJobTypestore } from "@/contexts/enums/stores/jobType";
import { useIncomeTypestore } from "@/contexts/enums/stores/incomeType";

const JobSeekerDashboard = () => {
  const { isSearchFocused } = useDashboardStore();
  const { jobTypes, isJobTypesLoading } = useJobTypestore();
  const { incomeTypes, isIncomeTypesLoading } = useIncomeTypestore();
  const router = useRouter();
  return (
    <div className="container flex flex-col items-center gap-6 px-4 py-16">
      <motion.div
        className="flex flex-col"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.3 }}
      >
        <p className="text-5xl font-bold tracking-tight text-center text-blue-300 sm:text-6xl">
          Find Your Dream Job
        </p>
        <p className="text-lg text-center">
          Explore thousands of job vacancies and find the right career for you.
        </p>
      </motion.div>
      <motion.div
        className="bg-slate-500 p-4 flex flex-col gap-4 lg:flex-row lg:gap-8 rounded-md"
        variants={scaleVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.5 }}
      >
        <div className="flex-1 relative">
          <Input
            placeholder="Keyword e.g. (Job Title, Description, Company Name)"
            ref={isSearchFocused ? (input) => input?.focus() : null}
            className="pl-10 pr-14 py-3 rounded-lg border-2 bg-gray-100 border-gray-300 focus:border-blue-500 text-lg text-gray-800 placeholder-gray-400"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaKey className="text-gray-400" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <kbd className="bg-gray-500 text-white rounded-lg text-sm px-2 py-1">
              ⌘F
            </kbd>
          </div>
        </div>

        <Dropdown
          items={jobTypes}
          name="Job Type"
          isLoading={isJobTypesLoading}
        />
        <Dropdown
          items={incomeTypes}
          name="Income Type"
          isLoading={isIncomeTypesLoading}
        />

        <Button
          className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded"
          onClick={() => router.push("/vacancy")}
        >
          Search
        </Button>
      </motion.div>
    </div>
  );
};

export default JobSeekerDashboard;
