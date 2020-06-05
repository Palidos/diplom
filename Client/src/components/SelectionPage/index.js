import React, { useState, useEffect } from 'react';

import { getTestsList } from 'services/api/questionsServices';

import {
  Paper, FormControl, Select, MenuItem, InputLabel, Button,
} from '@material-ui/core';

import useStyles from './style';

// SelectionPage component
export default function SelectionPage() {
  const classes = useStyles();

  const [tests, setTests] = useState([]);
  const [chosenTest, setChosenTest] = useState('');

  useEffect(() => {
    const checker = async () => {
      setTests(await getTestsList());
    };
    checker();
  }, []);

  const menuPropsObj = {  // Popover layout config
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  };
  return (
    <>
      <div className={classes.mainScreenWrapper}>
        <Paper className={classes.mainScreenPaper}>
          <div className={classes.selectionWrapper}>
            <FormControl
              className={classes.testSelector}
              disabled={!tests.length}
            >
              <InputLabel id='course-select-label'>{'Choose test'}</InputLabel>
              <Select
                value={chosenTest}
                onChange={e => setChosenTest(e.target.value)}
                MenuProps={menuPropsObj}
                inputProps={{
                  name: 'test',
                  id: 'test-simple',
                }}
              >
                {
                  tests && tests
                    .map(name => (
                      <MenuItem
                        key={name}
                        value={name}
                      >
                        {name}
                      </MenuItem>
                    ))
                }
                <MenuItem
                  value={'newTest'}
                >
                  {'Create new Test'}
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              variant='contained'
              color='primary'
            >
              {'proceed'}
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
}
