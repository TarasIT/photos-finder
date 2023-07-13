import React, { FC } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Preloader } from "./Loader.styled";

export const Loader: FC = (): JSX.Element => {
  return (
    <Preloader>
      <ThreeDots color="gray" />
    </Preloader>
  );
};
