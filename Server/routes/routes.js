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
  const a = req.body.map(async options => {
    console.log(options, 'options');
    console.log(await InitialLevel.find(options, 'theme question').exec(), 'asasasd');
    return InitialLevel.find(options);
  });
  console.log(await a);
  await res.status(200).send(await a);
  // if (req.body.length) {
  //   return res.status(200).send(await req.body.map(async options => {
  //     console.log(options, 'options');
  //     console.log(await InitialLevel.find(options, 'theme question').exec(), 'asasasd');
  //     await InitialLevel.find(options).exec();
  //   }));
  // }
  // await InitialLevel.find({ questionLevel: 0 }, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     return res.sendStatus(500);
  //   }
  //   if (!data) {
  //     return res.status(404).json({ err: 'No data' });
  //   }
  //   return res.status(200).send(data);
  // });
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
