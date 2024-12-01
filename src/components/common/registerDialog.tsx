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

export default function RegisterDialog() {
  const router = useRouter();
  const {
    setIsLoginDialogOpen,
    isRegisterDialogOpen,
    setIsRegisterDialogOpen,
  } = useMainStore();

  const {
    waNumber,
    setWaNumber,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    register,
  } = useStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    register(email, waNumber, password, confirmPassword, router);
  };

  return (
    <DialogRoot
      lazyMount
      open={isRegisterDialogOpen}
      onOpenChange={() => setIsRegisterDialogOpen(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle textAlign="center">Register</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <Stack wordSpacing={4}>
              <Field label="Email">
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </Field>
              <Field label="WA Number">
                <Input
                  type="tel"
                  id="waNumber"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  placeholder="Enter your WA Number"
                />
              </Field>
              <Field label="Password">
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </Field>
              <Field label="Confirm Password">
                <Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                />
              </Field>
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                width="full"
                loading={isLoading}
                loadingText="Registering..."
              >
                <LuUserPlus />
                Register
              </Button>
            </Stack>
          </form>
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
