import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Tab, Table } from "semantic-ui-react";
import styled from "styled-components";

import { getAllPromotions } from "./actions";
import { getInventory } from "../../user/vending-machine/actions";
import AddProduct from "./components/AddProduct";
import AddPromotion from "./components/AddPromotion";
import EditableProductRow from "./components/EditableProductRow";
import EditablePromotionRow from "./components/EditablePromotionRow";
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
`;

const productColumnOrder = [
  "Delete",
  "createdAt",
  "productId",
  "name",
  "price",
  "description",
  "currentInventory",
  "maximumInventory",
  "updatedAt",
  "Edit/Save",
];

const promotionColumnOrder = [
  "Delete",
  "createdAt",
  "productId",
  "startDate",
  "endDate",
  "discount",
  "updatedAt",
  "Edit/Save",
];

const AdminTable = ({ data, columnOrder, type }) => (
  <>
    <h3>{type}</h3>
    {data && (
      <Table style={{ tableLayout: "fixed" }}>
        <Table.Header>
          <Table.Row>
            {columnOrder.map((heading, idx) => (
              <TruncatedHeaderCell key={idx} title={heading}>
                {heading}
              </TruncatedHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {type === "Products"
            ? data.map((soda, idx) => (
                <EditableProductRow key={idx} {...{ soda }} />
              ))
            : data.map((promotion, idx) => (
                <EditablePromotionRow key={idx} {...{ promotion }} />
              ))}
        </Table.Body>
      </Table>
    )}
    {type === "Products" ? <AddProduct /> : <AddPromotion />}
  </>
);

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { allPromotions, sodas } = useSelector((state) => state.soda);

  useEffect(() => {
    if (!allPromotions) {
      dispatch(getAllPromotions());
    }
    if (!sodas) {
      dispatch(getInventory());
    }
  }, [allPromotions, dispatch, sodas]);

  const Products = () => (
    <AdminTable
      {...{ data: sodas, columnOrder: productColumnOrder, type: "Products" }}
    />
  );

  const Promotions = () => (
    <AdminTable
      {...{
        data: allPromotions,
        columnOrder: promotionColumnOrder,
        type: "Promotions",
      }}
    />
  );

  return (
    <>
      <Background />
      <OpacityLayer />
      <Panel>
        <Tab
          panes={[
            { menuItem: "Products", render: () => <Products /> },
            { menuItem: "Promotions", render: () => <Promotions /> },
          ]}
        />
      </Panel>
    </>
  );
};

export { AdminPanel };
