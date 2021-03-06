import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import useStyles from './style';

// MainMenu component
export default function MainMenu() {
  const classes = useStyles();

  return (
    <AppBar
      className={classes.appBar}
      position='static'
    >
      {/* Toolbar on widescreens */}
      <Toolbar className={classes.toolBar}>

        {/* Logo */}
        <a
          href={'/main'}
          className={classes.title}
        >
          {'Smart tests'}
        </a>
      </Toolbar>
    </AppBar>
  );
}
