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
import useRoleDialogStore from "@/hooks/(roleDialog)/reducer";
import { slideVariants } from "@/common/types/animationVariants";
import { useCompanyTypeStore } from "@/contexts/const/reducer";
import {
  FormValues as companyFormValues,
  schema as companySchema,
} from "@/common/types/formRules/company";
import {
  FormValues as jobSeekerFormValues,
  schema as jobSeekerSchema,
} from "@/common/types/formRules/jobSeeker";
import { yupResolver } from "@hookform/resolvers/yup";
import RoleCardPicker from "../containers/roleCardPicker";
import { useCompanyStore } from "@/contexts/company/reducer";
import { useJobSeekerStore } from "@/contexts/jobSeeker/reducer";
import RoleForm from "./roleForm";

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
