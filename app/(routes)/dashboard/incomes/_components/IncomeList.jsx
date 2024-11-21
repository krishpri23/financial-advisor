/**
 * Get Incomes from db and pass the Income to IncomeItem
 */
"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { expenseTable, incomeTable } from "@/utils/schema";
import CreateIncome from "./CreateIncome";
import { db } from "@/utils/dbConfig";
import IncomeItem from "./IncomeItem";

const IncomeList = () => {
  const [incomeList, setIncomeList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getIncomeList();
  }, [user]);

  const getIncomeList = async () => {
    const result = await db
      .select({
        ...getTableColumns(incomeTable),
        totalSpent: sql`sum(cast(${incomeTable.amount} as integer))`.mapWith(
          Number
        ),
        totalItem: sql`count(${incomeTable.id})`.mapWith(Number),
      })
      .from(incomeTable)
      .leftJoin(expenseTable, eq(incomeTable.id, expenseTable.budgetID))
      .where(eq(incomeTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(incomeTable.id)
      .orderBy(desc(incomeTable.id));

    setIncomeList(result);
  };

  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
    md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateIncome refreshData={() => getIncomeList()} />
        {incomeList?.length > 0
          ? incomeList.map((income, index) => (
              <IncomeItem income={income} key={index} />
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

export default IncomeList;
