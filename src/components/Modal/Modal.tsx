import React, { FC, useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import { Backdrop, ModalContent } from "./Modal.styled";

const ModalRoot: HTMLElement = document.getElementById("modal-root")!;

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ onClose, children }): JSX.Element => {
  const isModalOpened = useRef<boolean>(false);

  const closeModal = (e: KeyboardEvent | React.MouseEvent<HTMLDivElement>) => {
    if (
      (e instanceof KeyboardEvent && e.code === "Escape") ||
      (e instanceof MouseEvent && e.currentTarget === e.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isModalOpened.current === false) {
      isModalOpened.current = true;
      window.addEventListener("keydown", closeModal);
      return;
    }

    return () => window.removeEventListener("keydown", closeModal);
  });

  return createPortal(
    <Backdrop onClick={closeModal}>
      <ModalContent>{children}</ModalContent>
    </Backdrop>,
    ModalRoot
  );
};
