"use client";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { Stack, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useRoleDialogStore from "@/hooks/(roleDialog)/reducer";
import { Field } from "../ui/field";
import { slideVariants } from "@/common/types/animationVariants";
import clsx from "clsx";
import { useCompanyTypeStore } from "@/contexts/const/reducer";
import { NativeSelectField, NativeSelectRoot } from "../ui/native-select";
import {
  fields as companyFields,
  FormValues as companyFormValues,
  schema as companySchema,
} from "@/common/types/formRules/company";
import {
  fields as jobSeekerFields,
  FormValues as jobSeekerFormValues,
  schema as jobSeekerSchema,
} from "@/common/types/formRules/jobSeeker";
import { yupResolver } from "@hookform/resolvers/yup";
import RoleCardPicker from "../containers/roleCardPicker";
import { LuSave } from "react-icons/lu";
import { Button } from "../ui/button";

export default function RoleDialog() {
  const {
    isRoleDialogOpen,
    setIsRoleDialogOpen,
    selectedRole,
    setSelectedRole,
    createCompanyRole,
    createJobSeekerRole,
    isLoading,
  } = useRoleDialogStore();

  // const [selectedFields, setSelectedFields] = useState<
  //   FieldConfig<CompanyRequestEntity | JobSeekerRequestEntity>[] | null
  // >(null);

  const {
    data: companyTypes,
    fetchData: fetchCompanyTypes,
    isLoading: isCompanyTypesLoading,
  } = useCompanyTypeStore();

  useEffect(() => {
    fetchCompanyTypes();
  }, [fetchCompanyTypes]);

  const {
    register: registerCompany,
    control: controlCompany,
    handleSubmit: handleSubmitCompany,
    formState: { errors: errorsCompany },
  } = useForm<companyFormValues>({
    resolver: yupResolver(companySchema),
  });

  const {
    register: registerJobSeeker,
    handleSubmit: handleSubmitJobSeeker,
    formState: { errors: errorsJobSeeker },
  } = useForm<jobSeekerFormValues>({
    resolver: yupResolver(jobSeekerSchema),
  });

  const onCompanySubmit = handleSubmitCompany((data) => {
    createCompanyRole(data as companyFormValues);
  });

  const onJobSeekerSubmit = handleSubmitJobSeeker((data) => {
    createJobSeekerRole(data as jobSeekerFormValues);
  });

  return (
    <DialogRoot
      lazyMount
      open={isRoleDialogOpen}
      onOpenChange={() => setIsRoleDialogOpen(false)}
    >
      <DialogContent className="bg-slate-700 text-gray-100">
        <DialogHeader>
          <DialogTitle textAlign="center" fontSize="2xl" fontWeight="bold">
            Choose Your Role
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <RoleCardPicker
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />
          {selectedRole && (
            <motion.div
              variants={slideVariants}
              animate="animate"
              initial="initial"
              exit="exit"
            >
              {selectedRole == "COMPANY" && (
                <Stack as="form" onSubmit={onCompanySubmit}>
                  {companyFields?.map((field) => (
                    <Field
                      key={field.name}
                      label={field.label}
                      invalid={!!errorsCompany[field.name]}
                      errorText={errorsCompany[field.name]?.message}
                    >
                      {field.type === "select" ? (
                        <NativeSelectRoot size="md">
                          <NativeSelectField
                            isLoading={isCompanyTypesLoading}
                            className="w-full pl-3 pr-8 py-1 rounded-lg border-2 bg-gray-100 border-gray-300 text-lg text-gray-600 appearance-none"
                            {...controlCompany.register(field.name)}
                            placeholder={field.placeholder}
                            items={companyTypes}
                            _loading={{ opacity: 0.5 }}
                          />
                        </NativeSelectRoot>
                      ) : (
                        <Input
                          {...registerCompany(field.name)}
                          type={field.type}
                          placeholder={field.placeholder}
                          className={clsx(
                            "rounded-lg border-2 p-4 focus:ring-2 bg-gray-100 text-lg text-gray-800 placeholder-gray-400",
                            !errorsCompany[field.name]
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
                      isLoading || Object.keys(errorsCompany).length > 0
                        ? "cursor-not-allowed"
                        : "hover:bg-blue-400 transition-all duration-200",
                    )}
                    disabled={
                      isLoading || Object.keys(errorsCompany).length > 0
                    }
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
              )}
              {selectedRole == "JOB_SEEKER" && (
                <Stack as="form" onSubmit={onJobSeekerSubmit}>
                  {jobSeekerFields?.map((field) => (
                    <Field
                      key={field.name}
                      label={field.label}
                      invalid={!!errorsJobSeeker[field.name]}
                      errorText={errorsJobSeeker[field.name]?.message}
                    >
                      <Input
                        {...registerJobSeeker(field.name)}
                        type={field.type}
                        placeholder={field.placeholder}
                        className={clsx(
                          "rounded-lg border-2 p-4 focus:ring-2 bg-gray-100 text-lg text-gray-800 placeholder-gray-400",
                          !errorsJobSeeker[field.name]
                            ? "focus:ring-blue-500"
                            : "focus:ring-red-500",
                        )}
                      />
                    </Field>
                  ))}
                  <Button
                    className={clsx(
                      "mt-4 bg-blue-300 text-white font-bold py-2 px-4 rounded",
                      isLoading || Object.keys(errorsJobSeeker).length > 0
                        ? "cursor-not-allowed"
                        : "hover:bg-blue-400 transition-all duration-200",
                    )}
                    disabled={
                      isLoading || Object.keys(errorsJobSeeker).length > 0
                    }
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
              )}
            </motion.div>
          )}
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
