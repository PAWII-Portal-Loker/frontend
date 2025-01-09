/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldConfig } from "@types";
import { NativeSelectField, NativeSelectRoot } from "@ui/native-select";
import {
  CONTAINER_ACTIVE_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import clsx from "clsx";
import { Control, UseFormRegister } from "react-hook-form";

interface DropdownProps {
  register: UseFormRegister<any>;
  field: FieldConfig<any>;
  control: Control<any>;
  isContentLoading: boolean;
  items: string[];
}

const Dropdown = ({
  register,
  field,
  control,
  isContentLoading,
  items,
}: DropdownProps) => {
  return (
    <NativeSelectRoot size="md">
      <NativeSelectField
        isLoading={isContentLoading}
        className={clsx(
          "w-full pl-3 pr-8 py-1 rounded-lg border-2 bg-gray-100 border-gray-300 text-lg text-gray-600 appearance-none",
          getThemeClassNames(CONTAINER_ACTIVE_CLASSES, TEXT_CLASSES)
        )}
        {...register(field.name as string)}
        {...control?.register(field.name as string)}
        placeholder={field.placeholder}
        items={items}
        _loading={{ opacity: 0.5 }}
      />
    </NativeSelectRoot>
  );
};

export default Dropdown;
