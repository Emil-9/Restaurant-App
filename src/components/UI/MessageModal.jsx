import classes from "./MessageModal.module.css";
import ReactDOM from "react-dom";

const MessageModal = (props) => {
  const Overlay = document.getElementById("messageModal");
  const modalClass = `${classes["message-modal"]} ${props.className}`;

  return ReactDOM.createPortal(
    <div className={modalClass}>{props.children}</div>,
    Overlay
  );
};

export default MessageModal;
