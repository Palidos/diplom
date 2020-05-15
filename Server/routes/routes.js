const { Router } = require('express');
// const mongoose = require('mongoose');

const InitialLevel = require('../models/initialLevel');
const InitialLevelAnswers = require('../models/initialLevelAnswers');

const router = Router();

// const asd = new InitialLevelAnswers({
//   questionId: mongoose.Types.ObjectId('5eb6b2e1e0474368ac835d5f'),
//   answers: ['334/165', '2*4/165'],
// });
// asd.save(error => { if (error) { console.log(error); } else { console.log('saved'); } });

router.post('/api/questions', async (req, res) => {
  InitialLevel.find({ $or: req.body }).exec((err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    if (!data) {
      return res.status(404).json({ err: 'No data' });
    }
    return res.status(200).send(data);
  });
});

router.post('/api/questions/submit', async (req, res) => {
  const options = mode => req.body.map(option => ({ [mode ? 'questionId' : '_id']: option.questionId }));
  await InitialLevelAnswers.find({ $or: options(1) }).lean().exec((err, docs) => {
    InitialLevel.find({ $or: options(0) }).lean().exec((error, data) => {
      if (err || error) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (!docs) {
        return res.status(404).json({ err: 'No data' });
      }
      return res.status(200).send(docs.map(doc => ({
        ...doc,
        correct: doc.answers.some(answer =>
          Number(answer) === req.body.find(({ questionId }) =>
            questionId === doc.questionId.toString()).answer),
        theme: data.find(({ _id }) =>
          _id.toString() === doc.questionId.toString()).theme,
        questionLevel: data.find(({ _id }) =>
          _id.toString() === doc.questionId.toString()).questionLevel,
      })));
    });
  });
});


router.get('*', (req, res) => {
  res.status(404).send('404');
});

module.exports = router;
