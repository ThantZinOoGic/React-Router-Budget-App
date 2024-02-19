import { formatCurrency } from "../helpers";

export default function ExpeneseItem({expense})
{
    return(<>
        <td >{expense.name}</td>
        <td >{formatCurrency(expense.amount)}</td>
        <td >{new Date(expense.createAt).toLocaleDateString()}</td>
    </>)
}