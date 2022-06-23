import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Table } from "semantic-ui-react";
import styled from "styled-components";

import { getInventory } from "../../user/vending-machine/actions";
import AddProduct from "./components/AddProduct";
import EditableRow from "./components/EditableRow";
import vendingMachine from "../../../assets/vending-machine.jpg";

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

const TruncatedHeaderCell = styled(Table.HeaderCell)`
  text-overflow: ellipsis;
  overflow: hidden;
`

const columnOrder = [
  "Delete",
  "createdAt",
  "productId",
  "name",
  "price",
  "description",
  "currentInventory",
  "maximumInventory",
  "updatedAt",
  "Save",
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
          <Table style={{ tableLayout: "fixed" }}>
            <Table.Header>
              <Table.Row>
                {columnOrder.map((heading, idx) => (
                  <TruncatedHeaderCell key={idx} title={heading}>{heading}</TruncatedHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sodas.map((soda, idx) => (
                <EditableRow key={idx} {...{ dispatch, soda }} />
              ))}
            </Table.Body>
          </Table>
        )}
        <AddProduct />
      </Panel>
    </>
  );
};

export { AdminPanel };
