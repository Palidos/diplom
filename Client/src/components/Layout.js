import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import MainMenu from './MainMenu';

import useStyles from './style';

// Layout component
export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();


  useEffect(() => {
    // const pathname = history.location.pathname.split('/')[1];
    history.push('/test');
  }, [history]);


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
