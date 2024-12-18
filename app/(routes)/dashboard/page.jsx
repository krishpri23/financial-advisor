'use client';

import { useUser } from '@clerk/nextjs';

import React, { useEffect, useState } from 'react';
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { budgetTable, expenseTable, incomeTable } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseTable from './expenses/_components/ExpenseTable';

const page = () => {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  console.log('budget list from dashboard home page', budgetList);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(budgetTable),
        totalSpent: sql`sum(cast(${expenseTable.amount} as integer))`.mapWith(
          Number
        ),
        totalItem: sql`count(${expenseTable.id})`.mapWith(Number),
      })
      .from(budgetTable)
      .leftJoin(expenseTable, eq(budgetTable.id, expenseTable.budgetID))
      .where(eq(budgetTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(budgetTable.id)
      .orderBy(desc(budgetTable.id));

    setBudgetList(result);

    getAllExpenses();
    getIncomeList();
  };

  const getAllExpenses = async () => {
    try {
      const result = await db
        .select({
          id: expenseTable.id,
          name: expenseTable.name,
          amount: expenseTable.amount,
          createdBy: expenseTable.createdBy,
        })
        .from(budgetTable)
        .rightJoin(expenseTable, eq(budgetTable.id, expenseTable.budgetID))
        .where(
          eq(budgetTable.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(expenseTable.id));

      if (result) {
        setExpensesList(result); // Ensure data is properly set
      }
    } catch (error) {
      console.error('Error fetching expenses: ', error);
    }
  };

  const getIncomeList = async () => {
    const income = await db
      .select({
        ...getTableColumns(incomeTable),
        totalAmount: sql`sum(cast(${incomeTable.amount} as integer))`.mapWith(
          Number
        ),
      })
      .from(incomeTable)
      .groupBy(incomeTable.id);

    setIncomeList(income);
  };
  return (
    <div className="w-full h-full px-10 py-5">
      <h1 className="font-bold text-3xl"> Hi, {user?.fullName} </h1>
      <p className="text-gray-400 text-xl py-3 mb-5">
        {' '}
        Here's what happening with your money, Let's manage your expense
      </p>
      <CardInfo budgetList={budgetList} incomeList={incomeList} />

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          <BarChartDashboard budgetList={budgetList} />

          <ExpenseTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>

        <div className="grid gap-5">
          <h2 className="font-bold text-lg"> Latest budgets</h2>
          {budgetList?.length > 0
            ? budgetList.map((budget, i) => (
                <BudgetItem budget={budget} key={i} />
              ))
            : [1, 2, 3, 4].map((item, i) => (
                <div
                  className="h-[180p] w-full bg-slate-200 lg animate-pulse"
                  key={i}
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default page;
