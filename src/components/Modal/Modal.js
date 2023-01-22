import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  z-index: 1;
  background: #fff;
  border-radius: 15px;
  padding: 15px;
`;

const Modal = ({ children, isOpen, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    const listener = (event) => {
      if (!modalRef.current || modalRef.current.contains(event.target)) {
        return;
      }
      onClose(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [modalRef, onClose]);

  if (!isOpen) {
    return null;
  }
  return (
    <Overlay>
      <ModalContent ref={modalRef}>{children}</ModalContent>
    </Overlay>
  );
};

export default Modal;
