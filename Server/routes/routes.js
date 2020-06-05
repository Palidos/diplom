const { Router } = require('express');
const mongoose = require('mongoose');

// const MathTest = require('../models/math');
const models = require('../models/index');

const router = Router();

// const asd = new MathTest({
//   questionType: 456,
//   theme: '456',
//   questionLevel: 456,
//   question: '4555555556',
//   rightAnswers: ['456'],
// });
// asd.save(error => { if (error) { console.log(error); } else { console.log('saved'); } });

router.get('/api/testList', async (req, res) => {
  mongoose.connection.db.listCollections().toArray((err, list) => {
    const collectionsNames = list.map(test => { console.log(test); return test.name; });
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!list) {
      return res.status(404).json({ err: 'No data' });
    }
    return res.status(200).send(collectionsNames);
  });
});

router.post('/api/questions', async (req, res) => {
  models[req.body.collection].find({ $or: req.body.settings }).lean().exec((err, docs) => {
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
  models[req.body.collection].find({ $or: options }).lean().exec((err, docs) => {
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
