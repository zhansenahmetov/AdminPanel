import { Formik, FormikProps, Form } from "formik";
import React, { FC } from "react";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Courier } from "../types";
import { FormBlock, FormLabel, ModalFormTitle } from "app/components/forms";
import { useDispatch } from "react-redux";
import { actions } from "../slice";

interface Props {
  action: "create" | "edit";
  courier?: Courier;
}

interface Values {

    fio: String;
    iin: String;
    phoneNumber: String;
    photo: String;
    scan: String;
    password: String;
    wayOfTransfer: String;
    carNumber: String;
    carBrand: String;
    carPhoto: String;

}

export const CourierFormik: FC<Props> = ({ action, courier }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <Formik<Values>
      initialValues={
        courier ?? {
            fio: "",
            iin: "asd",
            phoneNumber: "",
            photo: "asd",
            scan: "ad",
            password: "asd",
            wayOfTransfer: "",
            carNumber: "lol",
            carBrand: "lol",
            carPhoto: "lol",
      

        }
      }
      onSubmit={(values) => {
        console.log("onSubmit");
        dispatch(actions.createCourier(values));
      }}
    >
      {(formikHelpers) => (
        <Wrapper>
          <ModalFormTitle>
            {t(
              action === "create" ? "create new courier" : "edit courier"
            )}
          </ModalFormTitle>
          <CourierForm {...formikHelpers} />
        </Wrapper>
      )}
    </Formik>
  );
};

const CourierForm: FC<FormikProps<Values>> = ({
  values,
  errors,
  handleSubmit,
  handleChange,
}) => {
  const { t } = useTranslation();

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormColumn>
        <FormBlock>
          <FormLabel>{t("courier name")}</FormLabel>
          <TextField
            id="fio"
            value={values.fio}
            variant={"outlined"}
            onChange={handleChange}
            error={!!errors.fio}
          />
        </FormBlock>
        <FormBlock>
          <FormLabel>{t("contact phone")}</FormLabel>
          <TextField
            id="phoneNumber"
            value={values.phoneNumber}
            variant={"outlined"}
            onChange={handleChange}
            error={!!errors.phoneNumber}
          />
        </FormBlock>
        <FormBlock>
          <FormLabel>{t("way of transfer")}</FormLabel>
          <TextField
            id="wayOfTransfer"
            value={values.wayOfTransfer}
            variant={"outlined"}
            onChange={handleChange}
            error={!!errors.wayOfTransfer}
          />
        </FormBlock>
      </FormColumn>
      <SubmitButtonWrapper>
        <Button type="submit" color="primary" size="large" variant="contained">
          {t("save changes")}
        </Button>
      </SubmitButtonWrapper>
    </StyledForm>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-row-gap: 20px;
`;

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 385px);
  grid-template-rows: repeat(2, auto);
  grid-column-gap: 175px;
  grid-row-gap: 20px;
`;

const FormColumn = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: 20px;
`;

const SubmitButtonWrapper = styled.div`
  grid-column: 1/3;
  display: flex;
  justify-content: center;
`;
