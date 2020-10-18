import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ReactComponent as Logo } from "assets/icons/logo.svg";
import { ReactComponent as ReviewIcon } from "assets/icons/review.svg";
import { ReactComponent as RestaurantsIcon } from "assets/icons/restaurants.svg";
import { ReactComponent as OrdersIcon } from "assets/icons/orders.svg";
import { ReactComponent as CouriersIcon } from "assets/icons/couriers.svg";
import { ReactComponent as OperatorsIcon } from "assets/icons/operators.svg";
import { ReactComponent as ArticlesIcon } from "assets/icons/articles.svg";
import { ReactComponent as SettingsIcon } from "assets/icons/settings.svg";
import { ReactComponent as SubscriptionIcon } from "assets/icons/subscription.svg";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { authActions } from "app/containers/AuthPage/slice";

const drawerWidth = 255;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#363740",
  },
  listItem: {
    color: "#A4A6B3",
    margin: "0 3px",
    "& svg": {
      opacity: 0.4,
    },
  },
  listItemSelected: {
    color: "#DDE2FF",
    borderLeft: "3px solid #DDE2FF",
    boxSizing: "border-box",
    margin: "0",
    "& svg": {
      opacity: 1,
    },
  },
  divider: {
    margin: "20px 0",
  },
}));

export const HomeDrawer = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <LogoBlock>
        <Logo />
        <span
          onClick={() => {
            dispatch(authActions.logout());
          }}
        >
          {t("administrator")}
        </span>
      </LogoBlock>
      <List>
        {[
          {
            icon: <ReviewIcon />,
            label: t("review"),
            to: "/review",
          },
          {
            icon: <RestaurantsIcon />,
            label: t("restaurants"),
            to: "/restaurants",
          },
          {
            icon: <OrdersIcon />,
            label: t("orders"),
            to: "/orders",
          },
          {
            icon: <CouriersIcon />,
            label: t("couriers"),
            to: "/couriers",
          },
          {
            icon: <OperatorsIcon />,
            label: t("operators"),
            to: "/operators",
          },
          {
            icon: <ArticlesIcon />,
            label: t("articles"),
            to: "/articles",
          },
          {
            divider: true,
            to: "",
          },
          {
            icon: <SettingsIcon />,
            label: t("settings"),
            to: "/settings",
          },
          {
            icon: <SubscriptionIcon />,
            label: t("subscription"),
            to: "/subscription",
          },
        ].map((menuItem, index) => {
          if (menuItem.divider) return <Divider className={classes.divider} />;
          return (
            <NavLink
              exact
              to={menuItem.to}
              activeClassName={classes.listItemSelected}
              component={(props) => {
                return (
                  <StyledLink to={props.href}>
                    <ListItem
                      button
                      key={menuItem.label}
                      className={`${classes.listItem} ${props.className}`}
                    >
                      <ListItemIcon>{menuItem.icon}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              color: "#A4A6B3",
                            }}
                          >
                            {menuItem.label}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </StyledLink>
                );
              }}
            />
          );
        })}
      </List>
    </Drawer>
  );
};

const LogoBlock = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 12px;
  margin: 37px auto 59px;
  align-items: center;

  span {
    font-size: 19px;
    letter-spacing: 0.4px;

    color: #a4a6b3;
    opacity: 0.7;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
