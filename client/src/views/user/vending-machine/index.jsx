import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'

import { getInventory } from "./actions";
import LeftMachine from "./components/LeftMachine";
import RightMachine from "./components/RightMachine";

const VendingContainer = styled.div`
    display: flex;
    height: 100%;
`

const VendingMachine = () => {
  const { sodas } = useSelector(state => state.soda)
  const dispatch = useDispatch()
  
  const getSodas = () => {
    dispatch(getInventory(true))
  }

  useEffect(() => {
    if (!sodas) {
      getSodas();
    }
  }, [])

  return (
    <VendingContainer>
      <LeftMachine />
      <RightMachine />
    </VendingContainer>
  );
};

export { VendingMachine };
