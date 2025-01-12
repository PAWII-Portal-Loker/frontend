import { Stack, Text } from "@chakra-ui/react";
import { LuLogIn } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@ui/dialog";
import { Field } from "@ui/field";
import { Button } from "@ui/button";
import useMainStore from "@hooks/main/store";
import useAuthStore from "@auth/store";
import { SignInDto } from "@auth/types/signIn";
import { SignInSchema } from "@auth/schemas/signIn";
import { SignInField } from "@auth/fields/signIn";
import { getSubmitButtonClass } from "@utils/form";
import {
  CONTAINER_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
} from "@utils/classNames";
import TextInput from "@commoncomponents/form/TextInput";

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
      onOpenChange={() => setLoginDialogOpen(!isLoginDialogOpen)}
    >
      <DialogContent
        className={getThemeClassNames(CONTAINER_CLASSES, TEXT_CLASSES)}
      >
        <DialogHeader>
          <DialogTitle textAlign="center" fontSize="2xl" fontWeight="bold">
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
                <TextInput
                  formState={{
                    register,
                    field,
                    errors,
                  }}
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
              mt={2}
            >
              <LuLogIn />
              Login
            </Button>
          </Stack>
          <Text mt={4} textAlign="center">
            Don't have an account?{" "}
            <Text
              as="span"
              color="blue.400"
              fontWeight="bold"
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
