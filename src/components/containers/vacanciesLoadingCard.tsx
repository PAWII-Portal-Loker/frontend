import { Skeleton } from "@ui/skeleton";
import { CONTAINER_GRADIENT_CLASSES, getThemeClassNames } from "@utils/classNames";
import clsx from "clsx";

const VacanciesLoadingCard = () => {
  return (
    <div className={clsx(getThemeClassNames(CONTAINER_GRADIENT_CLASSES),"rounded-lg shadow-md overflow-hidden relative animate-pulse p-4")}>
      <div className="w-full h-[200px] mb-3 rounded-lg" />
      <Skeleton width="60%" height="20px" mb="2" />
      <Skeleton width="30%" height="16px" mb="2" />
      <div className="flex justify-between">
        <Skeleton width="35%" height="16px" />
        <Skeleton width="30%" height="16px" />
      </div>
    </div>
  );
};

export default VacanciesLoadingCard;
