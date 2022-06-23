import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { requestSoda } from "../actions";
import { setSelectedId } from "../../../../redux/sodaSlice";
import canDrop from "../../../../assets/can-drop.wav";
import chaChing from "../../../../assets/cha-ching.wav";
import coinRefund from "../../../../assets/coin-refund.wav";
import error from "../../../../assets/error.wav";
import Numpad from "./Numpad";
import quarter from "../../../../assets/quarter.jpg";

const CoinReturn = styled.div`
  background: ${(props) => props.theme.shadowGradient};
  background-color: black;
  border-radius: 15px;
  height: 50px;
  margin: auto;
  width: 200px;
`;

const CoinSlot = styled.div`
  background: ${(props) => props.theme.shadowGradient};
  background-color: black;
  height: 80px;
  width: 25px;
`;

const CoinSlotWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;

  h3 {
    margin: 0 auto;
  }
`;
const Frame = styled.div`
  background: ${(props) => props.theme.metalGradient2};
  background-color: gray;
  border-right: darkgray 30px solid;
  padding: 50px;
  position: relative;
  height: calc(100% - 100px);
  width: 30%;
`;

const InputScreen = styled.div`
  background-color: black;
  border-radius: darkgray;
  color: red;
  font-size: 2em;
  text-align: center;
  width: 50%;
`;

const Quarter = styled.img`
  animation: pulse 4s infinite;
  display: block;
  cursor: grab;
  height: 50px;
  margin: 50px auto;
  transition: 0.5s all;
  transform: scale(1);
  width: 50px;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const RefundMoney = styled.div`
  background-color: darkgray;
  border-radius: 50%;
  box-shadow: 0px 0px 5px #000;
  cursor: pointer;
  height: 50px;
  width: 50px;
`;

const ScreenWrapper = styled.div`
  display: flex;
  background-color: black;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
`;

const canDropAudio = new Audio(canDrop);
const errorAudio = new Audio(error);
const insertCoinAudio = new Audio(chaChing);
const refundCoinAudio = new Audio(coinRefund);

const RightMachine = () => {
  const { selectedId } = useSelector(state => state.soda);
  const [depositedAmount, setDepositedAmount] = useState(
    window.localStorage.getItem("amount")
      ? window.localStorage.getItem("amount")
      : 0
  );
  const [dragOverCoinSlot, setDragOverCoinSlot] = useState(false);
  const dispatch = useDispatch();

  const buySoda = () => {
    if (depositedAmount < 1 || selectedId === undefined) {
      return errorAudio.play();
    }

    if (dispatch(requestSoda(selectedId))){
      canDropAudio.play();
      dispatch(setSelectedId());
      setDepositedAmount(0);
    } else {
      errorAudio.play()
    }
  };

  return (
    <Frame>
      <ScreenWrapper>
        <InputScreen>#{selectedId}</InputScreen>
        <InputScreen>${depositedAmount}</InputScreen>
      </ScreenWrapper>
      <CoinSlotWrapper>
        <h3>Insert Coin</h3>
        <CoinSlot
          onDragOver={() => {
            setDragOverCoinSlot(true);
          }}
        />
        <h3>Refund Coin</h3>
        <RefundMoney
          onClick={() => {
            depositedAmount > 0 && refundCoinAudio.play();
            setDepositedAmount(0);
          }}
        />
      </CoinSlotWrapper>
      <Numpad {...{ buySoda, selectedId }} />
      <Quarter
        draggable="true"
        onDragEnd={() => {
          if (dragOverCoinSlot) {
            insertCoinAudio.play();
            setDepositedAmount(depositedAmount + 0.25);
          }
        }}
        src={quarter}
      />
      <CoinReturn />
    </Frame>
  );
};

export default RightMachine;
