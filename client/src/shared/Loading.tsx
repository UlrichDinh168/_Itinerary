import React from 'react'

import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const Loading = (): JSX.Element =>
  <div>
    <PuffLoader css={override} size={100} color='#2C6CAF' />

  </div>