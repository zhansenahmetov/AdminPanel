import React from "react";
import { TextField, Typography,Box } from "@material-ui/core";
import styled from "styled-components";



export const CourierForm = ({courier}) => {
    const TypoVals=["ФИО","Номер телефона","ИИН","Количество выполненных заказов","Адрес проживания","Время работы","Номер счета"];
    const CourierInfo=["fio","phoneNumber","iin","id","id","id","id"];
return (
    
    <Form >
        
        {TypoVals.map((TypoVals,index) => {

            return(
                <Box key={index} component="fieldset" borderColor="transparent">
                    <Typography component="legend">{TypoVals}</Typography>
                    <TextField
                    id="outlined-read-only-input"
                    defaultValue={courier[CourierInfo[index]]}
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="outlined"
                    size="small"
                    />
                </Box>
            );
            
        })}

    </Form>
  );
};

const Form = styled.form`
  max-width: 500px;
  height: fit-content;
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 15px;
`;
