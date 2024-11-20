import BudgetList from "./_components/BudgetList";

const Budget = () => {
  return (
    <div className="w-full px-10 py-5">
      <h2 className="font-bold text-lg"> Budgets page</h2>
      <BudgetList />
    </div>
  );
};

export default Budget;
