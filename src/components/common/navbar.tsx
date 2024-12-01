'use client';

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useStore from '@/state/auth/store';
import useMainStore from '@/state/mainStore';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoIosClose } from 'react-icons/io';
import Image from 'next/image';
import {
  MenuContent,
  MenuItemCommand,
  MenuRoot,
  MenuTrigger,
} from '../ui/menu';
import { AvatarGroup } from '../ui/avatar';

export default function Navbar() {
  const { open, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { isAuthenticated, signOut } = useStore();
  const { setIsLoginDialogOpen } = useMainStore();

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <Box
        bg="gray.100"
        px={4}
        position="fixed"
        top={0}
        left={0}
        width="100%"
        zIndex={10}
      >
        <Flex h={16} alignItems="center" justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={open ? onClose : onOpen}
          >
            {open ? <IoIosClose /> : <RxHamburgerMenu />}
          </IconButton>
          <HStack wordSpacing={8} alignItems="center">
            <HStack alignItems="center">
              <Image src="/your-logo.png" alt="Logo" width={30} height={30} />
              <Link href="/">PortalLoker</Link>
            </HStack>
          </HStack>
          <Flex gap={5} alignItems="center">
            <HStack
              as={'nav'}
              wordSpacing={4}
              gap={3}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/vacancy">Vacancy</Link>
              <Link href="/history">History</Link>
              <Link href="/notification">Notification</Link>
            </HStack>
            {isAuthenticated ? (
              <MenuRoot>
                <MenuTrigger asChild>
                  <Button rounded={'full'} cursor={'pointer'} minW={0}>
                    <AvatarGroup size={'sm'} />
                  </Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItemCommand onClick={() => router.push('/profile')}>
                    Edit Profile
                  </MenuItemCommand>
                  <MenuItemCommand onClick={handleLogout}>
                    Sign Out
                  </MenuItemCommand>
                </MenuContent>
              </MenuRoot>
            ) : (
              <Button
                variant={'solid'}
                colorScheme={'blue'}
                size={'sm'}
                onClick={() => setIsLoginDialogOpen(true)}
              >
                Login
              </Button>
            )}
          </Flex>
        </Flex>

        {open ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} wordSpacing={4} alignItems="center">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/vacancy">Vacancy</Link>
              <Link href="/history">History</Link>
              <Link href="/notification">Notification</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
