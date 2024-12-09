import { isValidImageUrl } from "@/common/utils/validImageUrl";
import { VacancyDto } from "@/contexts/(vacancy)/type";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface VacancyCardProps {
  vacancy: VacancyDto;
}

export default function VacancyCard({ vacancy }: VacancyCardProps) {
  return (
    <Link href={`/vacancy/${vacancy.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
        <Image
          src={
            isValidImageUrl(vacancy.thumbnail_url)
              ? vacancy.thumbnail_url
              : "/no-image.jpg"
          }
          alt={vacancy.position}
          width={500}
          height={200}
          priority
          className="w-full transition-transform duration-200 transform hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/no-image.jpg";
          }}
        />
        <span
          className={clsx(
            "absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-bold",
            vacancy.is_closed
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white",
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
      </div>
    </Link>
  );
}
