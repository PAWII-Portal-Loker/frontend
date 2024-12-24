"use client";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "src/common/ui/dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useRoleDialogStore from "@hooks/roleDialog/store";
import { yupResolver } from "@hookform/resolvers/yup";
import RoleCardPicker from "../../containers/roleCardPicker";
import { useCompanyStore } from "@company/store";
import { useJobSeekerStore } from "@jobSeeker/store";
import { useCompanyTypeStore } from "@enums/stores/companyType";
import { useLastEducationTypeStore } from "@enums/stores/lastEducationType";
import { CreateCompanyDto } from "@company/types/create";
import { CreateCompanySchema } from "@company/schemas/create";
import { CreateJobSeekerDto } from "@jobSeeker/types/create";
import { CreateJobSeekerSchema } from "@jobSeeker/schemas/create";
import { slideVariants } from "@consts/animationVariants";
import RoleForm from "./roleForm";

const RoleDialog = () => {
  const {
    isRoleDialogOpen,
    setRoleDialogOpen,
    selectedRole,
    setSelectedRole,
    isLoading,
  } = useRoleDialogStore();
  const { createCompany } = useCompanyStore();
  const { createJobSeeker } = useJobSeekerStore();
  const { companyTypes, getCompanyTypes, isCompanyTypesLoading } =
    useCompanyTypeStore();
  const {
    lastEducationTypes,
    getLastEducationTypes,
    isLastEducationTypesLoading,
  } = useLastEducationTypeStore();

  useEffect(() => {
    getCompanyTypes();
  }, []);

  useEffect(() => {
    getLastEducationTypes();
  }, []);

  const {
    register: registerCompany,
    control: controlCompany,
    handleSubmit: handleSubmitCompany,
    formState: { errors: errorsCompany },
  } = useForm<CreateCompanyDto>({
    resolver: yupResolver(CreateCompanySchema),
  });

  const {
    register: registerJobSeeker,
    handleSubmit: handleSubmitJobSeeker,
    formState: { errors: errorsJobSeeker },
  } = useForm<CreateJobSeekerDto>({
    resolver: yupResolver(CreateJobSeekerSchema),
  });

  const onCompanySubmit = handleSubmitCompany((data) => {
    createCompany(data);
  });

  const onJobSeekerSubmit = handleSubmitJobSeeker((data) => {
    createJobSeeker(data);
  });

  return (
    <DialogRoot
      lazyMount
      open={isRoleDialogOpen}
      onOpenChange={() => setRoleDialogOpen(false)}
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
                  selectedRole="COMPANY"
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
                  selectedRole="JOB_SEEKER"
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
};

export default RoleDialog;
