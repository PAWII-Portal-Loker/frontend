import clsx from "clsx";
import Link from "next/link";
import { motion } from "framer-motion";
import { VacancyDto } from "@vacancy/types";
import { slideVariants } from "@consts/animationVariants";
import AsyncImage from "@commoncomponents/async/AsyncImage";

interface VacancyCardProps {
  vacancy?: VacancyDto;
  delay?: number;
}

const VacancyCard = ({ vacancy, delay }: VacancyCardProps) => {
  if (!vacancy) return null;

  return (
    <Link href={`/vacancy/${vacancy.id}`} className="block">
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden relative"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: delay }}
        whileHover={{ scale: 1.01 }}
      >
        <AsyncImage
          imgId={vacancy.thumbnail_url}
          alt={vacancy.position}
          width={500}
          height={200}
          className="w-full object-cover transition-transform duration-200 transform hover:scale-105"
        />
        <span
          className={clsx(
            "absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-bold",
            vacancy.is_closed
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          )}
        >
          {vacancy.is_closed ? "Closed" : "Open"}
        </span>
        <div className="p-4">
          <p className="text-lg font-bold text-gray-800 hover:text-primary transition-colors duration-200">
            {vacancy.position}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            {vacancy.company.company_name}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-xs">
              {vacancy.applied_count} Applied
            </span>
            <span className="text-primary text-xs font-medium">
              {vacancy.job_type} - {vacancy.income_type}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default VacancyCard;
