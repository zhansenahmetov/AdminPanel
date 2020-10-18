import React from "react";
import { Formik } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../slice";
import { Link } from "react-router-dom";
import {
  AuthAdditionalBlock,
  AuthForm,
  AuthMajorText,
  AuthMinorText,
  AuthWrapper,
} from "..";
import { selectAuthPage } from "../selectors";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  remember: false,
};

const loginFormValidationSchema = object({
  email: string().required("Enter valid email"),
  password: string().min(6).max(20).required("Enter valid email"),
});

export const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    login: { loading },
  } = useSelector(selectAuthPage);

  return (
    <AuthWrapper>
      <AuthMinorText>{t("welcome")}</AuthMinorText>
      <AuthMajorText>{t("log in into your account")}</AuthMajorText>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);

          dispatch(authActions.login(values));

          setSubmitting(false);
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={loginFormValidationSchema}
      >
        {({ values, errors, handleSubmit, handleChange, isSubmitting }) => (
          <AuthForm onSubmit={handleSubmit}>
            <TextField
              id="email"
              value={values.email}
              label="Email"
              variant="outlined"
              onChange={handleChange}
              error={!!errors.email}
            />
            <TextField
              type="password"
              id="password"
              value={values.password}
              label="Password"
              variant="outlined"
              onChange={handleChange}
              error={!!errors.password}
            />
            <AuthAdditionalBlock>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.remember}
                    onChange={handleChange}
                    name="remember"
                    color="primary"
                  />
                }
                label={t("remember me")}
              />
              <StyledLink to="/restore">{t("forgot password")}</StyledLink>
            </AuthAdditionalBlock>
            <Button
              disabled={loading}
              type="submit"
              color="primary"
              size="large"
              variant="contained"
            >
              {t("login")}
            </Button>
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
`;
