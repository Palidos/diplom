import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createTest } from 'services/api/questionsServices';

import {
  Paper, Button, TextField, Radio, FormControlLabel, RadioGroup, FormControl, FormLabel,
} from '@material-ui/core';

import useStyles from './style';

// SelectionPage component
export default function SelectionPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const pathname = history.location.pathname.split('/')[2];

  const [testName, setTestName] = useState('');
  const [questionInfo, setQuestionInfo] = useState({
    questionType: 0,
    theme: '',
    questionLevel: null,
    question: '',
    src: null,
    answers: null,
    rightAnswers: null,
    answerImage: null,
  });

  const handleChangeTestName = e => {
    setTestName(e.target.value);
  };

  const handleCreateTest = () => {
    createTest({ testName });
    history.push(`/newTest/${testName}`);
  };

  const handleChangeQuestionInfo = e => {
    setQuestionInfo(previousQuestionInfo => ({
      ...previousQuestionInfo,
      [e.target.name]: Number(e.target.value),
    }));
  };
  console.log(questionInfo);
  return (
    <>
      <div className={classes.mainScreenWrapper}>
        <Paper className={classes.mainScreenPaper}>
          <div className={classes.TestCreatorWrapper}>
            {!pathname
              ? (
                <>
                  <TextField
                    margin='normal'
                    fullWidth
                    label='Test name'
                    name='testName'
                    inputProps={{ maxLength: 50 }}
                    value={testName}
                    onChange={handleChangeTestName}
                    autoComplete={'testName'}
                    // error={isTestNameExists}
                    // helperText={isTestNameExists && `Test with same name already exists`}
                    className={classes.testCreator}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={!testName}
                    onClick={handleCreateTest}
                  >
                    {'Create'}
                  </Button>

                </>
              ) : (
                <>
                  <FormControl
                    component='fieldset'
                    className={classes.questionTypeSelector}
                  >
                    <FormLabel component='legend'>{'Question Type'}</FormLabel>
                    <RadioGroup
                      aria-label='questionType'
                      name='questionType'
                      value={questionInfo.questionType}
                      onChange={handleChangeQuestionInfo}
                    >
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label='Radio question'
                      />
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label='Checkbox question'
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label='TextField question'
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    margin='normal'
                    fullWidth
                    label='Question theme'
                    name='theme'
                    value={questionInfo.theme}
                    onChange={handleChangeQuestionInfo}
                    autoComplete={'theme'}
                    className={classes.testCreator}
                  />
                  <TextField
                    margin='normal'
                    fullWidth
                    label='Question difficulty level'
                    name='questionLevel'
                    inputProps={{ maxLength: 50 }}
                    value={questionInfo.questionLevel}
                    onChange={handleChangeQuestionInfo}
                    autoComplete={'questionLevel'}
                    className={classes.testCreator}
                  />
                  <TextField
                    margin='normal'
                    fullWidth
                    label='Question text'
                    name='question'
                    value={questionInfo.question}
                    onChange={handleChangeQuestionInfo}
                    autoComplete={'question'}
                    className={classes.testCreator}
                  />
                  {(questionInfo.questionType === 0 || questionInfo.questionType === 1) && (
                    <TextField
                      margin='normal'
                      fullWidth
                      label='Question answers variants'
                      name='answers'
                      value={questionInfo.answers}
                      onChange={handleChangeQuestionInfo}
                      autoComplete={'answers'}
                      className={classes.testCreator}
                    />
                  )}
                  <TextField
                    margin='normal'
                    fullWidth
                    label='Question correct answers'
                    name='rightAnswers'
                    value={questionInfo.rightAnswers}
                    onChange={handleChangeQuestionInfo}
                    autoComplete={'rightAnswers'}
                    className={classes.testCreator}
                  />
                </>
              )}
          </div>
        </Paper>
      </div>
    </>
  );
}
