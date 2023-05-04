import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
const BackDrop = (props) => {
  return <div onClick={props.onCloseCart} className={classes.backdrop}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes["modal-content"]}>{props.children}</div>
    </div>
  );
};
const portalSelector = document.getElementById("overlay");
const portalSelectorBackdrop = document.getElementById("overlayBackdrop");


const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop key="backdrop" onCloseCart={props.onCloseCart}/>, portalSelectorBackdrop)}
      {ReactDOM.createPortal(
        <ModalOverlay key="modalOverlay">{props.children}</ModalOverlay>,
        portalSelector
      )}
    </>
  );
};
export default Modal;
