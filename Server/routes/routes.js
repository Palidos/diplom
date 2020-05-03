const { Router } = require('express');

const modelAnswers = require('../models/answers');
const modelQuestions = require('../models/questions');

const router = Router();

router.get('/api/questions', async (req, res) => {
  await modelQuestions.find((err, data) => {
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
  await modelAnswers.find((err, data) => {
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


router.get('*', (req, res) => {
  res.status(404).send('404');
});

module.exports = router;
