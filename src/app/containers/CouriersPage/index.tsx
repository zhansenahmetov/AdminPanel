/**
 *
 * CouriersPage
 *
 */

import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { actions, reducer, sliceKey } from "./slice";
import { selectCouriersPage } from "./selectors";
import { couriersPageSaga } from "./saga";
import { BasicTable } from "app/components/BasicTable";
import { ContentLayout } from "app/components/ContentLayout";
import { useTranslation } from "react-i18next";
import { values } from "lodash-es";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { CourierFormik } from "./components/Courier";
import { CustomModal } from "../../components/CustomModal/index";
import { Status } from "app/components/Status";

interface Props {}

export function CouriersPage(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: couriersPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const couriersPage = useSelector(selectCouriersPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);


  useEffect(() => {
    dispatch(actions.getCouriers());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        name: "fio",
        label: t("name"),
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "phoneNumber",
        label: t("contact phone"),
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "wayOfTransfer",
        label: t("way of transfer"),
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "id",
        label: t("courier id"),
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => (
            <Link to={`/couriers/${value}`}>{t("go")}</Link>
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

  const data = useMemo(() => values(couriersPage.entries), [
    couriersPage,
  ]);


  return (
    <ContentLayout title={t("couriers")}>
      <CustomModal
        open={createModal}
        onClose={() => setCreateModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CourierFormik action="create" />
      </CustomModal>
      <CustomModal
        open={editModal}
        onClose={() => setEditModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CourierFormik action="create" />
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
