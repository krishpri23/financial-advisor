"use client";

import React, { useState, useEffect } from "react";
import ExpenseItem from "./_components/ExpenseTable";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { budgetTable, expenseTable } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";

const Expense = () => {
  const [expenseList, setExpenseList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getExpenses();
  }, [user]);

  const getExpenses = async () => {
    const result = await db
      .select({ ...getTableColumns(expenseTable) })
      .from(budgetTable)
      .rightJoin(expenseTable, eq(expenseTable.budgetID, budgetTable.id))
      .where(eq(budgetTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(expenseTable.id));

    setExpenseList(result);
  };

  return (
    <div className="px-10 py-5">
      <h1>EXpense page</h1>
      <ExpenseItem expenseList={expenseList} />
    </div>
  );
};

export default Expense;
