import React, { useEffect } from "react";
import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { object, string } from "yup";
import { AuthForm, AuthMajorText, AuthWrapper } from "..";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../slice";

interface ChangePasswordFormValues {
  password: string;
  passwordConfirm: string;
}

const initialValues: ChangePasswordFormValues = {
  password: "",
  passwordConfirm: "",
};

const changePasswordFormValidationSchema = object({
  email: string().required("Enter valid email"),
});

interface RouteParams {
  token: string;
}

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    params: { token },
  } = useRouteMatch<RouteParams>();

  useEffect(() => {
    dispatch(authActions.validateResetLink({ token }));
  }, [dispatch, token]);

  return (
    <AuthWrapper>
      <AuthMajorText>{t("enter new password")}</AuthMajorText>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          dispatch(
            authActions.changePassword({
              changePasswordRequest: {
                password: values.password,
                token,
              },
            })
          );
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={changePasswordFormValidationSchema}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <AuthForm onSubmit={handleSubmit}>
            <TextField
              id="password"
              value={values.password}
              label={t("password")}
              variant="outlined"
              onChange={handleChange}
              error={!!errors.password}
            />
            <TextField
              id="passwordConfirm"
              value={values.passwordConfirm}
              label={t("repeat password")}
              variant="outlined"
              onChange={handleChange}
              error={!!errors.passwordConfirm}
            />
            <Button
              type="submit"
              color="primary"
              size="large"
              variant="contained"
            >
              {t("save password")}
            </Button>
          </AuthForm>
        )}
      </Formik>
    </AuthWrapper>
  );
};
