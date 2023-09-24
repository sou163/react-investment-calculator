import React, { useState } from "react";

import Header from "./components/Header/Header";
import InvestmentForm from "./components/Form/InvestmentForm";
import ResultTable from "./components/ResultTable/ResultTable";

export default function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];

  if (userInput) {
    let curSavings = +userInput["current-savings"];
    const yrlyContribution = +userInput["yearly-contribution"];
    const returnAmt = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yrlyInterest = curSavings * returnAmt;
      curSavings += yrlyInterest + yrlyContribution;

      yearlyData.push({
        year: i + 1,
        yearlyInterest: yrlyInterest,
        savingsEndOfYear: curSavings,
        yearlyContribution: yrlyContribution
      });
    }
  }

  const fallbackText = (
    <p style={{ textAlign: "center" }}>
      There are no investments made currently!
    </p>
  );

  return (
    <div>
      <Header />
      <InvestmentForm onCalculate={calculateHandler} />

      {userInput === null && fallbackText}
      {userInput && (
        <ResultTable data={yearlyData} initial={userInput["current-savings"]} />
      )}
    </div>
  );
}
