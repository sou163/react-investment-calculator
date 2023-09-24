import React, { useState } from "react";
import classes from "./InvestmentForm.module.css";

const initialState = {
  "current-savings": 10000,
  "yearly-contribution": 1000,
  "expected-return": 5,
  duration: 3
};

export default function InvestmentForm(props) {
  const [userInput, setUserInput] = useState(initialState);

  const changeHandler = (id, event) => {
    const enteredInput = event.target.value;

    setUserInput((prevState) => {
      return {
        ...prevState,
        [id]: +enteredInput
      };
    });
  };

  const resetHandler = () => {
    setUserInput(initialState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.onCalculate(userInput);
    resetHandler();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            value={userInput["current-savings"]}
            onChange={(event) => {
              changeHandler("current-savings", event);
            }}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            value={userInput["yearly-contribution"]}
            onChange={(event) => {
              changeHandler("yearly-contribution", event);
            }}
          />
        </p>
      </div>
      <div className={classes["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            value={userInput["expected-return"]}
            step="0.1"
            onChange={(event) => {
              changeHandler("expected-return", event);
            }}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            value={userInput["duration"]}
            onChange={(event) => {
              changeHandler("duration", event);
            }}
          />
        </p>
      </div>

      <p className={classes.actions}>
        <button
          type="reset"
          className={classes.buttonAlt}
          onClick={resetHandler}
        >
          Reset
        </button>
        <button type="submit" className={classes.button}>
          Calculate
        </button>
      </p>
    </form>
  );
}
