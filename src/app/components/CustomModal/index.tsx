/**
 *
 * CustomModal
 *
 */
import React, { FC } from "react";
import styled from "styled-components/macro";
import { Modal, ModalProps } from "@material-ui/core";

export const CustomModal: FC<ModalProps> = ({ children, ...rest }) => {
  return (
    <Modal {...rest}>
      <ModalWrapper>
        <ModalContent>{children}</ModalContent>
        <ModalTail />
      </ModalWrapper>
    </Modal>
  );
};

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 1160px;
  height: fit-content;
  outline: none;

  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div`
  border-radius: 8px;
  background-color: white;
  padding: 75px;
`;

const ModalTail = styled.div`
  width: 1148px;
  margin: 0 6px;
  border-left: 574px solid transparent;
  border-right: 574px solid transparent;
  border-top: 159px solid white;
`;
