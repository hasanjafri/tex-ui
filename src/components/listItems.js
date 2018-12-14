import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TimelineIcon from '@material-ui/icons/Timeline';
import HistoryIcon from '@material-ui/icons/History';
import AverageTimerIcon from '@material-ui/icons/AvTimer';
import history from './history';

let current_path = window.location.pathname;

export const mainListItems = (
  <div>
    <ListItem selected={current_path === '/add' ? true : false} button onClick={() => history.push('/add')}>
      <ListItemIcon>
        <AverageTimerIcon />
      </ListItemIcon>
      <ListItemText primary="Add Product" />
    </ListItem>
    <ListItem selected={current_path === '/edit' ? true : false} button onClick={() => history.push('/edit')}>
      <ListItemIcon>
        <TimelineIcon />
      </ListItemIcon>
      <ListItemText primary="Edit Product" />
    </ListItem>
    <ListItem selected={current_path === '/' ? true : false} button onClick={() => history.push('/')}>
      <ListItemIcon>
        <HistoryIcon />
      </ListItemIcon>
      <ListItemText primary="View All Products" />
    </ListItem>
  </div>
);