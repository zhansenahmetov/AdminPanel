/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { GlobalStyle } from "styles/global-styles";

import { HomePage } from "./containers/HomePage/Loadable";
import { NotFoundPage } from "./components/NotFoundPage/Loadable";
import { AuthPage, PrivateRoute } from "./containers/AuthPage";
import { AuthProvider } from "./containers/AuthPage/index";

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <AuthProvider>
        <Switch>
          <Route exact path="/login" component={AuthPage} />
          <Route exact path="/restore" component={AuthPage} />
          <Route exact path="/change-password/:token" component={AuthPage} />
          <PrivateRoute path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
