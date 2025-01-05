import { Skeleton } from "@ui/skeleton";
import VacancyCardSkeleton from "./VacancyCardSkeleton";

const VacancyDetailSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8">
      <div className="lg:w-[30%]">
        <Skeleton className="w-full h-[300px]" />
      </div>
      <div className="lg:w-[70%]">
        <VacancyCardSkeleton />
      </div>
    </div>
  );
};

export default VacancyDetailSkeleton;
