import { Formik, FormikProps, Form } from "formik";
import React, { FC } from "react";
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Restaurant } from "../types";
import { FormBlock, FormLabel, ModalFormTitle } from "app/components/forms";
import { useDispatch } from "react-redux";
import { actions } from "../slice";

interface Props {
  action: "create" | "edit";
  restaurant?: Restaurant;
}

interface Values {
  address: String;
  cuisineIds: Array<Number>;
  description: String;
  logoUrl: String;
  menuId: Number;
  name: String;
  phoneNumber: String;
  workHours: String;
}

export const RestaurantFormik: FC<Props> = ({ action, restaurant }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <Formik<Values>
      initialValues={
        restaurant ?? {
          address: "",
          cuisineIds: [66],
          description: "",
          logoUrl: "",
          menuId: 65,
          name: "",
          phoneNumber: "",
          workHours: "",
        }
      }
      onSubmit={(values) => {
        dispatch(actions.createRestaurant(values));
      }}
    >
      {(formikHelpers) => (
        <Wrapper>
          <ModalFormTitle>
            {t(
              action === "create" ? "create new restaurant" : "edit restaurant"
            )}
          </ModalFormTitle>
          <RestaurantForm {...formikHelpers} />
        </Wrapper>
      )}
    </Formik>
  );
};

const RestaurantForm: FC<FormikProps<Values>> = ({
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
          <FormLabel>{t("restaurant name")}</FormLabel>
          <TextField
            id="name"
            value={values.name}
            variant={"outlined"}
            onChange={handleChange}
            error={!!errors.name}
          />
        </FormBlock>
        <FormBlock>
          <FormLabel>{t("description")}</FormLabel>
          <TextField
            id="description"
            value={values.description}
            variant={"outlined"}
            onChange={handleChange}
            error={!!errors.description}
          />
        </FormBlock>
        <FormBlock>
          <FormLabel>{t("address")}</FormLabel>
          <TextField
            id="address"
            value={values.address}
            variant={"outlined"}
            onChange={handleChange}
            error={!!errors.address}
          />
        </FormBlock>
        <FormBlock>
          <FormLabel>{t("working hours")}</FormLabel>
          <TextField
            id="workHours"
            value={values.workHours}
            variant={"outlined"}
            onChange={handleChange}
            error={!!errors.workHours}
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
      </FormColumn>
      <FormColumn>
        <FormBlock>
          <FormLabel>{t("logo")}</FormLabel>
          <TextField
            id="logoUrl"
            value={values.logoUrl}
            variant={"outlined"}
            onChange={handleChange}
            error={!!errors.logoUrl}
          />
        </FormBlock>
        <FormBlock>
          <FormLabel>{t("cuisine types")}</FormLabel>
          <TextField
            id="cuisineIds"
            value={values.cuisineIds}
            variant={"outlined"}
            onChange={handleChange}
            error={!!errors.cuisineIds}
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
