'use client';

import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoIosClose } from 'react-icons/io';
import Image from 'next/image';
import useStore from '@/state/auth/store';
import useMainStore from '@/state/mainStore';
import {
  MenuContent,
  MenuItemCommand,
  MenuRoot,
  MenuTrigger,
} from '../ui/menu';
import { AvatarGroup } from '../ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton } from '@chakra-ui/react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Dashboard' },
  { href: '/vacancy', label: 'Vacancy' },
  { href: '/history', label: 'History' },
  { href: '/notification', label: 'Notification' },
];

type NavLinkProps = {
  href: string;
  label: string;
};

const NavLink = ({ href, label }: NavLinkProps) => (
  <Link href={href}>
    <button
      className={clsx(
        'px-3 py-2 rounded-md',
        usePathname() === href
          ? 'bg-gray-200 text-blue-500 font-semibold'
          : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition-all duration-200',
      )}
      disabled={usePathname() === href}
    >
      {label}
    </button>
  </Link>
);

const MobileNavLink = ({ href, label }: NavLinkProps) => (
  <Link href={href}>
    <button
      className={clsx(
        'w-full px-3 py-2 rounded-md',
        usePathname() === href
          ? 'bg-gray-200 text-blue-500 font-semibold'
          : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition-all duration-200',
      )}
      disabled={usePathname() === href}
    >
      {label}
    </button>
  </Link>
);

export default function Navbar() {
  const { isAuthenticated, signOut } = useStore();
  const { isNavigationOpen, setIsNavigationOpen, setIsLoginDialogOpen } =
    useMainStore();

  const handleLogout = () => {
    signOut();
  };

  const toggleMenu = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <>
      <header className="bg-background px-4 py-3 fixed top-0 left-0 w-full z-10">
        <nav className="flex items-center justify-between">
          <IconButton
            size={'md'}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={toggleMenu}
          >
            {isNavigationOpen ? <IoIosClose /> : <RxHamburgerMenu />}
          </IconButton>
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="PortalLoker Logo"
              width={30}
              height={30}
            />
            <Link href="/" className="text-blue-500 font-bold text-lg">
              PortalLoker
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <ul className="hidden md:flex gap-5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink {...link} />
                </li>
              ))}
            </ul>
            {isAuthenticated ? (
              <MenuRoot>
                <MenuTrigger asChild>
                  <button className="rounded-full cursor-pointer">
                    <AvatarGroup size={'sm'} />
                  </button>
                </MenuTrigger>
                <MenuContent>
                  <Link href="/profile">
                    <MenuItemCommand>Edit Profile</MenuItemCommand>
                  </Link>
                  <MenuItemCommand onClick={handleLogout}>
                    Sign Out
                  </MenuItemCommand>
                </MenuContent>
              </MenuRoot>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-all duration-200"
                onClick={() => setIsLoginDialogOpen(true)}
              >
                Login
              </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isNavigationOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden px-4 py-4 absolute top-16 left-0 w-full bg-background"
            >
              {navLinks.map((link) => (
                <MobileNavLink key={link.href} {...link} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
