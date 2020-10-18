/**
 *
 * RestaurantsPage
 *
 */

import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { actions, reducer, sliceKey } from "./slice";
import { selectRestaurantsPage } from "./selectors";
import { restaurantsPageSaga } from "./saga";
import { BasicTable } from "app/components/BasicTable";
import { ContentLayout } from "app/components/ContentLayout";
import { useTranslation } from "react-i18next";
import { values } from "lodash-es";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { RestaurantFormik } from "./components/Restaurant";
import { CustomModal } from "../../components/CustomModal/index";
import { Status } from "app/components/Status";

interface Props {}

export function RestaurantsPage(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: restaurantsPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const restaurantsPage = useSelector(selectRestaurantsPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    dispatch(actions.getRestaurants());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        name: "name",
        label: t("name"),
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "address",
        label: t("address"),
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "phoneNumber",
        label: t("phone number"),
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "workHours",
        label: t("working hours"),
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "menuId",
        label: t("menu"),
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => (
            <Link to={`/restaurants/menu/${value}`}>{t("go")}</Link>
          ),
        },
      },
      {
        name: "active",
        label: t("status"),
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => (
            <Status active={value}>{value ? "active" : "inactive"}</Status>
          ),
        },
      },
    ],
    [t]
  );

  const data = useMemo(() => values(restaurantsPage.entries), [
    restaurantsPage,
  ]);

  return (
    <ContentLayout title={t("restaurants")}>
      <CustomModal
        open={createModal}
        onClose={() => setCreateModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <RestaurantFormik action="create" />
      </CustomModal>
      <CustomModal
        open={editModal}
        onClose={() => setEditModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <RestaurantFormik action="create" />
      </CustomModal>
      <BasicTable
        data={data}
        columns={columns}
        createButton={
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={() => setCreateModal(true)}
          >
            Create
          </Button>
        }
      />
    </ContentLayout>
  );
}
