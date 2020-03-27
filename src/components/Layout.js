import React from 'react';

import Grid from '@material-ui/core/Grid';

import MainMenu from './MainMenu';

import useStyles from './style';


// Layout component
export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {
        <>
          <MainMenu />
          <Grid
            container
            direction='row'
            justify='flex-start'
            className={classes.content}
          >
            {children}
          </Grid>
        </>
      }
    </div>
  );
}
