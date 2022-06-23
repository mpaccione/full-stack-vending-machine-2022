import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon, Input, TableRow, TableCell, TextArea } from "semantic-ui-react";
import styled from "styled-components";

import { deleteProduct, updateProduct } from "../actions";

export const StyledIcon = styled(Icon)`
  cursor: pointer;
  transition: 0.25s all;

  &:hover {
    transform: scale(1.5);
  }
`;

export const StyledRow = styled(TableRow)`
  td {
    overflow: hidden !important;

    .input,
    input,
    textarea {
      width: 100%;
    }
  }
`;

const EditableProductRow = ({ soda }) => {
  const [editing, setEditing] = useState(-1);
  const [localSoda, setLocalSoda] = useState(soda);
  const dispatch = useDispatch();
  const {
    createdAt,
    currentInventory,
    description,
    maximumInventory,
    name,
    price,
    productId,
    updatedAt,
  } = localSoda;

  const onChange = (key, val) => {
    setLocalSoda(...{ localSoda, [key]: val });
  };

  useEffect(() => {
    if (editing === 0) {
      const saved = dispatch(updateProduct(localSoda));
      saved && setEditing(-1);
    }
  }, [dispatch, editing, localSoda]);

  return (
    <StyledRow>
      <TableCell>
        <StyledIcon
          name="close"
          onClick={() => {
            dispatch(deleteProduct(productId));
          }}
        />
      </TableCell>
      <TableCell>{createdAt}</TableCell>
      <TableCell>{productId}</TableCell>
      <TableCell>
        <Input
          disabled={editing}
          onChange={(e) => onChange("name", e.target.value)}
          value={name}
        />
      </TableCell>
      <TableCell>
        <Input
          disabled={editing}
          onChange={(e) => onChange("price", e.target.value)}
          value={price}
        />
      </TableCell>
      <TableCell>
        <TextArea
          disabled={editing}
          onChange={(e) => onChange("description", e.target.value)}
          value={description}
        />
      </TableCell>
      <TableCell>
        <Input
          disabled={editing}
          onChange={(e) => onChange("currentInventory", e.target.value)}
          value={currentInventory}
        />
      </TableCell>
      <TableCell>
        <Input
          disabled={editing}
          onChange={(e) => onChange("maximumInventory", e.target.value)}
          value={maximumInventory}
        />
      </TableCell>
      <TableCell>{updatedAt}</TableCell>
      <TableCell>
        <StyledIcon
          name={editing ? "save" : "edit"}
          onClick={() => {
            setEditing(editing ? 0 : 1);
          }}
        />
      </TableCell>
    </StyledRow>
  );
};

export default EditableProductRow;