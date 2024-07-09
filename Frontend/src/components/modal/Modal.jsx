import "./Modal.css";
import { IoClose } from "react-icons/io5";
import { useRef, useEffect } from "react";

const Modal = ({ open, close, content, title }) => {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return (
    <div>
      <dialog ref={dialog} onCancel={close} className="adding-employee">
        <div className="adding-employee-header">
          <h3>{title}</h3>
          <span onClick={close}>
            <IoClose />
          </span>
        </div>
        {content}
      </dialog>
    </div>
  );
};

export default Modal;
