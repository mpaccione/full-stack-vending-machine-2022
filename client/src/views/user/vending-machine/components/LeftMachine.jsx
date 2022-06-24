import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { setSelectedId } from "../../../../redux/sodaSlice";
import Soda from "./Soda";

const Frame = styled.div`
  background: ${(props) => props.theme.metalGradient1};
  background-color: gray;
  border-left: darkgray 30px solid;
  border-right: darkgray 30px solid;
  padding: 50px;
  position: relative;
  height: calc(100% - 100px);
  width: 70%;
`;

const SodaContainer = styled.div`
  display: flex;
  background-color: black;
  border-radius: 15px;
  flex-wrap: wrap;
  height: calc(100% - 150px);
  justify-content: flex-start;
  padding: 60px 15px 120px 15px;
`;

const SodaDescription = styled.div`
  animation: popIn 5s infinite;
  bottom: 25%;
  color: green;
  position: absolute;
  left: 0px;
  text-align: center;
  transition: 0.5s all;
  width: 100%;
  z-index: 2;

  @keyframes popIn {
    0% {
      font-size: 1.05em;
    }
    50% {
      font-size: 1.2em;
    }
    100% {
      font-size: 1.05em;
    }
  }
`;

const SodaDispenser = styled.div`
  background: ${(props) => props.theme.shadowGradient};
  background-color: black;
  border-radius: 15px;
  height: 80px;
  margin: auto;
  margin-top: 25px;
  width: 50%;
`;

const LeftMachine = () => {
  const { currentPromotions, selectedId, sodas } = useSelector((state) => state.soda);
  const dispatch = useDispatch();

  const getDisplayPrice = (s) => {
    if (currentPromotions.hasOwnProperty(s.productId)) {
      return s.price - (s.price * (currentPromotions[s.productId].discount / 100)) // apply discount percentage if promotion
    }
    return s.price
  }

  return (
    <Frame>
      <SodaContainer>
        {sodas &&
          sodas.map((s, idx) => (
            <Soda
              {...{
                ...s,
                price: getDisplayPrice(s),
                selectedId,
              }}
              key={idx}
              onClick={() => {
                dispatch(setSelectedId(s.productId));
              }}
            />
          ))}
        <SodaDescription>
          {selectedId !== null
            ? sodas.find((s) => s.productId === selectedId)?.description
            : ""}
        </SodaDescription>
      </SodaContainer>
      <SodaDispenser />
    </Frame>
  );
};

export default LeftMachine;
