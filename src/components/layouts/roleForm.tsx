"use client";

import { Stack, Input } from "@chakra-ui/react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Field } from "../ui/field";
import clsx from "clsx";
import { NativeSelectField, NativeSelectRoot } from "../ui/native-select";
import { LuSave } from "react-icons/lu";
import { Button } from "../ui/button";
import {
  fields as jobSeekerFields,
  FormValues as jobSeekerFormValues,
} from "@/common/types/formRules/jobSeeker";
import { BaseSyntheticEvent } from "react";
import { CompanyCreateDto } from "@/contexts/company/type";
import { CompanyCreateField } from "@/contexts/company/util";

type RoleFormProps<T extends CompanyCreateDto | jobSeekerFormValues> = {
  role: "COMPANY" | "JOB_SEEKER";
  onSubmit: (data: BaseSyntheticEvent<object> | undefined) => void;
  formState: {
    register: UseFormRegister<T>;
    control?: Control<T>;
    errors: FieldErrors<T>;
  };
  isLoading: boolean;
  companyTypes?: string[];
  isCompanyTypesLoading?: boolean;
};

const RoleForm = <T extends CompanyCreateDto | jobSeekerFormValues>({
  role,
  onSubmit,
  formState: { register, control, errors },
  isLoading,
  companyTypes,
  isCompanyTypesLoading,
}: RoleFormProps<T>) => {
  const fields = role === "COMPANY" ? CompanyCreateField : jobSeekerFields;

  return (
    <Stack as="form" onSubmit={onSubmit}>
      {fields?.map((field) => (
        <Field
          key={field.name}
          label={field.label}
          invalid={!!errors[field.name as keyof typeof errors]}
          errorText={String(
            errors[field.name as keyof typeof errors]?.message || "",
          )}
        >
          {field.type === "select" ? (
            <NativeSelectRoot size="md">
              <NativeSelectField
                isLoading={isCompanyTypesLoading}
                className="w-full pl-3 pr-8 py-1 rounded-lg border-2 bg-gray-100 border-gray-300 text-lg text-gray-600 appearance-none"
                {...register(
                  field.name as keyof (CompanyCreateDto | jobSeekerFormValues),
                )}
                {...control?.register(
                  field.name as keyof (CompanyCreateDto | jobSeekerFormValues),
                )}
                placeholder={field.placeholder}
                items={companyTypes}
                _loading={{ opacity: 0.5 }}
              />
            </NativeSelectRoot>
          ) : (
            <Input
              {...register(
                field.name as keyof (CompanyCreateDto | jobSeekerFormValues),
                {
                  valueAsNumber: field.type === "number",
                },
              )}
              type={field.type}
              placeholder={field.placeholder}
              className={clsx(
                "rounded-lg border-2 p-4 focus:ring-2 bg-gray-100 text-lg text-gray-800 placeholder-gray-400",
                !errors[field.name as keyof typeof errors]
                  ? "focus:ring-blue-500"
                  : "focus:ring-red-500",
              )}
            />
          )}
        </Field>
      ))}
      <Button
        className={clsx(
          "mt-4 bg-blue-300 text-white font-bold py-2 px-4 rounded",
          isLoading || Object.keys(errors).length > 0
            ? "cursor-not-allowed"
            : "hover:bg-blue-400 transition-all duration-200",
        )}
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
