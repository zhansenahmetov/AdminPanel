import React from "react";
import { Helmet } from "react-helmet-async";
import Grid from "@material-ui/core/Grid";
import { Rating } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { CourierForm } from "./components/CourierForm";
import { AutoForm } from "./components/AutoForm";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { selectCouriersPage } from "../CouriersPage/selectors";

export function CourierPage({match}) {
  
  const couriersPage = useSelector(selectCouriersPage);

  const courier = couriersPage.entries[match.params.id];
  console.log(courier);


  const value = 3; //Rating of the courier
  return (
    <>
      <Helmet>
        <title>CourierInfo</title>
        <meta name="description" content="Courier" />
      </Helmet>
      <div style={{ padding: "60px 40px 0px 40px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CourierForm courier={courier} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">Фото</Typography>
                  <img src={courier.photo} alt="Этот курьер не имеет фото" width="130px" height="130px" />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">Рейтинг</Typography>
                  <Rating
                    name="read-only"
                    value={value}
                    readOnly
                    size="large"
                  />
                </Box>

                <Link href="default.asp" target="_blank">
                  История Заказов
                </Link>
              </Grid>
            </Grid>

            <Box component="fieldset" borderColor="transparent" mt={4}>
              <Typography component="legend">Скан УДВ</Typography>
            </Box>
            <Link
              style={{ marginLeft: "40px", padding: "0px 0px 25px 0px" }}
              href="default.asp"
              target="_blank"
            >
              удв.png
            </Link>
            <AutoForm courier={courier} />
          </Grid>
        </Grid>
        <Box component="fieldset" borderColor="transparent">
          <Typography component="legend">Местоположение курьера</Typography>
          <iframe
            title="map"
            src={
              "https://maps.google.com/maps?q=aktobe&t=k&z=13&ie=UTF8&iwloc=&output=embed"
            }
            height={"200px"}
            width={"90%"}
          />
        </Box>
        <ContainerB>
          <ButtonG>Назад</ButtonG>
        </ContainerB>
      </div>
    </>
  );
}

const Link = styled.a`
  font-style: italic;
  padding: 14px 0px 0px 20px;
  text-decoration: underlined;
  display: inline-block;
  &:visited,
  &:link {
    color: black;
  }
  &:hover,
  &:active {
    color: #ff7f50;
  }
`;

const ButtonG = styled.button`
  border-radius: 5px;
  background: #04c45c;
  margin: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 347px;
  height: 43px;
  text-align: center;
  font-weight: bold;
  color: #ffffff;
  border: none;
`;
const ContainerB = styled.div`
  height: 150px;
  position: relative;
`;
