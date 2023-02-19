import React, { useRef, useState } from "react";

import styles from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    amountInputRef.current.value = 1;
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <>
      <form className={styles.form} onSubmit={submitHandler}>
        <Input
          ref={amountInputRef}
          label="Amount"
          input={{
            id: `amount_${props.id}`,
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <Button type="submit">+ Add</Button>
        {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
      </form>
    </>
  );
};

export default MealItemForm;
