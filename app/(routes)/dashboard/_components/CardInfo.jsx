'use client';

import React, { useEffect, useState } from 'react';
import {
  DollarSign,
  PiggyBank,
  NotebookTabs,
  HandCoins,
  Sparkles,
} from 'lucide-react';
import getFinancialAdvice from '@/utils/getFinancialAdvice';
const CardInfo = ({ budgetList, incomeList }) => {
  const [totalBudget, setTotalBudget] = useState();
  const [totalSpent, setTotalSpent] = useState();
  const [budgetCount, setBudgetCount] = useState();
  const [totalIncome, setTotalIncome] = useState();
  const [finAdvice, setFinAdvice] = useState();

  useEffect(() => {
    if (budgetList?.length > 0 || incomeList?.length > 0) {
      calculateCardInfo();
    }
  }, [budgetList, incomeList]);

  //   generate financial advice
  useEffect(() => {
    if (totalBudget > 0 && totalIncome > 0 && totalSpent > 0) {
      const fetchFinancialAdvice = async () => {
        const advice = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpent
        );

        console.log(advice, 'inside card info');

        setFinAdvice(advice);
      };
      fetchFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpent]);

  const calculateCardInfo = () => {
    let budget = 0;
    let income = 0;
    let spent = 0;

    budgetList.forEach((item) => {
      budget = budget + Number(item.amount);
      spent = spent + item.totalSpent;
    });

    incomeList.forEach((item) => {
      income = income + item.totalAmount;
    });

    setTotalBudget(budget);
    setTotalIncome(income);
    setTotalSpent(spent);
    setBudgetCount(budgetList?.length);
  };

  return (
    <>
      {/* ai section */}
      {budgetList?.length > 0 ? (
        <>
          {/* <div className="flex flex-col justify-center items-start gap-4 p-10  border border-slate-200 rounded-md ">
            <div className="flex justify-start items-center  gap-2">
              <h2 className="text-xl font-semibold"> Finance Smart AI </h2>
              <Sparkles className="text-amber-900" />
            </div>
            <p className="px-5 py-2 font-lg">
              {' '}
              {finAdvice || 'Loading Financial Advice...'}{' '}
            </p>
          </div> */}

          <div className="flex flex-wrap justify-start items-center gap-10 mt-10">
            <div className="flex justify-between items-center border border-gray-200 rounded-lg p-6 bg-white shadow-sm w-80 h-32 ">
              <div className="flex flex-col justify-start items-start gap-3  ">
                <h2> Total Budget</h2>
                <h1 className="font-bold text-2xl"> ${totalBudget}</h1>
              </div>

              <div className="rounded-full bg-blue-900 p-5">
                <PiggyBank className="text-white " />
              </div>
            </div>

            <div className="flex justify-between items-center border border-gray-200 rounded-lg p-6 bg-white shadow-sm w-80 h-32 ">
              <div className="flex flex-col justify-start items-start gap-3  ">
                <h2> Total Spent</h2>
                <h1 className="font-bold text-2xl"> ${totalSpent}</h1>
              </div>

              <div className="rounded-full bg-blue-900 p-5">
                <DollarSign className="text-white " />
              </div>
            </div>

            <div className="flex justify-between items-center border border-gray-200 rounded-lg p-6 bg-white shadow-sm w-80 h-32 ">
              <div className="flex flex-col justify-start items-start gap-3  ">
                <h2> No of Budget</h2>
                <h1 className="font-bold text-2xl">{budgetCount} </h1>
              </div>

              <div className="rounded-full bg-blue-900 p-5">
                <NotebookTabs className="text-white " />
              </div>
            </div>

            <div className="flex justify-between items-center border border-gray-200 rounded-lg p-6 bg-white shadow-sm w-80 h-32 ">
              <div className="flex flex-col justify-start items-start gap-3  ">
                <h2> Income</h2>
                <h1 className="font-bold text-2xl">${totalIncome} </h1>
              </div>

              <div className="rounded-full bg-blue-900 p-5">
                <HandCoins className="text-white " />
              </div>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default CardInfo;
