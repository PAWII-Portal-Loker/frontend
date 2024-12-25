"use client";

import useAuthStore from "@auth/store";
import { ROLE_JOB_SEEKER } from "@enums/types/roles";
import Head from "next/head";
import NotAuthorizedPage from "src/app/not-authorized";

const MyApplicationsLayout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthStore();

  if (auth.role !== ROLE_JOB_SEEKER) {
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
