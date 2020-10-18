import React, { FC } from "react";
import MUIDataTable, {
  MUIDataTableOptions,
  MUIDataTableColumnDef,
  TableToolbar,
} from "mui-datatables";
import styled from "styled-components";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const options: MUIDataTableOptions = {
  filterType: "checkbox",
  download: false,
  print: false,
};

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MuiPaper: {
        root: {
          boxShadow: "none !important",
          borderRadius: "8px",
        },
      },
      MuiToolbar: {
        root: {
          backgroundColor: "#F4F7FC",
        },
      },
      MuiTableHead: {
        root: {
          backgroundColor: "#F4F7FC",
        },
      },
      MuiTableRow: {
        root: {
          "&:nth-child(odd)": {
            backgroundColor: "#F4F7FC",
          },
        },
      },
      MuiTableCell: {},
    },
  });

interface Props {
  data: Array<object | number[] | string[]>;
  columns: MUIDataTableColumnDef[];
  createButton?: any;
}

const CustomToolbar = (props) => {
  return <TableToolbar {...props} />;
};

export const BasicTable: FC<Props> = ({ data, columns, createButton }) => {
  return (
    <TableWrapper>
      {createButton && createButton}
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title=""
          data={data}
          columns={columns}
          options={options}
          components={{
            TableToolbar: CustomToolbar,
          }}
        />
      </MuiThemeProvider>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  padding: 12px 16px;
  background: #ffffff;
  border: 1px solid #dfe0eb;
  box-sizing: border-box;
  border-radius: 8px;
`;
