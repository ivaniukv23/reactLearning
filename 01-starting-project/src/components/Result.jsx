import {formatter} from "../util/investment"

export default function Result({table}) {

    console.log(table)

    const initialInvestment = table[0].valueEndOfYear - table[0].interest - table[0].annualInvestment;

    return (
        <table id="result" className="center">
            <thead >
                <tr>
                    <th itemScope="col">Year</th>
                    <th itemScope="col">Investment Value</th>
                    <th itemScope="col">Interest (Year)</th>
                    <th itemScope="col">Total Interest</th>
                    <th itemScope="col">Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {table.map((item, key) => {
                    const totalInterest = item.valueEndOfYear - item.annualInvestment * item.year - initialInvestment;
                    const totalAmountInvested = item.valueEndOfYear - totalInterest;
                    return (
                        <tr key={key}>
                            <th>{item.year}</th>
                            <th>{formatter.format(item.valueEndOfYear)}</th>
                            <th>{formatter.format(item.interest)}</th>
                            <th>{formatter.format(totalInterest)}</th>
                            <th>{formatter.format(totalAmountInvested)}</th>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}