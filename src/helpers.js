export const delay = () => new Promise(res => 
    setTimeout(res, Math.random() * 2000))

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

function generateRandomColor ()
{
    const existingBudgetLength = fetchData("budgets")?.length??0;
    return `${existingBudgetLength *34} 65% 50%`;
}

export const deleteItem = (key) => {
    return localStorage.removeItem(key);
}

//creatte
export function createBudget ({name, amount})
{
    const newItem = {
        id : crypto.randomUUID(),
        name : name,
        amount : +amount,
        createAt : Date.now(),
        color : generateRandomColor()
    };

    const existingBudget = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudget, newItem]));
}

// create expense 
export function createExpense ({name, amount, budgetId})
{
    const newItem = {
        id : crypto.randomUUID(),
        name : name,
        amount : +amount,
        createAt : Date.now(),
        budgetId : budgetId
    };

    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
}

//total spent by budget

export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData('expenses') ?? [];
    const budgetSpent = expenses.reduce((acc, expense) =>{
        if(expense.budgetId !== budgetId) return acc;
        return acc+= expense.amount;
    }, 0); 
    return budgetSpent;
}

//format precentage
 export const formatingPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style : "percent",
        minimumFractionDigits : 0
    })
 }
//format currency

export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined,{
        style : "currency",
        currency : "USD"
    })
}