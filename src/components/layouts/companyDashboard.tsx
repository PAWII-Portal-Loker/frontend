import { motion } from "framer-motion";
import { scaleVariants, slideVariants } from "@consts/animationVariants";
import Link from "next/link";

const CompanyDashboard = () => {
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
        <p className="text-5xl font-bold tracking-tight text-center text-blue-500 sm:text-6xl">
          Manage Your Vacancies
        </p>
        <p className="text-lg text-center">
          Create, edit, and track your job vacancies to find the best talent.
        </p>
      </motion.div>

      <motion.div
        variants={scaleVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/my-vacancies"
          passHref
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded"
        >
          My Vacancies
        </Link>
      </motion.div>
    </div>
  );
};

export default CompanyDashboard;
