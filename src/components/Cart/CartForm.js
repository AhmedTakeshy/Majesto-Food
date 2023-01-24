import { useState } from "react";
import styles from "./CartForm.module.css";

const isValid = (value) => value.trim().length > 0;
const isValidPhone = (value) => value.trim().length === 11;

const CartForm = (props) => {
  const [validity, setValidity] = useState({
    name: true,
    address: true,
    phone: true,
  });
  const [data, setData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const changeHandler = (eve) => {
    const { name, value } = eve.target;
    return setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const formSubmitHandler = (eve) => {
    eve.preventDefault();
    const nameValidation = isValid(data.name);
    const addressValidation = isValid(data.address);
    const phoneValidation = isValidPhone(data.phone);

    setValidity({
      name: nameValidation,
      address: addressValidation,
      phone: phoneValidation,
    });

    const isFormValid = nameValidation && addressValidation && phoneValidation;
    if (!isFormValid) {
      return;
    }

    console.log(data);
    props.onConfirm(data);
    setData({
      name: "",
      address: "",
      phone: "",
    });
  };

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <div
        className={`${styles.control} ${validity.name ? "" : styles.invalid}`}
      >
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          value={data.name}
          onChange={changeHandler}
        />
        {!validity.name && <p>Must NOT be empty</p>}
      </div>
      <div
        className={`${styles.control} ${
          validity.address ? "" : styles.invalid
        }`}
      >
        <label htmlFor="address">Address</label>
        <input
          name="address"
          id="address"
          type="text"
          value={data.address}
          onChange={changeHandler}
        />
        {!validity.address && <p>Must NOT be empty</p>}
      </div>
      <div
        className={`${styles.control} ${validity.phone ? "" : styles.invalid}`}
      >
        <label htmlFor="phone">Phone no</label>
        <input
          name="phone"
          id="phone"
          type="text"
          value={data.phone}
          onChange={changeHandler}
          placeholder="(05x)xxx-xx-xx"
        />
        {!validity.phone && <p>Must be a valid phone (11)</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default CartForm;
