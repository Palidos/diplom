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
    // history.push('/test');
    history.push('/main');
    // history.push('/edit');
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
