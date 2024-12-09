import { Skeleton } from "../ui/skeleton";

const LoadingCard = () => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden relative animate-pulse p-4">
      <div className="w-full h-[200px] bg-gray-200 mb-3 rounded-lg"></div>
      <Skeleton width="60%" height="20px" mb="2" />
      <Skeleton width="30%" height="16px" mb="2" />
      <div className="flex justify-between">
        <Skeleton width="35%" height="16px" />
        <Skeleton width="30%" height="16px" />
      </div>
    </div>
  );
};

export default LoadingCard;
