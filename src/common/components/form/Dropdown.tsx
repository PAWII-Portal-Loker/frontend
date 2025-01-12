import { FieldConfig } from "@types";
import { NativeSelectField, NativeSelectRoot } from "@ui/native-select";
import {
  CONTAINER_ACTIVE_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import clsx from "clsx";
import { Control, FieldValues, Path, UseFormRegister } from "react-hook-form";

interface DropdownProps<T extends FieldValues> {
  formState: {
    register: UseFormRegister<T>;
    field: FieldConfig<T>;
    control?: Control<T>;
  };
  isContentLoading: boolean;
  items: string[];
  value?: string;
}

const Dropdown = <T extends FieldValues>({
  formState: { register, field, control },
  isContentLoading,
  items,
  value,
}: DropdownProps<T>) => {
  return (
    <NativeSelectRoot size="md">
      <NativeSelectField
        isLoading={isContentLoading}
        className={clsx(
          "w-full pl-3 pr-8 py-1 rounded-lg border-2 bg-gray-100 border-gray-300 text-lg text-gray-600 appearance-none",
          getThemeClassNames(CONTAINER_ACTIVE_CLASSES, TEXT_CLASSES)
        )}
        {...register(field.name as Path<T>)}
        {...control?.register(field.name as Path<T>)}
        placeholder={field.placeholder}
        items={items}
        value={value}
        _loading={{ opacity: 0.5 }}
      />
    </NativeSelectRoot>
  );
};

export default Dropdown;
