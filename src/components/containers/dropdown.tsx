import { FaChevronDown } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";
import clsx from "clsx";

interface DropdownProps {
  items: string[];
  name: string;
  isLoading?: boolean;
  isAlwaysFullWidth?: boolean;
}

const Dropdown = ({
  items,
  name = "Item",
  isLoading = false,
  isAlwaysFullWidth = false,
}: DropdownProps) => {
  return (
    <div className={clsx(isAlwaysFullWidth && "w-full")}>
      {isLoading ? (
        <Skeleton
          className={clsx(
            "w-full h-[44px]",
            !isAlwaysFullWidth && "lg:w-[160px]",
          )}
        />
      ) : (
        <div className="relative">
          <select className="w-full pl-3 pr-8 py-1 rounded-lg border-2 bg-gray-100 border-gray-300 text-lg text-gray-600 appearance-none">
            <option value="ALL">Select {name}</option>
            {items.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <FaChevronDown className="text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
