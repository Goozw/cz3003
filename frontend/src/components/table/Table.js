import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Detail from '../layout/detail';

import { connect } from 'react-redux';
import { getAll, getHaze, getDengue } from '../../actions/crisisAction';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

function IncidentTable(props) {
  const { type, classes } = props;
  var events;
  if (type === 'all') {
    const { alls } = props;
    events = alls;
  } else if (type === 'haze') {
    const { hazes } = props;
    events = hazes;
  } else if (type === 'dengue') {
    const { dengues } = props;
    events = dengues;
  }
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Incident id</TableCell>
            <TableCell align='left'>Incident type</TableCell>
            <TableCell align='left'>Incident location</TableCell>
            <TableCell align='left'>Incident time</TableCell>
            <TableCell align='left'>Incident status</TableCell>
            <TableCell align='center'>Detail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(event => (
            <TableRow>
              <TableCell align='left' component='th' scope='row'>
                {event.record_id}
              </TableCell>
              <TableCell align='left' component='th' scope='row'>
                {event.incident_type.toString().replace(/^./, function(str) {
                  return str.toUpperCase();
                })}
              </TableCell>
              <TableCell align='left' component='th' scope='row'>
                {event.incident_location
                  .toString()
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </TableCell>
              <TableCell align='left' component='th' scope='row'>
                {new Date(event.date).toString().slice(0, 25)}
              </TableCell>
              <TableCell align='left' component='th' scope='row'>
                {event.incident_status.toString().replace(/^./, function(str) {
                  return str.toUpperCase();
                })}
              </TableCell>
              <TableCell align='center' component='th' scope='row'>
                <Detail event={event} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

IncidentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  getAll: PropTypes.func.isRequired,
  getHaze: PropTypes.func.isRequired,
  getDengue: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alls: state.crisis.alls,
  hazes: state.crisis.hazes,
  dengues: state.crisis.dengues
});

export default connect(
  mapStateToProps,
  { getAll, getDengue, getHaze }
)(withStyles(styles)(IncidentTable));
