import React from 'react';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import useStyles from './style';

// MainMenu component
export default function MainMenu() {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => { history.push('/main'); };

  return (
    <AppBar
      className={classes.appBar}
      position='static'
    >
      {/* Toolbar on widescreens */}
      <Toolbar className={classes.toolBar}>

        {/* Logo */}
        {// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <a
            href={'/main'}
            // onClick={handleClick}
            className={classes.title}
          >
            {'Smart tests'}
          </a>
        }


      </Toolbar>
    </AppBar>
  );
}
