/**
 *
 * AuthPage
 *
 */

import React, { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { reducer, sliceKey } from "./slice";
import { selectAuthPage } from "./selectors";
import { authPageSaga } from "./saga";
import leftBlockBackground from "assets/images/auth_background.png";
import { LoginForm } from "./components/login";
import { Redirect, Route, RouteProps, useRouteMatch } from "react-router-dom";
import { Restore } from "./components/forgot";
import { Form } from "formik";
import { ChangePassword } from "./components/change";

interface Props {}

export function AuthPage(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authPage = useSelector(selectAuthPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const isLogin = useRouteMatch("/login");
  const isRestore = useRouteMatch("/restore");

  const { auth } = useSelector(selectAuthPage);

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>AuthPage</title>
        <meta name="description" content="Login" />
      </Helmet>
      <Wrapper>
        <LeftBlock />
        {isLogin ? <LoginForm /> : isRestore ? <Restore /> : <ChangePassword />}
      </Wrapper>
    </>
  );
}

export const AuthProvider: FC<Props> = ({ children }) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: authPageSaga });

  return <>{children}</>;
};

export const PrivateRoute = (props: RouteProps) => {
  const { auth } = useSelector(selectAuthPage);
  if (!auth) {
    return <Redirect to="login" />;
  } else {
    return <Route {...props} />;
  }
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
`;

const LeftBlock = styled.div`
  width: 100%;
  height: 100%;
  background: url(${leftBlockBackground}) no-repeat;
  background-size: cover;
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 360px;
`;

export const AuthForm = styled(Form)`
  margin: 20px 0;
  height: fit-content;
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 15px;
`;

export const AuthMinorText = styled.span`
  font-size: 16px;
  line-height: 19px;
  color: #2d3748;
`;

export const AuthMajorText = styled.span`
  font-size: 30px;
  line-height: 35px;
  font-weight: bold;
  color: #1a202c;
`;

export const AuthAdditionalBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
