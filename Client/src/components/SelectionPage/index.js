import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getTestsList } from 'services/api/questionsServices';
import { setTestNameStore } from 'store/questionsStore';

import {
  Paper, FormControl, Select, MenuItem, InputLabel, Button, Checkbox, FormControlLabel,
} from '@material-ui/core';

import useStyles from './style';

// SelectionPage component
export default function SelectionPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [tests, setTests] = useState([]);
  const [chosenTest, setChosenTest] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSelectTest = () => {
    if (chosenTest === 'newTest') {
      history.push('/edit');
    } else {
      isEditMode
        ? history.push(`/edit/${chosenTest.replace(/ /g, '_')}`)
        : history.push(`/test/${chosenTest.replace(/ /g, '_')}`);
      dispatch(setTestNameStore(chosenTest));
    }
  };

  const handleToggleEditMode = () => {
    setIsEditMode(editMode => !editMode);
  };

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
            <div className={classes.topInputs}>
              <FormControl
                className={classes.testSelector}
                disabled={!tests.length}
              >
                <InputLabel id='course-select-label'>{'Choose test'}</InputLabel>
                <Select
                  value={chosenTest}
                  onChange={e => setChosenTest(e.target.value)}
                  defaultValue={'--- Create new Test ---'}
                  MenuProps={menuPropsObj}
                  inputProps={{
                    name: 'test',
                    id: 'test-simple',
                  }}
                >
                  <MenuItem value={'newTest'}>
                    {'--- Create new Test ---'}
                  </MenuItem>
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
                </Select>
              </FormControl>
              <FormControlLabel
                className={classes.isEditCheckbox}
                control={(
                  <Checkbox
                    checked={isEditMode}
                    onChange={handleToggleEditMode}
                    name='isEdit'
                    color='primary'
                  />
                )}
                label='Edit'
              />
            </div>
            <Button
              variant='contained'
              color='primary'
              disabled={chosenTest === ''}
              onClick={handleSelectTest}
            >
              {'Select'}
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
}
