import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Segment, Table } from "semantic-ui-react";
import styled from "styled-components";

import vendingMachine from "../../../assets/vending-machine.jpg";
import { getInventory } from "../../user/vending-machine/actions";

const Background = styled.div`
  background-image: url("${vendingMachine}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(4px);
  height: 100%;
  width: 100%;
`;

const Panel = styled(Segment)`
  background-color: lightgray;
  border-radius: 5px;
  left: 50%;
  min-height: 400px;
  min-width: 600px;
  position: absolute !important;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 90%;
  z-index: 999;
`;

const OpacityLayer = styled.div`
  background-color: black;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  opacity: 0.8;
  width: 100%;
`;

const columnOrder = [
  "createdAt",
  "currentInventory",
  "description",
  "maximumInventory",
  "name",
  "price",
  "productId",
  "updatedAt",
];

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { sodas } = useSelector((state) => state.soda);

  useEffect(() => {
    if (!sodas) {
      dispatch(getInventory());
    }
  }, [sodas]);

  return (
    <>
      <Background />
      <OpacityLayer />
      <Panel>
        {sodas && (
          <Table>
            <Table.Header>
              <Table.Row>
                {Object.keys(sodas[0]).map((key, idx) => (
                  <Table.HeaderCell key={idx}>
                    {columnOrder[idx]}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sodas.map((soda, idx) => (
                <Table.Row key={idx}>
                  {columnOrder.map((key, idx2) => (
                    <Table.Cell key={idx2}>{soda[key]}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
        <Button>Save Changes</Button>
      </Panel>
    </>
  );
};

export { AdminPanel };
