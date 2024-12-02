'use client';

import { Field } from '@/components/ui/field';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import useStore from '@/state/auth/store';
import { Stack, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import useMainStore from '@/state/mainStore';
import { LuUserPlus } from 'react-icons/lu';
import { useForm } from 'react-hook-form';
import RegisterFormValues from '@/common/types/registerForm';
import rules from '@/common/formRules/register';

export default function RegisterDialog() {
  const router = useRouter();
  const {
    setIsLoginDialogOpen,
    isRegisterDialogOpen,
    setIsRegisterDialogOpen,
  } = useMainStore();
  const { isLoading, signUp } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      waNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormValues) => {
    signUp(data.email, data.waNumber, data.password, router);
  });

  return (
    <DialogRoot
      lazyMount
      open={isRegisterDialogOpen}
      onOpenChange={() => setIsRegisterDialogOpen(false)}
    >
      <DialogContent>
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
            <Field
              label="Email"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                {...register('email', rules.email)}
                placeholder="Enter your email"
                padding={4}
                border="1px solid #e2e8f0"
              />
            </Field>
            <Field
              label="WA Number"
              invalid={!!errors.waNumber}
              errorText={errors.waNumber?.message}
            >
              <Input
                {...register('waNumber', rules.waNumber)}
                type="number"
                placeholder="Enter your WA Number"
                padding={4}
                border="1px solid #e2e8f0"
              />
            </Field>
            <Field
              label="Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <Input
                {...register('password', rules.password)}
                type="password"
                placeholder="Enter your password"
                padding={4}
                border="1px solid #e2e8f0"
              />
            </Field>
            <Field
              label="Confirm Password"
              invalid={!!errors.confirmPassword}
              errorText={errors.confirmPassword?.message}
            >
              <Input
                {...register('confirmPassword', rules.confirmPassword)}
                type="password"
                placeholder="Confirm your password"
                padding={4}
                border="1px solid #e2e8f0"
              />
            </Field>
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
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
            Already have an account?{' '}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={() => {
                setIsRegisterDialogOpen(false);
                setIsLoginDialogOpen(true);
              }}
              _hover={{ textDecoration: 'underline' }}
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
