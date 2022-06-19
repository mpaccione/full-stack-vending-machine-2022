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
  position: absolute;
  left: calc(50% - 35px);
  top: -45px;
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
  currentQuantity,
  id,
  img,
  maxQuantity,
  name,
  price,
  onClick,
  selectedId,
}) => (
  <SodaItem className={id === selectedId - 1 ? "selected" : ""} onClick={onClick}>
    <SodaImage style={{ backgroundImage: `url(${img})` }} />
    <SodaQuantity
      style={{
        backgroundColor: generateQuantityColor(currentQuantity, maxQuantity),
      }}
    >
      {currentQuantity}/{maxQuantity}
    </SodaQuantity>
    <SodaLabel>
      <span>#{id + 1}</span>
      <br />
      <span>${price}.00</span>
    </SodaLabel>
  </SodaItem>
);

export default Soda;
