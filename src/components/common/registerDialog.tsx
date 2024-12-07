"use client";

import { Field } from "@/components/ui/field";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Stack, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useMainStore from "@/hooks/mainStore";
import { LuUserPlus } from "react-icons/lu";
import { useForm } from "react-hook-form";
import RegisterFormValues from "@/common/types/registerForm";
import rules from "@/common/formRules/register";
import useStore from "@/contexts/auth/reducer";
import FieldConfig from "@/common/types/fieldConfig";

export default function RegisterDialog() {
  const router = useRouter();
  const {
    setIsLoginDialogOpen,
    isRegisterDialogOpen,
    setIsRegisterDialogOpen,
  } = useMainStore();
  const { isLoading, signUp } = useStore();

  const fields: FieldConfig<RegisterFormValues>[] = [
    {
      name: "wa_number",
      label: "Whatsapp Number",
      type: "tel",
      placeholder: "Enter your whatsapp number",
      rules: rules.waNumber,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      rules: rules.email,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      rules: rules.password,
    },
    {
      name: "confirm_password",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      rules: rules.confirmPassword,
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      wa_number: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormValues) => {
    signUp(data.email, data.wa_number, data.password, router);
  });

  return (
    <DialogRoot
      lazyMount
      open={isRegisterDialogOpen}
      onOpenChange={() => setIsRegisterDialogOpen(false)}
    >
      <DialogContent className="bg-slate-500 text-gray-100">
        <DialogHeader>
          <DialogTitle
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
            mb={4}
          >
            Register
          </DialogTitle>
        </DialogHeader>
        <DialogBody as="form" onSubmit={onSubmit}>
          <Stack wordSpacing={4}>
            {fields.map((field) => (
              <Field
                key={field.name}
                label={field.label}
                invalid={!!errors[field.name]}
                errorText={errors[field.name]?.message}
              >
                <Input
                  {...register(field.name, field.rules)}
                  type={field.type}
                  placeholder={field.placeholder}
                  padding={4}
                  className="rounded-lg border-2 bg-gray-100 border-gray-300 focus:border-blue-500 text-lg text-gray-800 placeholder-gray-400"
                />
              </Field>
            ))}
            <Button
              className="mt-4 bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition-all duration-200"
              type="submit"
              width="full"
              loading={isLoading}
              loadingText="Registering..."
            >
              <LuUserPlus />
              Register
            </Button>
          </Stack>
          <Text mt={2} textAlign="center">
            Already have an account?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={() => {
                setIsRegisterDialogOpen(false);
                setIsLoginDialogOpen(true);
              }}
              _hover={{ textDecoration: "underline" }}
            >
              Login
            </Text>
          </Text>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
