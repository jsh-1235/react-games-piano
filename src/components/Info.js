import React from "react";

import styled from "styled-components";

const StyledSpan = styled.span`
  text-align: center;
  font-weight: normal;
  font-size: 1rem;
  color: ${(props) => (props.color ? "white" : "#1c313a")};
  background-color: ${(props) => props.color || "transparent"};
  border-radius: 8px;
  padding: 10px;
  margin: 0px;
`;

export default function Info({ note, color }) {
  return <StyledSpan color={color}>{note}</StyledSpan>;
}
