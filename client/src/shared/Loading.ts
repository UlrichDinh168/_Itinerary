import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const Loading = () => <PuffLoader css= { override } size = { 100} color = '#2C6CAF' />