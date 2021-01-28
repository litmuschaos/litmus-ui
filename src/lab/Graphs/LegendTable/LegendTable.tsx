import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { LegendData } from './base';
import { useStyles } from './style';

export type LegendProps = {
  data?: Array<LegendData>;
  heading?: Array<string>;
  width?: number;
  height?: number;
};

const LegendTable: React.FC<LegendProps> = ({
  data,
  heading,
  width = 400,
  height = 200,
}) => {
  const classes = useStyles({ width, height });
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
        <TableBody style={{ width: '100%' }}>
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
                        className={classes.tableCell}
                      >
                        <hr color={row.baseColor} className={classes.hr} />
                        <Typography
                          className={`${classes.tableLabel} ${classes.tableFont}`}
                        >
                          {element}
                        </Typography>
                      </TableCell>
                    )) ||
                    (index !== 0 && (
                      <TableCell
                        key={`${element}-${Math.random() * 100} `}
                        className={classes.tableCell}
                      >
                        <Typography
                          className={`${classes.tableData} ${classes.tableFont}`}
                        >
                          {element}
                        </Typography>
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
