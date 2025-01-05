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
import { hasPermission } from "@utils/permissions";
import { ColorModeButton } from "@ui/color-mode";
import {
  CONTAINER_ACTIVE_CLASSES,
  CONTAINER_CLASSES,
  CONTAINER_HOVER_CLASSES,
  getThemeClassNames,
  TEXT_CLASSES,
  TEXT_PRIMARY_CLASSES,
} from "@utils/classNames";

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
          ? "font-semibold dark:text-blue-400 text-blue-800 dark:bg-slate-600 bg-slate-200"
          : "dark:text-slate-100 text-slate-700 dark:hover:bg-slate-600 hover:bg-gray-300 transition-all duration-200"
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
          ? clsx(
              "font-semibold",
              getThemeClassNames(TEXT_PRIMARY_CLASSES, CONTAINER_ACTIVE_CLASSES)
            )
          : getThemeClassNames(TEXT_CLASSES, CONTAINER_HOVER_CLASSES)
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

  const navLinks = [
    { href: "/vacancy", label: "Vacancy" },
    { href: "/history", label: "History" },
    { href: "/notification", label: "Notification" },
  ];

  if (hasPermission(auth, "myApplications", "view")) {
    navLinks.push({ href: "/my-applications", label: "My Applications" });
  } else if (hasPermission(auth, "myVacancies", "view")) {
    navLinks.push({ href: "/my-vacancies", label: "My Vacancies" });
  }

  return (
    <motion.header
      className={clsx(
        "px-4 py-3 fixed top-0 left-0 w-full z-10",
        getThemeClassNames(CONTAINER_CLASSES)
      )}
      aria-hidden={!isNavigationOpen}
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
          {isNavigationOpen ? (
            <IoIosClose className={getThemeClassNames(TEXT_CLASSES)} />
          ) : (
            <RxHamburgerMenu className={getThemeClassNames(TEXT_CLASSES)} />
          )}
        </IconButton>
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="PortalLoker Logo"
            width={30}
            height={30}
            priority
          />
          <Link href="/" className="text-blue-500 font-bold text-lg">
            PortalLoker
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-8">
          <ul className="dark:text-slate-600 hidden md:flex gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink {...link} />
              </li>
            ))}
          </ul>
          <ColorModeButton />
          {isLogin ? (
            <MenuRoot>
              {auth.role && (
                <span
                  className={clsx(
                    "mr-2 px-2 py-1 rounded-full text-center text-xs font-bold",
                    hasPermission(auth, "companyDashboard", "view")
                      ? "bg-violet-500 text-white"
                      : "bg-yellow-500 text-white"
                  )}
                >
                  {auth.role}
                </span>
              )}
              <MenuTrigger asChild>
                <Button className="rounded-full cursor-pointer bg-blue-500 hover:bg-blue-700 transition-all duration-200">
                  <BsPerson
                    size={24}
                    className={getThemeClassNames(TEXT_CLASSES)}
                  />
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
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm transition-all duration-200"
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
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="dark:bg-slate-700 bg-slate-100 md:hidden px-4 py-4 absolute top-16 left-0 w-full"
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
