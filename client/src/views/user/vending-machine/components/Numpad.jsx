import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { setSelectedId } from "../../../../redux/sodaSlice";
import beep from "../../../../assets/beep.wav";

const numStyles = {
  "background-color": "darkred",
  "color": "white",
  "cursor": "pointer",
  "font-weight": "bolder",
  "padding": "15px 0px",
  "text-align": "center",
  "transition": "0.5s all"
};

const Num = styled.div`
  ${numStyles}
  flex-basis: 33.33%;
  font-size: 2em;

  &:hover {
    background-color: red;
  }
`;

const NumpadButton = styled.button`
  ${numStyles}
  border: 5px solid black;
  border-top: 0px;
  font-size: 1.4em;
  width: 50%;

  &:hover {
    background-color: red;
  }
  
  &:first-of-type {
    border-right: 0px;
  }

  &:last-of-type {
    border-left: 0px;
  }
`;

const NumpadWrapper = styled.div`
  border: 5px solid black;
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const audio = new Audio(beep);

const Numpad = ({ buySoda, chosenId }) => {
  const dispatch = useDispatch()

  return (
    <>
      <NumpadWrapper>
        {new Array(9).fill(null).map((falsey, idx) => (
          <Num
            onClick={() => {
              audio.play();
              chosenId !== undefined
                ? dispatch(setSelectedId(chosenId.concat(idx + 1)))
                : dispatch(setSelectedId((idx + 1).toString()));
            }}
          >
            {idx + 1}
          </Num>
        ))}
      </NumpadWrapper>
      <NumpadButton
        onClick={() => {
          audio.play();
          dispatch(setSelectedId());
        }}
      >
        Clear
      </NumpadButton>
      <NumpadButton
        onClick={() => {
          audio.play();
          buySoda();
        }}
      >
        Select
      </NumpadButton>
    </>
  );
};

export default Numpad;