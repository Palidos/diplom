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

router.get('/api/questions', async (req, res) => {
  await InitialLevel.find((err, data) => {
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
  await InitialLevelAnswers.find((err, data) => {
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
