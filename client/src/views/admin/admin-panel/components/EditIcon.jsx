import React from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

export const StyledIcon = styled(Icon)`
  cursor: pointer;
  transition: 0.25s all;

  &:hover {
    transform: scale(1.5);
  }
`;

const EditIcon = ({ editing, setEditing }) => (
  <StyledIcon
    name={editing < 0 ? "edit" : "save"}
    onClick={() => {
      setEditing(editing ? 0 : 1);
    }}
  />
);

export default EditIcon;
