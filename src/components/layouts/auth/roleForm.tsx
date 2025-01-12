"use client";

import { Stack } from "@chakra-ui/react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Field } from "../../../common/ui/field";
import { LuSave } from "react-icons/lu";
import { Button } from "../../../common/ui/button";
import { BaseSyntheticEvent } from "react";
import { CreateCompanyDto } from "@company/types/create";
import { CreateJobSeekerDto } from "@jobSeeker/types/create";
import { CreateCompanyField } from "@company/fields/create";
import { CreateJobSeekerField } from "@jobSeeker/fields/create";
import { getSubmitButtonClass } from "@utils/form";
import TextInput from "@commoncomponents/form/TextInput";
import Dropdown from "@commoncomponents/form/Dropdown";
import { FieldConfig } from "@types";

type RoleFormProps<T extends CreateCompanyDto | CreateJobSeekerDto> = {
  selectedRole: "COMPANY" | "JOB_SEEKER";
  onSubmit: (data: BaseSyntheticEvent<object> | undefined) => void;
  formState: {
    register: UseFormRegister<T>;
    control: Control<T>;
    errors: FieldErrors<T>;
  };
  isLoading: boolean;
  selectData: string[];
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
    isSelectDataLoading = false,
  } = props;

  const fields: FieldConfig<T>[] =
    selectedRole === "COMPANY"
      ? (CreateCompanyField as FieldConfig<T>[])
      : (CreateJobSeekerField as FieldConfig<T>[]);

  return (
    <Stack as="form" onSubmit={onSubmit}>
      {fields?.map((field) => (
        <Field
          key={field.name as string}
          label={field.label}
          invalid={!!errors[field.name as keyof FieldErrors<T>]}
          errorText={String(
            errors[field.name as keyof FieldErrors<T>]?.message || ""
          )}
        >
          {field.type === "select" ? (
            <Dropdown<T>
              formState={{
                register,
                field,
                control,
              }}
              isContentLoading={isSelectDataLoading}
              items={selectData}
            />
          ) : (
            <TextInput
              formState={{
                register,
                field,
                errors,
              }}
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
        mt={4}
      >
        <LuSave />
        Save
      </Button>
    </Stack>
  );
};

export default RoleForm;
