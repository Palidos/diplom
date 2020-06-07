const { Router } = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const models = require('../models/index');

const router = Router();


router.get('/api/testList', async (req, res) => {
  mongoose.connection.db.listCollections().toArray((err, list) => {
    const collectionsNames = list.map(test => { return test.name; });
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

router.post('/api/newTest', async (req, res) => {
  const { testName } = req.body;
  try {
    if (fs.existsSync(path.join(__dirname, `../models/collectionsModels/${testName}.js`))) {
      return res.status(409).json({ err: 'File Already exists' });
    }
  } catch (err) {
    console.error(err);
  }
  try {
    fs.copyFileSync(path.join(__dirname, '../models/testsModelTemplate.js'),
      path.join(__dirname, `../models/collectionsModels/${testName}.js`),
      fs.constants.COPYFILE_EXCL);

    fs.readFile(path.join(__dirname, `../models/collectionsModels/${testName}.js`), 'utf-8', (err, data) => {
      if (err) { console.log('mocha'); return res.status(500).json({ err: err }); }

      const newValue = data.replace(/testName/gi, `${testName}`);

      fs.writeFile(path.join(__dirname, `../models/collectionsModels/${testName}.js`), newValue, 'utf-8', error => {
        if (error) { return res.status(500).json({ err: error }); }
        return res.status(201).json({ msg: 'File created' });
      });
    });
  } catch (err) {
    console.error(err);
  }
});

router.post('/api/addQuestion', async (req, res) => {
  models[req.body.collection].create(req.body.questionInfo, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    return res.status(201).json({ msg: 'Question added' });
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
