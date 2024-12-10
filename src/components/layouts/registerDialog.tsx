import { Field } from "@/components/ui/field";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogTitle,
  DialogRoot,
  DialogHeader,
} from "@/components/ui/dialog";
import { Stack, Input, Text } from "@chakra-ui/react";
import { LuUserPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import useMainStore from "@/hooks/main/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "@/contexts/auth/store";
import clsx from "clsx";
import { UserCreateDto } from "@/contexts/user/type";
import useUserStore from "@/contexts/user/store";
import { UserCreateField, UserCreateSchema } from "@/contexts/user/util";

const RegisterDialog = () => {
  const {
    setIsLoginDialogOpen,
    isRegisterDialogOpen,
    setIsRegisterDialogOpen,
  } = useMainStore();
  const { isLoading } = useAuthStore();
  const { createUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCreateDto & { confirm_password: string }>({
    resolver: yupResolver(UserCreateSchema),
  });

  const onSubmit = handleSubmit((data) => {
    createUser({
      email: data.email,
      wa_number: data.wa_number,
      password: data.password,
    });
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
            {UserCreateField.map((field) => (
              <Field
                key={field.name}
                label={field.label}
                invalid={!!errors[field.name]}
                errorText={errors[field.name]?.message}
              >
                <Input
                  {...register(field.name)}
                  type={field.type}
                  placeholder={field.placeholder}
                  className={clsx(
                    "rounded-lg border-2 p-4 focus:ring-2 bg-gray-100 text-lg text-gray-800 placeholder-gray-400 appearance-none",
                    !errors[field.name]
                      ? "focus:ring-blue-500"
                      : "focus:ring-red-500",
                  )}
                />
              </Field>
            ))}
            <Button
              className={clsx(
                "mt-4 bg-blue-300 text-white font-bold py-2 px-4 rounded",
                isLoading || Object.keys(errors).length > 0
                  ? "cursor-not-allowed"
                  : "hover:bg-blue-400 transition-all duration-200",
              )}
              disabled={isLoading || Object.keys(errors).length > 0}
              type="submit"
              width="full"
              loading={isLoading}
              loadingText="Registering..."
              size="lg"
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
};

export default RegisterDialog;
