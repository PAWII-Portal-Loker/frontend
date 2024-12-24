"use client";

import { Stack, Input } from "@chakra-ui/react";
import {
  Control,
  FieldError,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Field } from "../../../common/ui/field";
import clsx from "clsx";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../../common/ui/native-select";
import { LuSave } from "react-icons/lu";
import { Button } from "../../../common/ui/button";
import { BaseSyntheticEvent } from "react";
import { CreateCompanyDto } from "@company/types/create";
import { CreateJobSeekerDto } from "@jobSeeker/types/create";
import { CreateCompanyField } from "@company/fields/create";
import { CreateJobSeekerField } from "@jobSeeker/fields/create";
import { getFocusRingColorClass, getSubmitButtonClass } from "@utils/form";

type RoleFormProps<T extends CreateCompanyDto | CreateJobSeekerDto> = {
  selectedRole: "COMPANY" | "JOB_SEEKER";
  onSubmit: (data: BaseSyntheticEvent<object> | undefined) => void;
  formState: {
    register: UseFormRegister<T>;
    control?: Control<T>;
    errors: FieldErrors<T>;
  };
  isLoading: boolean;
  selectData?: string[];
  isSelectDataLoading?: boolean;
};

const RoleForm = <T extends CreateCompanyDto | CreateJobSeekerDto>(
  props: RoleFormProps<T>
) => {
  const {
    selectedRole,
    onSubmit,
    formState: { register, control, errors },
    isLoading,
    selectData,
    isSelectDataLoading,
  } = props;

  const fields =
    selectedRole === "COMPANY" ? CreateCompanyField : CreateJobSeekerField;

  return (
    <Stack as="form" onSubmit={onSubmit}>
      {fields?.map((field) => (
        <Field
          key={field.name}
          label={field.label}
          invalid={!!errors[field.name as keyof FieldErrors<T>]}
          errorText={String(
            errors[field.name as keyof FieldErrors<T>]?.message || ""
          )}
        >
          {field.type === "select" ? (
            <NativeSelectRoot size="md">
              <NativeSelectField
                isLoading={isSelectDataLoading}
                className="w-full pl-3 pr-8 py-1 rounded-lg border-2 bg-gray-100 border-gray-300 text-lg text-gray-600 appearance-none"
                {...register(
                  field.name as keyof (CreateCompanyDto | CreateJobSeekerDto)
                )}
                {...control?.register(
                  field.name as keyof (CreateCompanyDto | CreateJobSeekerDto)
                )}
                placeholder={field.placeholder}
                items={selectData}
                _loading={{ opacity: 0.5 }}
              />
            </NativeSelectRoot>
          ) : (
            <Input
              {...register(
                field.name as keyof (CreateCompanyDto | CreateJobSeekerDto),
                {
                  valueAsNumber: field.type === "number",
                }
              )}
              type={field.type}
              placeholder={field.placeholder}
              className={clsx(
                "rounded-lg border-2 p-4 focus:ring-2 bg-gray-100 text-lg text-gray-800 placeholder-gray-400",
                getFocusRingColorClass(
                  errors[field.name as keyof FieldErrors<T>] as FieldError
                )
              )}
            />
          )}
        </Field>
      ))}
      <Button
        className={getSubmitButtonClass(isLoading, errors)}
        disabled={isLoading || Object.keys(errors).length > 0}
        type="submit"
        width="full"
        loading={isLoading}
        loadingText="Saving..."
        size="lg"
      >
        <LuSave />
        Save
      </Button>
    </Stack>
  );
};

export default RoleForm;
