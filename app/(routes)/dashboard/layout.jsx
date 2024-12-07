'use client';

import React, { useEffect } from 'react';
import DashboardHeader from './_components/DashboardHeader';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { db } from '@/utils/dbConfig';
import { budgetTable } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Appsidebar from './_components/Appsidebar';

const layout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  const checkUserBudget = async () => {
    const result = await db
      .select()
      .from(budgetTable)
      .where(
        eq(budgetTable.createdBy, user?.primaryEmailAddress?.emailAddress)
      );

    console.log(result);

    if (result?.length == 0) {
      router.replace('/dashboard/budgets');
    }
  };

  useEffect(() => {
    user && checkUserBudget();
  }, [user]);

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block ">
        <Appsidebar />
      </div>
      <div className="md:ml-64 ">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default layout;
