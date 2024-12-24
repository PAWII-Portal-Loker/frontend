import { Stack, Input, Text } from "@chakra-ui/react";
import { LuLogIn } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "src/common/ui/dialog";
import { Field } from "src/common/ui/field";
import { Button } from "src/common/ui/button";
import useMainStore from "@hooks/main/store";
import useAuthStore from "@auth/store";
import { SignInDto } from "@auth/types/signIn";
import { SignInSchema } from "@auth/schemas/signIn";
import { SignInField } from "@auth/fields/signIn";
import { getFocusRingColorClass, getSubmitButtonClass } from "@utils/form";

const LoginDialog = () => {
  const { isLoginDialogOpen, setLoginDialogOpen, setRegisterDialogOpen } =
    useMainStore();
  const { isAuthLoading, signIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDto>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = handleSubmit((data) => {
    signIn({
      email: data.email,
      password: data.password,
    });
  });

  return (
    <DialogRoot
      lazyMount
      open={isLoginDialogOpen}
      onOpenChange={() => setLoginDialogOpen(false)}
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
            {SignInField.map((field) => (
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
                    getFocusRingColorClass(errors[field.name])
                  )}
                />
              </Field>
            ))}
            <Button
              className={getSubmitButtonClass(isAuthLoading, errors)}
              disabled={isAuthLoading || Object.keys(errors).length > 0}
              type="submit"
              width="full"
              loading={isAuthLoading}
              loadingText="Logging in..."
              size="lg"
            >
              <LuLogIn />
              Login
            </Button>
          </Stack>
          <Text mt={4} textAlign="center">
            Don't have an account?{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={() => {
                setLoginDialogOpen(false);
                setRegisterDialogOpen(true);
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
};

export default LoginDialog;
