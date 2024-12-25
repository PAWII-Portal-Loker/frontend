import { Skeleton } from "@chakra-ui/react";
import { SkeletonCircle } from "@ui/skeleton";

const ApplicantsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-100 rounded-lg shadow-md overflow-hidden relative animate-pulse p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <SkeletonCircle size={12} />
            <Skeleton width="60%" height="20px" />
          </div>
          <Skeleton width="60%" height="16px" mb="2" />
          <Skeleton width="70%" height="16px" mb="2" />
          <Skeleton width="55%" height="16px" mb="2" />
          <Skeleton width="30%" height="24px" ms="auto" />
        </div>
      ))}
    </div>
  );
};

export default ApplicantsSkeleton;
