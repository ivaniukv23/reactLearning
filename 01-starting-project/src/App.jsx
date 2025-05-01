import { useState } from "react";

import Header from "./components/Header"
import InputGroup from "./components/InputGroup"
import Result from "./components/Result"

import {calculateInvestmentResults} from "./util/investment"

function App() {

  const [data, setData] = useState({
    initialInvestment: 1000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
})

const inputIsValid = data.duration >= 1;

function handleChangeData(value, dataType) {
    setData(prevData => {
        const newData = {...prevData, [dataType] : +value,};
        return newData;
    }) 
    
}

console.log(data)


  return (
  <>
    <Header />
    <InputGroup onChangeData={handleChangeData} userInput={data}/>
    {inputIsValid && <Result table={calculateInvestmentResults(data)}/>}
    {!inputIsValid && <p className="center">Please enter a correct data :(</p>}
  </>
    
  )
}

export default App
