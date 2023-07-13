import React, { FC } from "react";
import { LoadButton } from "./Button.styled";

interface LoadMoreBtnProps {
  onBtnClick: () => void;
}

export const LoadMoreBtn: FC<LoadMoreBtnProps> = ({
  onBtnClick,
}): JSX.Element => {
  return (
    <LoadButton type="button" onClick={onBtnClick}>
      Load more
    </LoadButton>
  );
};
