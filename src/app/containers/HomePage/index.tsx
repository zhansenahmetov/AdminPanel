import { CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Switch, Route } from "react-router-dom";
import { HomeDrawer } from "./components/HomeDrawer";
import { CourierPage } from "../CourierPage";
import { RestaurantsPage } from "../RestaurantsPage";
import { CouriersPage } from "../CouriersPage";
import { MenuPage } from "../MenuPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    paddingTop: "37px",
  },
}));

export function HomePage() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <div className={classes.root}>
        <CssBaseline />

        <HomeDrawer t={t} classes={classes}></HomeDrawer>
        <div className={classes.content}>
          <Switch>
            <Route path="/review" component={() => <div>asasdasd</div>} />
            <Route exact path="/restaurants" component={RestaurantsPage} />
            <Route exact path="/restaurants/menu/:id" component={MenuPage} />
            <Route path="/orders" component={() => <div>asasdasd</div>} />
            <Route exact path="/couriers" component={CouriersPage} />
            <Route path="/couriers/:id" component={CourierPage} />
            <Route path="/operators" component={() => <div>asasdasd</div>} />
            <Route path="/articles" component={() => <div>asasdasd</div>} />
            <Route path="/settings" component={() => <div>asasdasd</div>} />
            <Route path="/subscription" component={() => <div>asasdasd</div>} />
          </Switch>
        </div>
      </div>
    </>
  );
}
