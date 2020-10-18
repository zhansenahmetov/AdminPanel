import { Form, Formik, FormikProps } from "formik";
import React, { FC } from "react";
import styled from "styled-components";
import { FormBlock, FormLabel, ModalFormTitle } from "app/components/forms";
import { useTranslation } from "react-i18next";
import { TextField, Button } from "@material-ui/core";

interface Props {}

interface Values {
  name: String;
  email: String;
}

export const AdministratorFormik: FC<Props> = () => {
  return (
    <Formik<Values> initialValues={{ name: "", email: "" }} onSubmit={() => {}}>
      {(formikHelpers) => <AdministratorForm {...formikHelpers} />}
    </Formik>
  );
};

const AdministratorForm: FC<FormikProps<Values>> = ({
  values,
  errors,
  handleSubmit,
  handleChange,
}) => {
  const { t } = useTranslation();
  return (
    <StyledForm onSubmit={handleSubmit}>
      <ModalFormTitle>{t("create new restaurant")}</ModalFormTitle>
      <FormBlock>
        <FormLabel>{t("enter restaurant name")}</FormLabel>
        <TextField
          id="name"
          name="name"
          variant="outlined"
          value={values.name}
          error={!!errors.name}
          onChange={handleChange}
        />
      </FormBlock>
      <FormBlock>
        <FormLabel>{t("email")}</FormLabel>
        <TextField
          id="email"
          name="email"
          variant="outlined"
          value={values.email}
          error={!!errors.email}
          onChange={handleChange}
        />
      </FormBlock>
      <Button type="submit" color="primary" size="large" variant="contained">
        {t("create")}
      </Button>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  display: grid;
  grid-row-gap: 20px;
`;
