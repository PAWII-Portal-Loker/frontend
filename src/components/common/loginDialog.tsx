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
import { LuLogIn } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import useMainStore from "@/hooks/mainStore";
import { useForm } from "react-hook-form";
import LoginFormValues from "@/common/types/loginForm";
import rules from "@/common/formRules/login";
import useStore from "@/contexts/auth/reducer";
import FieldConfig from "@/common/types/fieldConfig";

export default function LoginDialog() {
  const router = useRouter();
  const { isLoginDialogOpen, setIsLoginDialogOpen, setIsRegisterDialogOpen } =
    useMainStore();
  const { isLoading, signIn } = useStore();

  const fields: FieldConfig<LoginFormValues>[] = [
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
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data: LoginFormValues) => {
    signIn(data.email, data.password, router);
  });

  return (
    <DialogRoot
      lazyMount
      open={isLoginDialogOpen}
      onOpenChange={() => setIsLoginDialogOpen(false)}
    >
      <DialogContent className="bg-slate-500 text-gray-100">
        <DialogHeader>
          <DialogTitle
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
            mb={4}
          >
            Login
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
              loadingText="Logging in..."
              size="lg"
            >
              <LuLogIn />
              Login
            </Button>
          </Stack>
          <Text mt={4} textAlign="center">
            Don&apos;t have an account?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={() => {
                setIsLoginDialogOpen(false);
                setIsRegisterDialogOpen(true);
              }}
              _hover={{ textDecoration: "underline" }}
            >
              Register
            </Text>
          </Text>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
