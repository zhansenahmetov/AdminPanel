import React from "react";
import { TextField, Typography,Box } from "@material-ui/core";
import styled from "styled-components";



export const AutoForm = ({courier}) => {
    const TypoVals=["Способ передвижения","Номер машины","Марка","Фото"];
    const CourierInfo=["wayOfTransfer","carNumber","carBrand","carPhoto"];
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
