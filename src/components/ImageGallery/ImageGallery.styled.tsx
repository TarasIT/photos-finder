import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Gallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const LeftArrow = styled(FaArrowLeft)`
  position: absolute;
  top: 50%;
  left: -75px;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  color: #ffffff62;
  cursor: pointer;
  transition: color 300ms;

  &:hover,
  &:focus {
    color: white;
  }
`;

export const RightArrow = styled(FaArrowRight)`
  position: absolute;
  top: 50%;
  right: -75px;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  color: #ffffff62;
  cursor: pointer;
  transition: color 300ms;

  &:hover,
  &:focus {
    color: white;
  }
`;
