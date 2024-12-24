"use client";

import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../common/ui/menu";
import { motion, AnimatePresence } from "framer-motion";
import { Box, IconButton } from "@chakra-ui/react";
import clsx from "clsx";
import { BsPerson } from "react-icons/bs";
import { LiaSignOutAltSolid } from "react-icons/lia";
import useAuthStore from "@auth/store";
import useMainStore from "@hooks/main/store";
import useRoleDialogStore from "@hooks/roleDialog/store";
import { slideVariants } from "@consts/animationVariants";
import { Button } from "@ui/button";
import {
  useHideNavbarOnScroll,
  useIsNavbarActive,
} from "@hooks/navbar/useNavbar";

const navLinks = [
  { href: "/vacancy", label: "Vacancy" },
  { href: "/history", label: "History" },
  { href: "/notification", label: "Notification" },
];

type NavLinkProps = {
  href: string;
  label: string;
};

const NavLink = ({ href, label }: NavLinkProps) => (
  <Link href={href}>
    <Button
      className={clsx(
        "px-3 py-2 rounded-md",
        useIsNavbarActive(href)
          ? "bg-gray-500 text-blue-300 font-semibold"
          : "hover:text-blue-400 hover:bg-gray-500 transition-all duration-200"
      )}
      disabled={useIsNavbarActive(href)}
    >
      {label}
    </Button>
  </Link>
);

const MobileNavLink = ({ href, label }: NavLinkProps) => (
  <Link href={href}>
    <Button
      className={clsx(
        "w-full px-3 py-2 rounded-md",
        useIsNavbarActive(href)
          ? "bg-gray-500 text-blue-300 font-semibold"
          : "hover:text-blue-400 hover:bg-gray-500 transition-all duration-200"
      )}
      disabled={useIsNavbarActive(href)}
    >
      {label}
    </Button>
  </Link>
);

const Navbar = () => {
  const { isLogin, auth, signOut } = useAuthStore();
  const { isNavigationOpen, setNavigationOpen, setLoginDialogOpen } =
    useMainStore();
  const { setRoleDialogOpen } = useRoleDialogStore();
  const isNavbarHidden = useHideNavbarOnScroll();

  return (
    <motion.header
      className="bg-slate-600 text-gray-100 px-4 py-3 fixed top-0 left-0 w-full z-10"
      variants={slideVariants}
      initial="initial"
      animate={isNavbarHidden ? "exit" : "animate"}
    >
      <nav className="flex items-center justify-between">
        <IconButton
          size={"md"}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={() => setNavigationOpen(!isNavigationOpen)}
        >
          {isNavigationOpen ? <IoIosClose /> : <RxHamburgerMenu />}
        </IconButton>
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="PortalLoker Logo"
            width={30}
            height={30}
            priority
          />
          <Link href="/" className="text-blue-300 font-bold text-lg">
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
          {isLogin ? (
            <MenuRoot>
              {auth.role && (
                <span
                  className={clsx(
                    "mr-2 px-2 py-1 rounded-full",
                    auth.role === "Company"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  )}
                >
                  {auth.role}
                </span>
              )}
              <MenuTrigger asChild>
                <Button className="rounded-full cursor-pointer bg-blue-500 hover:bg-blue-700 transition-all duration-200">
                  <BsPerson size={24} />
                </Button>
              </MenuTrigger>
              <MenuContent>
                {auth.role ? (
                  <MenuItem value="profile" valueText="profile">
                    <BsPerson size={24} />
                    <Box flex="1">Profile</Box>
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => setRoleDialogOpen(true)}
                    value="role"
                    valueText="role"
                    color="fg.info"
                    _hover={{ bg: "bg.info", color: "fg.info" }}
                  >
                    <BsPerson size={24} />
                    <Box flex="1">Role</Box>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => signOut()}
                  value="sign out"
                  valueText="sign out"
                  color="fg.error"
                  _hover={{ bg: "bg.error", color: "fg.error" }}
                >
                  <LiaSignOutAltSolid size={24} />
                  <Box flex="1">Sign out</Box>
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          ) : (
            <Button
              className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded text-sm transition-all duration-200"
              onClick={() => setLoginDialogOpen(true)}
            >
              Login
            </Button>
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
            className="bg-slate-600 md:hidden px-4 py-4 absolute top-16 left-0 w-full"
          >
            {navLinks.map((link) => (
              <MobileNavLink key={link.href} {...link} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
