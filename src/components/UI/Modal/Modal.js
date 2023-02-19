import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import styles from "./Modal.module.css";

const BackDrop = (props) => {
  return <div className={styles.backdrop} onClick={props.toggle} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop toggle={toggleCartHandler} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
