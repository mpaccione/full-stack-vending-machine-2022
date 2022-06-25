import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, TableCell } from "semantic-ui-react";

import { deletePromotion, updatePromotion } from "../actions";
import { StyledRow } from "./EditableProductRow";
import EditIcon, { StyledIcon } from "./EditIcon";

const EditablePromotionRow = ({ promotion }) => {
  const [editing, setEditing] = useState(-1);
  const [localPromotion, setLocalPromotion] = useState(promotion);
  const dispatch = useDispatch();
  
  const { createdAt, discount, endDate, productId, promotionId, startDate, updatedAt } =
    localPromotion;

  const onChange = (key, val) => {
    setLocalPromotion({ ...localPromotion, [key]: val });
  };

  useEffect(() => {
    if (editing === 1) {
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
      <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{productId}</TableCell>
      <TableCell>{promotionId}</TableCell>
      <TableCell>
        <Input
          disabled={editing === 0 ? false : true}
          onChange={(e) => onChange("startDate", e.target.value)}
          value={startDate}
        />
      </TableCell>
      <TableCell>
        <Input
          disabled={editing === 0 ? false : true}
          onChange={(e) => onChange("endDate", e.target.value)}
          value={endDate}
        />
      </TableCell>
      <TableCell>
        <Input
          disabled={editing === 0 ? false : true}
          onChange={(e) => onChange("discount", e.target.value)}
          type="number"
          value={discount}
        />
      </TableCell>
      <TableCell>{new Date(updatedAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <EditIcon {...{ editing, setEditing }} />
      </TableCell>
    </StyledRow>
  );
};

export default EditablePromotionRow;
