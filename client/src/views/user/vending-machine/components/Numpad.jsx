import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { setSelectedId } from "../../../../redux/sodaSlice";
import beep from "../../../../assets/beep.wav";

const numStyles = {
  "background-color": "darkred",
  color: "white",
  cursor: "pointer",
  "font-weight": "bolder",
  padding: "15px 0px",
  "text-align": "center",
  transition: "0.5s all",
};

const ButtonWrapper = styled.div`
  display: flex;

  @media (max-width: 767px) {
    flex-direction: column
  }
`

const Num = styled.div`
  ${numStyles}
  flex-basis: 33.33%;
  font-size: 2em;

  &:hover {
    background-color: red;
  }

  @media (max-width: 767px) {
    font-size: 1.2em;
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

  @media (max-width: 767px) {
    font-size: 1em;
    width: 100%;

    &:first-of-type {
      border-right: 5px solid black
    }

    &:last-of-type {
      border-left: 5px solid black
    }
  }
`;

const NumpadWrapper = styled.div`
  border: 5px solid black;
  display: flex;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const audio = new Audio(beep);

const Numpad = ({ buySoda, selectedId }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <NumpadWrapper>
        {new Array(9).fill(null).map((falsey, idx) => (
          <Num
            key={idx}
            onClick={() => {
              audio.play();
              selectedId !== null
                ? dispatch(setSelectedId(selectedId.concat(idx + 1)))
                : dispatch(setSelectedId((idx + 1).toString()));
            }}
          >
            {idx + 1}
          </Num>
        ))}
      </NumpadWrapper>
      <ButtonWrapper>
        <NumpadButton
          onClick={() => {
            audio.play();
            dispatch(setSelectedId(null));
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
      </ButtonWrapper>
    </div>
  );
};

export default Numpad;
