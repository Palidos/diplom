import React, { useState, useEffect } from 'react';

import { getTestsList } from 'services/api/questionsServices';

import {
  Paper, FormControl, Select, MenuItem,
} from '@material-ui/core';

import useStyles from './style';

// SelectionPage component
export default function SelectionPage() {
  const classes = useStyles();

  const [tests, setTests] = useState([]);
  useEffect(() => {
    setTests(getTestsList());
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
          <FormControl
            className={classes.scheduleRoomSetter}
            disabled={!tests.length}
          >
            <Select
              value={tests}
              // onChange={e => setSelectedRoom(e.target.value)}
              MenuProps={menuPropsObj}
              inputProps={{
                name: 'test',
                id: 'test-simple',
              }}
            >
              {
                tests && tests
                  .map(({ name }) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))
              }
            </Select>
          </FormControl>

        </Paper>
      </div>
    </>
  );
}
