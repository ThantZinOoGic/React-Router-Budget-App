import ExpeneseItem from "./ExpenseItem"

export default function ExpeneseTable({expenses})
{
    return(
        <>
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount", "Date"].map((i,index)=> (
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
                                    <ExpeneseItem expense={expense}/>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}