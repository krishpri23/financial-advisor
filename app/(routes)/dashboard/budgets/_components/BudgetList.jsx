/**
 * Get budgets from db and pass the budget to budgetItem
 */
"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { budgetTable, expenseTable } from "@/utils/schema";
import BudgetItem from "../../_components/BudgetItem";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";

const BudgetList = () => {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(budgetTable),
        totalSpent: sql`sum(${expenseTable.amount})`.mapWith(Number),
        totalItem: sql`count(${expenseTable.id})`.mapWith(Number),
      })
      .from(budgetTable)
      .leftJoin(expenseTable, eq(budgetTable.id, expenseTable.budgetId))
      .where(eq(budgetTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(budgetTable.id)
      .orderBy(desc(budgetTable.id));
    setBudgetList(result);
  };

  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
    md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0
          ? budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg
    h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default BudgetList;
