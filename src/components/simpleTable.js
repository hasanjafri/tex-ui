import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

function SimpleTable(props) {
  const { classes, productData } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Datetime</TableCell>
            <TableCell align="right">Longitude</TableCell>
            <TableCell align="right">Latitude</TableCell>
            <TableCell align="right">Elevation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productData !== undefined && productData.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.p_id}
                </TableCell>
                <TableCell>{n.p_description}</TableCell>
                <TableCell align="right">{n.p_datetime}</TableCell>
                <TableCell align="right">{n.longitude}</TableCell>
                <TableCell align="right">{n.latitude}</TableCell>
                <TableCell align="right">{n.elevation}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);