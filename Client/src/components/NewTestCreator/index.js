import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addQuestion } from 'services/api/questionsServices';
import { setTestNameStore } from 'store/questionsStore';

import {
  Paper, Button, TextField, Radio, FormControlLabel, RadioGroup, FormControl, FormLabel,
} from '@material-ui/core';

import ImageUploader from './ImageUploader';

import useStyles from './style';

// SelectionPage component
export default function SelectionPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const pathname = history.location.pathname.split('/')[2];
  const [isCreateQuestionDisabled, setIsCreateQuestionDisabled] = useState(true);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [testName, setTestName] = useState(useSelector(state => state.questions.testName));
  const [questionInfo, setQuestionInfo] = useState({
    testName,
    questionType: 0,
    theme: '',
    questionLevel: 0,
    question: '',
    src: '',
    rightAnswers: [],
    answerImage: '',
    answers: [],
  });

  const handleChangeTestName = e => {
    setTestName(e.target.value);
  };

  const handleCreateTest = () => {
    dispatch(setTestNameStore(testName));
    history.push(`/edit/${testName.replace(/ /g, '_')}`);
  };

  const handleChangeQuestionTypeAndLevel = e => {
    e.persist();
    setQuestionInfo(previousQuestionInfo => ({
      ...previousQuestionInfo,
      [e.target.name]: parseInt(e.target.value, 10),
    }));
  };

  const handleChangeQuestionInfo = e => {
    e.persist();
    setQuestionInfo(previousQuestionInfo => ({
      ...previousQuestionInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeQuestionAnswers = e => {
    e.persist();
    setQuestionInfo(previousQuestionInfo => ({
      ...previousQuestionInfo,
      [e.target.name]: [e.target.value],
    }));
  };

  const handleAddQuestion = () => {
    addQuestion({ questionInfo });
    setQuestionInfo(oldQuestionInfo => ({
      testName,
      questionType: oldQuestionInfo.questionType,
      theme: oldQuestionInfo.theme,
      questionLevel: oldQuestionInfo.questionLevel,
      question: '',
      src: null,
      answers: [],
      rightAnswers: [],
      answerImage: null,
    }));
    setIsFirstQuestion(false);
  };

  const handleFinishQuestionCreation = () => {
    history.push('/main');
  };


  useEffect(() => {
    setIsCreateQuestionDisabled(questionInfo.theme === '' ||
    isNaN(questionInfo.questionLevel) ||
    questionInfo.question === '' ||
    !questionInfo.rightAnswers.length ||
    ((questionInfo.questionType === 0 || questionInfo.questionType === 1) &&
      !questionInfo.answers.length));
  }, [
    questionInfo.answers.length,
    questionInfo.question,
    questionInfo.questionLevel,
    questionInfo.questionType,
    questionInfo.rightAnswers.length,
    questionInfo.theme,
  ]);

  useEffect(() => {
    setQuestionInfo({
      ...questionInfo,
      testName,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testName]);

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
                  {!isFirstQuestion && (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleFinishQuestionCreation}
                      className={classes.finishCreationButton}
                    >
                      {'Finish question creation'}
                    </Button>
                  )}
                  <FormControl
                    component='fieldset'
                    className={classes.questionTypeSelector}
                  >
                    <FormLabel component='legend'>{'Question Type'}</FormLabel>
                    <RadioGroup
                      aria-label='questionType'
                      name='questionType'
                      value={questionInfo.questionType}
                      onChange={handleChangeQuestionTypeAndLevel}
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
                    type='number'
                    InputLabelProps={{ shrink: true }}
                    value={questionInfo.questionLevel}
                    onChange={handleChangeQuestionTypeAndLevel}
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

                  <ImageUploader
                    setQuestionInfo={setQuestionInfo}
                    inputName={'src'}
                  />

                  {(questionInfo.questionType === 0 || questionInfo.questionType === 1) && (
                    <TextField
                      margin='normal'
                      fullWidth
                      label='Question answers variants'
                      name='answers'
                      value={questionInfo.answers}
                      onChange={handleChangeQuestionAnswers}
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
                    onChange={handleChangeQuestionAnswers}
                    autoComplete={'rightAnswers'}
                    className={classes.testCreator}
                  />
                  <ImageUploader
                    setQuestionInfo={setQuestionInfo}
                    inputName={'answerImage'}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={isCreateQuestionDisabled}
                    onClick={handleAddQuestion}
                    className={classes.nextQuestionButton}
                  >
                    {'Next question'}
                  </Button>
                </>
              )}
          </div>
        </Paper>
      </div>
    </>
  );
}
