import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, TableRow, TableCell, TextArea } from "semantic-ui-react";
import styled from "styled-components";

import { deleteProduct, updateProduct } from "../actions";
import EditIcon, { StyledIcon } from "./EditIcon";

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
    if (editing === 1) {
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
      <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
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
      <TableCell>{new Date(updatedAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <EditIcon {...{ editing, setEditing }} />
      </TableCell>
    </StyledRow>
  );
};

export default EditableProductRow;
