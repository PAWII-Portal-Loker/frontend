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
import { yupResolver } from "@hookform/resolvers/yup";
import RoleCardPicker from "../containers/roleCardPicker";
import { useCompanyStore } from "@/contexts/company/store";
import { useJobSeekerStore } from "@/contexts/jobSeeker/store";
import RoleForm from "./roleForm";
import {
  useCompanyTypeStore,
  useLastEducationTypeStore,
} from "@/contexts/enums/store";
import { CompanyCreateSchema } from "@/contexts/company/util";
import { CompanyCreateDto } from "@/contexts/company/type";
import { JobSeekerCreateDto } from "@/contexts/jobSeeker/type";
import { JobSeekerCreateSchema } from "@/contexts/jobSeeker/util";

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
  const {
    data: lastEducationTypes,
    fetchData: fetchLastEducationTypes,
    isLoading: isLastEducationTypesLoading,
  } = useLastEducationTypeStore();

  useEffect(() => {
    fetchCompanyTypes();
  }, [fetchCompanyTypes]);

  useEffect(() => {
    fetchLastEducationTypes();
  }, [fetchLastEducationTypes]);

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
  } = useForm<JobSeekerCreateDto>({
    resolver: yupResolver(JobSeekerCreateSchema),
  });

  const onCompanySubmit = handleSubmitCompany((data) => {
    createCompanyRole(data);
  });

  const onJobSeekerSubmit = handleSubmitJobSeeker((data) => {
    createJobSeekerRole(data);
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
                  selectData={companyTypes}
                  isSelectDataLoading={isCompanyTypesLoading}
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
                  selectData={lastEducationTypes}
                  isSelectDataLoading={isLastEducationTypesLoading}
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
