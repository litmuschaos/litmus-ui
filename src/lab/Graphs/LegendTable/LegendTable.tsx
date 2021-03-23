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
  data: Array<string>;
  baseColor?: string;
}

export type LegendTableProps = LegendTableBaseProps<LegendData>;

const LegendTable: React.FC<LegendTableProps> = ({ data, heading }) => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.root}>
      <Table aria-label="simple table" cellPadding="0.2">
        <TableHead>
          <TableRow className={classes.tableRow}>
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
          {data &&
            data.map((row) => (
              <TableRow
                key={`${row.data[0]} ${Math.random() * 100} }`}
                className={classes.tableRow}
              >
                {row.data.map(
                  (element: string, index: number) =>
                    (index === 0 && (
                      <TableCell
                        key={`${element}-${Math.random() * 100} `}
                        className={`${classes.tableCell} ${classes.tableFont} ${classes.tableLabel}`}
                      >
                        {row.baseColor && (
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
