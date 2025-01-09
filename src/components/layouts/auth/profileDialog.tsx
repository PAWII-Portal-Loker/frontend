"use client";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@ui/dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCompanyStore } from "@company/store";
import { useJobSeekerStore } from "@jobSeeker/store";
import { useCompanyTypeStore } from "@enums/stores/companyType";
import { useLastEducationTypeStore } from "@enums/stores/lastEducationType";
import { UpdateCompanyDto } from "@company/types/update";
import { UpdateCompanySchema } from "@company/schemas/update";
import { UpdateJobSeekerDto } from "@jobSeeker/types/update";
import { UpdateJobSeekerSchema } from "@jobSeeker/schemas/update";
import { slideVariants } from "@consts/animationVariants";
import RoleForm from "./roleForm";
import {
  CONTAINER_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import useMainStore from "@hooks/main/store";
import useAuthStore from "@auth/store";

const ProfileDialog = () => {
  const { isProfileDialogOpen, setProfileDialogOpen } = useMainStore();
  const { auth } = useAuthStore();
  const { updateCompany, isCompanyLoading } = useCompanyStore();
  const { updateJobSeeker, isJobSeekerLoading } = useJobSeekerStore();
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
  } = useForm<UpdateCompanyDto>({
    resolver: yupResolver(UpdateCompanySchema),
  });

  const {
    register: registerJobSeeker,
    control: controlJobSeeker,
    handleSubmit: handleSubmitJobSeeker,
    formState: { errors: errorsJobSeeker },
  } = useForm<UpdateJobSeekerDto>({
    resolver: yupResolver(UpdateJobSeekerSchema),
  });

  const onCompanySubmit = handleSubmitCompany((data) => {
    updateCompany(data);
  });

  const onJobSeekerSubmit = handleSubmitJobSeeker((data) => {
    updateJobSeeker(data);
  });

  return (
    <DialogRoot
      lazyMount
      open={isProfileDialogOpen}
      onOpenChange={() => setProfileDialogOpen(!isProfileDialogOpen)}
    >
      <DialogContent
        className={getThemeClassNames(CONTAINER_CLASSES, TEXT_CLASSES)}
      >
        <DialogHeader>
          <DialogTitle textAlign="center" fontSize="2xl" fontWeight="bold">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <motion.div
            variants={slideVariants}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            {auth.role == "Company" && (
              <RoleForm
                selectedRole="COMPANY"
                onSubmit={onCompanySubmit}
                isLoading={isCompanyLoading}
                selectData={companyTypes}
                isSelectDataLoading={isCompanyTypesLoading}
                formState={{
                  register: registerCompany,
                  control: controlCompany,
                  errors: errorsCompany,
                }}
              />
            )}

            {auth.role == "Job Seeker" && (
              <RoleForm
                selectedRole="JOB_SEEKER"
                onSubmit={onJobSeekerSubmit}
                isLoading={isJobSeekerLoading}
                selectData={lastEducationTypes}
                isSelectDataLoading={isLastEducationTypesLoading}
                formState={{
                  register: registerJobSeeker,
                  control: controlJobSeeker,
                  errors: errorsJobSeeker,
                }}
              />
            )}
          </motion.div>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ProfileDialog;
