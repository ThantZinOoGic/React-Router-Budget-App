import ExpeneseItem from "./ExpenseItem"

export default function ExpeneseTable({expenses, showBudget = true})
{
    return(
        <>
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map((i,index)=> (
                                <th key={index}>{i}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map((expense) => {
                            return (
                                <tr key={expense.id}>
                                    <ExpeneseItem expense={expense} showBudget={showBudget}/>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}