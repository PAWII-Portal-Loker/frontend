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
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useRoleDialogStore from "@/hooks/roleDialog/store";
import { slideVariants } from "@/common/types/animationVariants";
import {
  FormValues as jobSeekerFormValues,
  schema as jobSeekerSchema,
} from "@/common/types/formRules/jobSeeker";
import { yupResolver } from "@hookform/resolvers/yup";
import RoleCardPicker from "../containers/roleCardPicker";
import { useCompanyStore } from "@/contexts/company/store";
import { useJobSeekerStore } from "@/contexts/jobSeeker/store";
import RoleForm from "./roleForm";
import { useCompanyTypeStore } from "@/contexts/enums/store";
import { CompanyCreateSchema } from "@/contexts/company/util";
import { CompanyCreateDto } from "@/contexts/company/type";

export default function RoleDialog() {
  const {
    isRoleDialogOpen,
    setIsRoleDialogOpen,
    selectedRole,
    setSelectedRole,
    isLoading,
  } = useRoleDialogStore();
  const { createData: createCompanyRole } = useCompanyStore();
  const { createData: createJobSeekerRole } = useJobSeekerStore();

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
  } = useForm<CompanyCreateDto>({
    resolver: yupResolver(CompanyCreateSchema),
  });

  const {
    register: registerJobSeeker,
    handleSubmit: handleSubmitJobSeeker,
    formState: { errors: errorsJobSeeker },
  } = useForm<jobSeekerFormValues>({
    resolver: yupResolver(jobSeekerSchema),
  });

  const onCompanySubmit = handleSubmitCompany((data) => {
    createCompanyRole(data);
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
                <RoleForm
                  role="COMPANY"
                  onSubmit={onCompanySubmit}
                  isLoading={isLoading}
                  companyTypes={companyTypes}
                  isCompanyTypesLoading={isCompanyTypesLoading}
                  formState={{
                    register: registerCompany,
                    control: controlCompany,
                    errors: errorsCompany,
                  }}
                />
              )}
              {selectedRole == "JOB_SEEKER" && (
                <RoleForm
                  role="JOB_SEEKER"
                  onSubmit={onJobSeekerSubmit}
                  isLoading={isLoading}
                  formState={{
                    register: registerJobSeeker,
                    errors: errorsJobSeeker,
                  }}
                />
              )}
            </motion.div>
          )}
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
