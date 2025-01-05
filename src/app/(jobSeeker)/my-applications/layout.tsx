"use client";

import useAuthStore from "@auth/store";
import { hasPermission } from "@utils/permissions";
import Head from "next/head";
import NotAuthorizedPage from "src/app/not-authorized";

const MyApplicationsLayout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthStore();

  if (!hasPermission(auth, "myApplications", "view")) {
    return <NotAuthorizedPage />;
  }

  return (
    <>
      <Head>
        <title>My Applications</title>
      </Head>
      <section className="p-8">{children}</section>
    </>
  );
};

export default MyApplicationsLayout;
