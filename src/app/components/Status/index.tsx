/**
 *
 * Status
 *
 */
import styled from "styled-components/macro";

interface Props {
  active: boolean;
}

export const Status = styled.div<Props>`
  width: fit-content;
  padding: 4px 5px;
  margin: auto;
  border-radius: 11px;
  font-family: Inter;
  font-size: 10px;
  line-height: 12px;
  font-weight: 500;
  text-transform: uppercase;
  ${(p) =>
    p.active
      ? `
  background: #04C35C;
  color: #FFFFFF;
`
      : `
    color: #606F89;
    background: transparent;
    border: 1px solid #606F89;
`}
`;
