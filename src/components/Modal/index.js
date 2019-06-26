import React from "react";
import './index.css'

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={show ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                {children}
                <button onClick={handleClose}>close</button>
            </section>
        </div>
    );
};

export default Modal;