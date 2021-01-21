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
import { useStyles } from './styles';

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
    <TableContainer className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableRow}>
            {heading &&
              heading.map((element) => (
                <TableCell
                  key={`${element}-heading-cell`}
                  className={`${classes.tableFont} ${classes.tableHeading} ${classes.tableCell}`}
                >
                  {element}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <TableRow
                className={classes.tableRow}
                key={`${row.value[0]} ${Math.random() * 100} }`}
              >
                {row.value.map((element, index) => (
                  <TableCell
                    key={`${element}-${Math.random() * 100} `}
                    className={classes.tableCell}
                  >
                    <div className={classes.tableDataRow}>
                      {index === 0 && (
                        <hr color={row.baseColor} className={classes.hr} />
                      )}

                      <Typography className={classes.tableFont}>
                        {element}
                      </Typography>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export { LegendTable };
