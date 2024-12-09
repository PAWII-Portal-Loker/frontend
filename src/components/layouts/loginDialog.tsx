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
import { LuLogIn } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import useMainStore from "@/hooks/main/reducer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "@/contexts/(auth)/state";
import { fields, FormValues, schema } from "@/common/types/formRules/login";
import clsx from "clsx";

export default function LoginDialog() {
  const { isLoginDialogOpen, setIsLoginDialogOpen, setIsRegisterDialogOpen } =
    useMainStore();
  const { isLoading, signIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data: FormValues) => {
    signIn({
      email: data.email,
      password: data.password,
    });
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
