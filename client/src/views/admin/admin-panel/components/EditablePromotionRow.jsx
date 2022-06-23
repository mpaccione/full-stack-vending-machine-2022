import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, TableCell } from "semantic-ui-react";

import { deletePromotion, updatePromotion } from "../actions";
import { StyledIcon, StyledRow } from "./EditableProductRow";

const EditablePromotionRow = ({ promotion }) => {
  const [editing, setEditing] = useState(-1);
  const [localPromotion, setLocalPromotion] = useState(promotion);
  const dispatch = useDispatch();
  const { createdAt, discount, endDate, promotionId, startDate, updatedAt } =
    localPromotion;

  const onChange = (key, val) => {
    setLocalPromotion(...{ localPromotion, [key]: val });
  };

  useEffect(() => {
    if (editing === 0) {
      const saved = dispatch(updatePromotion(localPromotion));
      saved && setEditing(-1);
    }
  }, [dispatch, editing, localPromotion]);

  return (
    <StyledRow>
      <TableCell>
        <StyledIcon
          name="close"
          onClick={() => {
            dispatch(deletePromotion(promotionId));
          }}
        />
      </TableCell>
      <TableCell>{createdAt}</TableCell>
      <TableCell>{promotionId}</TableCell>
      <TableCell>
        <Input
          disabled={editing}
          onChange={(e) => onChange("startDate", e.target.value)}
          value={startDate}
        />
      </TableCell>
      <TableCell>
        <Input
          disabled={editing}
          onChange={(e) => onChange("endDate", e.target.value)}
          value={endDate}
        />
      </TableCell>
      <TableCell>
        <Input
          disabled={editing}
          onChange={(e) => onChange("discount", e.target.value)}
          type="number"
          value={discount}
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

export default EditablePromotionRow;
