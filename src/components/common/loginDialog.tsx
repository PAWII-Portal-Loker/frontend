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
import { LuLogIn } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import useMainStore from '@/state/mainStore';
import { useForm } from 'react-hook-form';
import LoginFormValues from '@/common/types/loginForm';
import rules from '@/common/formRules/login';

export default function LoginDialog() {
  const router = useRouter();
  const { isLoginDialogOpen, setIsLoginDialogOpen, setIsRegisterDialogOpen } =
    useMainStore();
  const { isLoading, signIn } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
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
      <DialogContent>
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
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-200"
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
            Don&apos;t have an account?{' '}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={() => {
                setIsLoginDialogOpen(false);
                setIsRegisterDialogOpen(true);
              }}
              _hover={{ textDecoration: 'underline' }}
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
