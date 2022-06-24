import React from "react";
import styled from 'styled-components'

const SodaImage = styled.div`
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
  margin: auto;
  width: 100%;
`;

const SodaItem = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  flex-basis: 33.33%;
  max-height: 300px;
  position: relative;
  transition: 0.5s all;

  &.selected h3 {
    color: green !important;
  }
`;

const SodaLabel = styled.h3`
  background-color: white;
  color: black;
  text-align: center;

  span:first-of-type {
    background-color: white;
    border-radius: 50%;
    font-size: 1.3em;
    font-weight: bolder;
  }
`;

const SodaQuantity = styled.label`
  align-items: center;
  color: white;
  display: flex;
  font-weight: bolder;
  justify-content: center;
  height: 30px;
  position: relative;
  left: calc(50% - 35px);
  top: 15px;
  width: 70px;
`

const generateQuantityColor = (current, max) => {
  const stockRatio = current / max;

  if (stockRatio > 0.66) {
    return "darkgreen";
  } else if (stockRatio > 0.33) {
    return "darkorange";
  } else {
    return "darkred";
  }
};

const Soda = ({
  currentInventory,
  productId,
  image,
  maximumInventory,
  name,
  price,
  onClick,
  selectedId,
}) => (
  <SodaItem className={productId == selectedId ? "selected" : ""} onClick={onClick}>
    <SodaImage style={{ backgroundImage: `url('${image}')` }} />
    <SodaQuantity
      style={{
        backgroundColor: generateQuantityColor(currentInventory, maximumInventory),
      }}
    >
      {currentInventory}/{maximumInventory}
    </SodaQuantity>
    <SodaLabel>
      <span>#{productId}</span>
      <br />
      <span>${parseFloat(price).toFixed(2)}</span>
    </SodaLabel>
  </SodaItem>
);

export default Soda;
