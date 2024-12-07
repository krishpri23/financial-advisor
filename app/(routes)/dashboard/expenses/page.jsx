'use client';

import React, { useState, useEffect } from 'react';
import ExpenseItem from './_components/ExpenseTable';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns } from 'drizzle-orm';
import { budgetTable, expenseTable } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import ExpenseTable from './_components/ExpenseTable';

const Expense = () => {
  const [expenseList, setExpenseList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getAllExpenses();
  }, [user]);
  /**
   * Used to get All expenseTable belong to users
   */
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: expenseTable.id,
        name: expenseTable.name,
        amount: expenseTable.amount,
        createdBy: expenseTable.createdBy,
      })
      .from(budgetTable)
      .rightJoin(expenseTable, eq(budgetTable.id, expenseTable.budgetID))
      .where(eq(budgetTable.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(expenseTable.id));

    setExpenseList(result);
  };
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expense Table</h2>

      <ExpenseTable
        refreshData={() => getAllExpenses()}
        expensesList={expenseList}
      />
    </div>
  );
};
export default Expense;
