export const delay = () => new Promise(res => 
    setTimeout(res, Math.random() * 2000))

//get data
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

//get all item fom local storage

export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value);
}
//color

function generateRandomColor ()
{
    const existingBudgetLength = fetchData("budgets")?.length??0;
    return `${existingBudgetLength *34} 65% 50%`;
}


//delete item

export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id)
    {
        const newData = existingData.filter(item => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

//create budget
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
    const isExit = existingBudget.filter(item => item.name === name);
    if(isExit.length > 0){
        return null;
    }
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