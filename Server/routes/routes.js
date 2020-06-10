const { Router } = require('express');
// const mongoose = require('mongoose');

const Questions = require('../models/Questions');

const router = Router();

// models[req.body.collection].create(req.body.questionInfo, (err, result) => {
//   if (err) {
//     console.log(err);
//     return res.sendStatus(500);
//   }
//   return res.status(201).json({ msg: 'Question added' });
// });


router.get('/api/testList', async (req, res) => {
  Questions.find({}, 'testName').lean().exec((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!docs) {
      return res.status(404).json({ err: 'No data' });
    }
    const testNames = Array.from(new Set(docs.map(doc => doc.testName)));
    return res.status(200).send(testNames);
  });
});

router.post('/api/addQuestion', async (req, res) => {
  Questions.create(req.body.questionInfo, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    return res.status(201).json({ msg: `Question added to test ${req.body.questionInfo.testName}` });
  });
});

router.post('/api/questions', async (req, res) => {
  Questions.find({ $or: req.body.settings }).lean().exec((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!docs) {
      return res.status(404).json({ err: 'No data' });
    }
    return res.status(200).send(docs.map(({
      rightAnswers, answerImage, ...questionInfo
    }) => ({ ...questionInfo })));
  });
});

router.post('/api/questions/submit', async (req, res) => {
  const options = req.body.answers.map(option => ({ _id: option.questionId }));
  Questions.find({ $or: options }).lean().exec((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!docs) {
      return res.status(404).json({ err: 'No data' });
    }
    return res.status(200).send(docs.map(({
      rightAnswers, answerImage, ...questionInfo
    }) => ({
      questionId: questionInfo._id,
      answers: rightAnswers,
      src: answerImage,
      correct: rightAnswers.some(rightAnswer =>
      // eslint-disable-next-line eqeqeq
        rightAnswer == req.body.answers.find(({ questionId }) =>
          questionId === questionInfo._id.toString()).answer),
      theme: questionInfo.theme,
      questionLevel: questionInfo.questionLevel,
    })));
  });
});


router.get('*', (req, res) => {
  res.status(404).send('404');
});

module.exports = router;
