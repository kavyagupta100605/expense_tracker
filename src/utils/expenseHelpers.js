export const getCategoryTotals = (expenses) => {
    return expenses.reduce((acc,expense)=>{
        if(acc[expense.category]){
            acc[expense.category] += Number(expense.amount);
        }
        else{
            acc[expense.category] = Number(expense.amount);
        }
        return acc;
    },{});
};