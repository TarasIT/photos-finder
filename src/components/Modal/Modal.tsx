import React, { FC, useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { Backdrop, ModalContent } from "./Modal.styled";

const ModalRoot: HTMLElement = document.getElementById("modal-root")!;

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ onClose, children }): JSX.Element => {
  const isModalOpenedRef = useRef<boolean>(false);

  const closeModal = (e: KeyboardEvent | React.MouseEvent<HTMLDivElement>) => {
    if (
      (e instanceof KeyboardEvent && e.code === "Escape") ||
      e.currentTarget === e.target
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isModalOpenedRef.current === false) {
      isModalOpenedRef.current = true;
      window.addEventListener("keydown", closeModal);
      return;
    }

    return () => window.removeEventListener("keydown", closeModal);
  }, []);

  return createPortal(
    <Backdrop onClick={closeModal}>
      <ModalContent>{children}</ModalContent>
    </Backdrop>,
    ModalRoot
  );
};
