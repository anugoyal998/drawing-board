import React, { useRef } from "react";

export const Modal = (props) => {
  const { open, setOpen, component } = props;
  const modalRef = useRef();
  const handleClick = (e) => {
    if (modalRef.current === e.target) {
      setOpen(false);
    }
  };
  if (open) {
    return (
      <div
        ref={modalRef}
        onClick={handleClick}
        className="fixed top-0 left-0 w-screen h-screen z-20 flex flex-col justify-center items-center"
        style={{ background: "rgba(196, 196, 196, 0.3)" }}
      >
        {component}
      </div>
    );
  } else {
    return null;
  }
};