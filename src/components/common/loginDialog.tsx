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

export default function LoginDialog() {
  const router = useRouter();
  const { isLoginDialogOpen, setIsLoginDialogOpen, setIsRegisterDialogOpen } =
    useMainStore();
  const { email, setEmail, password, setPassword, isLoading, login } =
    useStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    login(email, password, router);
  };

  return (
    <DialogRoot
      lazyMount
      open={isLoginDialogOpen}
      onOpenChange={() => setIsLoginDialogOpen(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle textAlign="center">Login</DialogTitle>
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
              <Field label="Password">
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </Field>
              <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                width="full"
                loading={isLoading}
                loadingText="Logging in..."
              >
                <LuLogIn />
                Login
              </Button>
            </Stack>
          </form>
          <Text mt={2} textAlign="center">
            Don&apos;t have an account?{' '}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              onClick={() => {
                setIsLoginDialogOpen(false);
                setIsRegisterDialogOpen(true);
              }}
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
