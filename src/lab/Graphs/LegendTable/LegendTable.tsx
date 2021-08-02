import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
import { LegendTableBaseProps } from "./base";
import { useStyles } from "./style";

export interface LegendData {
  // Every row is an array of string
  data: Array<string>;

  // BaseColor is the color of the legend marker
  baseColor?: string;
}

export type LegendTableProps = LegendTableBaseProps<LegendData>;

const LegendTable: React.FC<LegendTableProps> = ({ data, heading }) => {
  const classes = useStyles();
  return (
    //TODO replace the table with data grid
    <TableContainer className={classes.root}>
      <Table aria-label="simple table" cellPadding="0.2">
        <TableHead>
          <TableRow className={classes.tableRow}>
            {/* mapping the table heading if heading is provided */}
            {heading &&
              heading.map((element) => (
                <TableCell
                  key={`${element}-heading-cell`}
                  className={`${classes.tableCell} ${classes.tableHeading}`}
                >
                  <Typography>{element}</Typography>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody style={{ width: "100%" }}>
          {/* mapping data if its defined */}
          {/* here data is array of rows */}
          {data &&
            data.map((row) => (
              <TableRow
                key={`${row.data[0]} ${Math.random() * 100} }`}
                className={classes.tableRow}
              >
                {row.data.map(
                  (element: string, index: number) =>
                    // the first column has the metric name with legend marker
                    // check if the index is 0 then add legend marker else
                    // print the string as is
                    (index === 0 && (
                      <TableCell
                        key={`${element}-${Math.random() * 100} `}
                        className={`${classes.tableCell} ${classes.tableFont} ${classes.tableLabel}`}
                      >
                        {row.baseColor && (
                          // legend marker
                          <div
                            className={classes.legendMarker}
                            style={{ background: row.baseColor }}
                          />
                        )}
                        <Typography>{element}</Typography>
                      </TableCell>
                    )) ||
                    (index !== 0 && (
                      <TableCell
                        key={`${element}-${Math.random() * 100} `}
                        className={`${classes.tableCell} ${classes.tableFont} ${classes.tableData}`}
                      >
                        <Typography>{element}</Typography>
                      </TableCell>
                    ))
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { LegendTable };
