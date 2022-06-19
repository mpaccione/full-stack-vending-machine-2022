import React from "react";
import { Container } from "semantic-ui-react";
import styled from 'styled-components'

import LeftMachine from "./components/LeftMachine";
import RightMachine from "./components/RightMachine";

const VendingContainer = styled(Container)`
    display: flex;
    height: 100%;
`

const VendingMachine = () => {
  return (
    <VendingContainer>
      <LeftMachine />
      <RightMachine />
    </VendingContainer>
  );
};

export { VendingMachine };
