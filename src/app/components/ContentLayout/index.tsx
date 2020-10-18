/**
 *
 * PageLayout
 *
 */
import React, { FC } from "react";
import styled from "styled-components/macro";

interface Props {
  title: String;
}

export const ContentLayout: FC<Props> = ({ title, children }) => {
  return (
    <Wrapper>
      <PageHeader>
        <Title>{title}</Title>
      </PageHeader>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 44px;
  grid-template-rows: 34px auto minmax(0, 1fr);
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  font-family: Mulish, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.3px;
  color: #252733;
`;
