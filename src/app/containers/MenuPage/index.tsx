/**
 *
 * MenuPage
 *
 */

import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { actions, reducer, sliceKey } from "./slice";
import { selectMenuPage } from "./selectors";
import { menuPageSaga } from "./saga";
import { RestaurantFormik } from "../RestaurantsPage/components/Restaurant";
import { CustomModal } from "../../components/CustomModal/index";
import { useState, useMemo } from "react";
import { ContentLayout } from "app/components/ContentLayout";
import { BasicTable } from "app/components/BasicTable";
import { Button } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
import { Status } from "app/components/Status";
import { values } from "lodash-es";

interface Props {}

interface MatchParams {
  id: string;
}

export function MenuPage(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: menuPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const menuPage = useSelector(selectMenuPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const [createModal, setCreateModal] = useState(false);

  const {
    params: { id },
  } = useRouteMatch<MatchParams>();

  useEffect(() => {
    dispatch(actions.getMenu(+id));
  }, [dispatch, id]);

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
        name: "description",
        label: t("description"),
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "price",
        label: t("price"),
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "status",
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

  const data = useMemo(() => values(menuPage.entries), [menuPage]);

  return (
    <>
      <Helmet>
        <title>MenuPage</title>
        <meta name="description" content="Description of MenuPage" />
      </Helmet>
      <ContentLayout title={t("menu")}>
        <CustomModal
          open={createModal}
          onClose={() => setCreateModal(false)}
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
    </>
  );
}
