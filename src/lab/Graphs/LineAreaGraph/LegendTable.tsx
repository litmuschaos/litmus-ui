import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { LegendData } from './base';
import { useStyles } from './styles';
import Typography from '@material-ui/core/Typography';
const colorCount = 10;
const colorArr: string[] = ['#08BBD7', '#F6B92B', '#E73939', '#AD51C3', '#FFF'];
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
          <TableRow>
            {heading &&
              heading.map((element, index) => (
                <TableCell
                  key={`${index}-cell`}
                  align={index == 0 ? 'left' : 'center'} //chnage it later
                  className={`${classes.tableFont} ${classes.tableHeading}`}
                >
                  {element}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, i) => (
              <TableRow key={row.value[0]}>
                {row.value.map((element, index) => (
                  <TableCell
                    key={element}
                    align={index == 0 ? 'left' : 'center'}
                    className={classes.tableCell}
                  >
                    <div className={classes.tableDataRow}>
                      {index == 0 && (
                        <hr
                          color={colorArr[i % colorCount]}
                          className={classes.hr}
                        />
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
