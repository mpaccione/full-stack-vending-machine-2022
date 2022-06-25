import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Segment, TextArea } from "semantic-ui-react";
import styled from "styled-components";

import { createProduct } from "../actions";
import { StyledIcon } from "./EditIcon";

const StyledSegment = styled(Segment)`
  align-items: center;
  display: flex;
  justify-content: space-evenly;

  input,
  textarea {
    height: 38px;
    width: calc(100% / 6);
  }
`;

const AddRow = () => {
  const [newRow, setNewRow] = useState({});
  const dispatch = useDispatch();

  const onChange = (key, val) => {
    const copyNewRow = JSON.parse(JSON.stringify(newRow));
    console.log({ val })

    if (key === "image" && val) {
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log(e)
        console.log(e.target.result)
        copyNewRow["image"] = e.target.result;
        setNewRow(copyNewRow);
      };
      reader.onerror = function (err) {
        alert(JSON.stringify(err));
      };
      reader.readAsDataURL(val[0]);
    } else {
      copyNewRow[key] = val;
      setNewRow(copyNewRow);
    }
  };

  return (
    <>
      <h3>Add Product</h3>
      <StyledSegment>
        <Input
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Name"
          value={newRow?.name}
        />
        <Input
          onChange={(e) => onChange("price", e.target.value)}
          placeholder="Price"
          value={newRow?.price}
        />
        <TextArea
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Description"
          value={newRow?.description}
        />
        <Input
          onChange={(e) => onChange("currentInventory", e.target.value)}
          placeholder="Current Inventory"
          value={newRow?.currentInventory}
        />
        <Input
          onChange={(e) => onChange("maximumInventory", e.target.value)}
          placeholder="Maximum Inventory"
          value={newRow?.maximumInventory}
        />
        <Input
          onChange={(e) => onChange("image", e.target.files)}
          type="file"
        />
        <StyledIcon
          name="save"
          onClick={() => {
            const res = dispatch(createProduct(newRow));
            res && setNewRow({})
          }}
          style={{ marginLeft: "15px" }}
        />
      </StyledSegment>
    </>
  );
};

export default AddRow;
