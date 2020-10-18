import React from "react";
import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import { AuthForm, AuthMajorText, AuthMinorText, AuthWrapper } from "..";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";
import { authActions } from "../slice";

interface ForgotPasswordFormValues {
  email: string;
}

const initialValues: ForgotPasswordFormValues = {
  email: "",
};

const forgotPasswordFormValidationSchema = object({
  email: string().required("Enter valid email"),
});

export const Restore = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <AuthWrapper>
      <AuthMajorText>{t("did you forget password?")}</AuthMajorText>
      <AuthMinorText>{t("forgot password description")}</AuthMinorText>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          dispatch(authActions.passwordReset({ email: values.email }));
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={forgotPasswordFormValidationSchema}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <AuthForm onSubmit={handleSubmit}>
            <TextField
              id="email"
              value={values.email}
              label="Email"
              variant="outlined"
              onChange={handleChange}
              error={!!errors.email}
            />
            <Button
              type="submit"
              color="primary"
              size="large"
              variant="contained"
            >
              {t("send")}
            </Button>
            <StyledLink to="/login">{t("login")}</StyledLink>
          </AuthForm>
        )}
      </Formik>
    </AuthWrapper>
  );
};

const StyledLink = styled(Link)`
  font-size: 16px;
  line-height: 19px;
  color: #2d3748;
  text-align: center;
`;
