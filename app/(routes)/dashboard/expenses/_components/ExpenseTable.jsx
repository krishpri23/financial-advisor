import { db } from '@/utils/dbConfig';
import { expenseTable } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

function ExpenseTable({ expensesList, refreshData }) {
  console.log(expensesList, 'expenses list');
  const deleteExpense = async (expense) => {
    try {
      const result = await db
        .delete(expenseTable)
        .where(eq(expenseTable.id, expense.id))
        .returning();

      if (result && result.length > 0) {
        toast('Expense Deleted!');
        refreshData();
      } else {
        toast.error('Error deleting expense');
      }
    } catch (error) {
      console.error('Error deleting expense: ', error);
      toast.error('Error deleting expense');
    }
  };
  return (
    <div className="mt-3">
      {expensesList.length > 0 ? (
        <>
          <h2 className="font-bold text-lg">Latest Expenses</h2>
          <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
            <h2 className="font-bold">Name</h2>
            <h2 className="font-bold">Amount</h2>
            <h2 className="font-bold">Date</h2>
            <h2 className="font-bold">Action</h2>
          </div>
          {expensesList?.map((expenses, index) => (
            <div
              key={index}
              className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2"
            >
              <h2>{expenses.name}</h2>
              <h2>{expenses.amount}</h2>
              <h2>{expenses.createdBy}</h2>
              <h2
                onClick={() => deleteExpense(expenses)}
                className="text-red-500 cursor-pointer"
              >
                Delete
              </h2>
              {/* <h2>
            <Trash
              className="text-red-500 cursor-pointer"
              onClick={() => deleteExpense(expenses)}
            />
          </h2> */}
            </div>
          ))}
        </>
      ) : (
        <div className="font-bold text-lg text-center mt-10">
          {' '}
          No expense available{' '}
        </div>
      )}
    </div>
  );
}

export default ExpenseTable;
