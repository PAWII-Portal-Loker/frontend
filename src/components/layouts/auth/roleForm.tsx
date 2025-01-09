/* eslint-disable @typescript-eslint/no-explicit-any */
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

type RoleFormProps<T extends CreateCompanyDto | CreateJobSeekerDto> = {
  selectedRole: "COMPANY" | "JOB_SEEKER";
  onSubmit: (data: BaseSyntheticEvent<object> | undefined) => void;
  formState: {
    register: UseFormRegister<T>;
    control: Control<any>;
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
            <Dropdown
              register={register}
              field={field}
              isContentLoading={isSelectDataLoading}
              control={control}
              items={selectData}
            />
          ) : (
            <TextInput register={register} field={field} errors={errors} />
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
