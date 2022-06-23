import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Input, Segment } from "semantic-ui-react";
import styled from "styled-components";

import { createPromotion } from "../actions";
import { StyledIcon } from "./EditableProductRow";

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSegment = styled(Segment)`
  align-items: center;
  display: flex;
  justify-content: space-evenly;

  input,
  textarea {
    height: 38px;
    width: calc(100% / 4);
  }
`;

const AddPromotion = () => {
  const { sodas } = useSelector((state) => state.soda);
  const [newPromotion, setPromotion] = useState({
    discount: null,
    endDate: null,
    productId: null,
    startDate: null,
  });
  const dispatch = useDispatch();

  return (
    <>
      <h3>Add Promotion</h3>
      <StyledSegment>
        <Column>
          <label>Select Product</label>
          <Dropdown
            onChange={(e, { value }) => {
              setPromotion({ ...newPromotion, productId: value });
            }}
            options={
              sodas &&
              sodas.map(({ name, productId }, idx) => {
                return {
                  key: idx,
                  text: `${productId}: ${name}`,
                  value: productId,
                };
              })
            }
          />
        </Column>
        <Column>
          <label>Start Date</label>{}
          <Input
            type="date"
            onChange={(e) => {
              setPromotion({ ...newPromotion, startDate: e.target.value });
            }}
            value={newPromotion?.startDate}
          />
        </Column>
        <Column>
          <label>End Date</label>
          <Input
            type="date"
            onChange={(e) => {
              setPromotion({ ...newPromotion, endDate: e.target.value });
            }}
            value={newPromotion?.endDate}
          />
        </Column>
        <Column style={{ display: "flex", flexDirection: "column" }}>
          <label>Discount Percentage as Whole Number</label>
          <Input type="number" />
        </Column>
        <StyledIcon
          name="save"
          onClick={() => {
            dispatch(createPromotion(newPromotion));
          }}
        />
      </StyledSegment>
    </>
  );
};

export default AddPromotion;
