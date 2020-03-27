import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';
// Question component
export default function Question() {
  const classes = useStyles();

  const [value, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
  };


  return (
    <div>
      <Typography
        noWrap
        className={classes.questionTitle}
      >
        {'Name'}
      </Typography>


      <RadioGroup
        aria-label='gender'
        name='gender1'
        value={value}
        onChange={handleChange}
        className={classes.answersGrid}
      >
        <FormControlLabel
          value='female'
          control={<Radio />}
          label='Female'
        />
        <FormControlLabel
          value='male'
          control={<Radio />}
          label='Male'
        />
        <FormControlLabel
          value='other'
          control={<Radio />}
          label='Other'
        />
        <FormControlLabel
          value='SOS'
          control={<Radio />}
          label='SOS'
        />
      </RadioGroup>
    </div>
  );
}
