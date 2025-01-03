import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";
import { Skeleton } from "@ui/skeleton";
import { CONTAINER_ACTIVE_CLASSES, getThemeClassNames, TEXT_CLASSES } from "@utils/classNames";

interface DropdownProps {
  items: string[];
  name: string;
  value?: string;
  onSelect: (value: string) => void;
  isLoading?: boolean;
  isAlwaysFullWidth?: boolean;
}

const Dropdown = (props: DropdownProps) => {
  const { items, name, value, onSelect, isLoading, isAlwaysFullWidth } = props;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (onSelect) {
      onSelect(selectedValue);
    }
  };

  return (
    <div className={clsx(isAlwaysFullWidth && "w-full")}>
      {isLoading ? (
        <Skeleton
          className={clsx(
            "w-full h-[44px]",
            !isAlwaysFullWidth && "lg:w-[160px]",
            getThemeClassNames(CONTAINER_ACTIVE_CLASSES)
          )}
        />
      ) : (
        <div className="relative">
          <select
            className={clsx("w-full pl-3 pr-8 py-1 rounded-lg text-lg appearance-none", getThemeClassNames(CONTAINER_ACTIVE_CLASSES, TEXT_CLASSES))}
            value={value}
            onChange={handleChange}
          >
            <option value="">Select {name}</option>
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
