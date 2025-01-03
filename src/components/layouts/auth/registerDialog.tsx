import { Stack, Input, Text } from "@chakra-ui/react";
import { LuUserPlus } from "react-icons/lu";
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
} from "@ui/dialog";
import { Field } from "@ui/field";
import { Button } from "@ui/button";
import useMainStore from "@hooks/main/store";
import useUserStore from "@user/store";
import { CreateUserDto } from "@user/types/create";
import { CreateUserSchema } from "@user/schemas/create";
import { CreateUserField } from "@user/fields/create";
import { getFocusRingColorClass, getSubmitButtonClass } from "@utils/form";
import { CONTAINER_ACTIVE_CLASSES, CONTAINER_CLASSES, getThemeClassNames, TEXT_CLASSES } from "@utils/classNames";

const RegisterDialog = () => {
  const { setLoginDialogOpen, isRegisterDialogOpen, setRegisterDialogOpen } =
    useMainStore();
  const { isUserLoading, createUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto & { confirm_password: string }>({
    resolver: yupResolver(CreateUserSchema),
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
      onOpenChange={() => setRegisterDialogOpen(false)}
    >
      <DialogContent className={getThemeClassNames(CONTAINER_CLASSES, TEXT_CLASSES)}>
        <DialogHeader>
          <DialogTitle textAlign="center" fontSize="2xl" fontWeight="bold">
            Register
          </DialogTitle>
        </DialogHeader>
        <DialogBody as="form" onSubmit={onSubmit}>
          <Stack wordSpacing={4}>
            {CreateUserField.map((field) => (
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
                    getFocusRingColorClass(errors[field.name]),
                    getThemeClassNames(CONTAINER_ACTIVE_CLASSES, TEXT_CLASSES)
                  )}
                />
              </Field>
            ))}
            <Button
              className={getSubmitButtonClass(isUserLoading, errors)}
              disabled={isUserLoading || Object.keys(errors).length > 0}
              type="submit"
              width="full"
              loading={isUserLoading}
              loadingText="Registering..."
              size="lg"
              mt={2}
            >
              <LuUserPlus />
              Register
            </Button>
          </Stack>
          <Text mt={4} textAlign="center">
            Already have an account?{" "}
            <Text
              as="span"
              color="blue.400"
              fontWeight="bold"
              cursor="pointer"
              onClick={() => {
                setRegisterDialogOpen(false);
                setLoginDialogOpen(true);
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
