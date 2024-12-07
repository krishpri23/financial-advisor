// This is the page where we add new expenses to the budget we created

'use client';
import { db } from '@/utils/dbConfig';
import { budgetTable, expenseTable } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';
import ExpenseTable from '../_components/ExpenseTable';

/* @next-codemod-ignore */
const ExpenseItemPage = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setbudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();
  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  // make a budget item call to api
  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(budgetTable),
        totalSpent: sql`SUM(CAST(${expenseTable.amount} AS NUMERIC))`.as(
          'totalSpent'
        ),
        totalItem: sql`COUNT(${expenseTable.id})`.as('totalItem'),
      })
      .from(budgetTable)
      .leftJoin(expenseTable, eq(budgetTable.id, expenseTable.budgetID))
      .where(eq(budgetTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(budgetTable.id, params.id)) /* @next-codemod-ignore */
      .groupBy(budgetTable.id);

    setbudgetInfo(result[0]);
    getExpensesList();
  };

  /**
   * Get Latest Expenses
   */
  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(expenseTable)
      /* @next-codemod-ignore */
      .where(eq(expenseTable.budgetID, params?.id))
      .orderBy(desc(expenseTable.id));
    setExpensesList(result);
    console.log(result, 'from expenses id page');
  };

  /**
   * Used to Delete budget
   */
  const deleteBudget = async () => {
    const deleteExpenseResult = await db
      .delete(expenseTable)
      .where(eq(expenseTable.budgetID, params?.id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db
        .delete(budgetTable)
        .where(eq(budgetTable.id, params?.id))
        .returning();
    }
    toast('Budget Deleted !');
    route.replace('/dashboard/budgets');
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 rounded-full" variant="destructive">
                <Trash className="w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div
        className="grid grid-cols-1 
        md:grid-cols-2 mt-6 gap-5"
      >
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div
            className="h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse"
          ></div>
        )}
        {/* @next-codemod-ignore */}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <ExpenseTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
};

export default ExpenseItemPage;
