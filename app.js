const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

const db = {
  questions: [
    {
      id: 1,
      question: 'asdasdas',
      answer1: '111111',
      answer2: '222222',
      answer3: '333333',
      answer4: '444444',
    },
    {
      id: 2,
      question: 'kkkkkkk',
      answer1: '111111',
      answer2: '222222',
      answer3: '333333',
      answer4: '444444',
    },
    {
      id: 3,
      question: 'wwwwwwwwwwwww',
      answer1: '111111',
      answer2: '222222',
      answer3: '333333',
      answer4: '444444',
    },
    {
      id: 4,
      question: 'qqqqqqqqq',
      answer1: '111111',
      answer2: '222222',
      answer3: '333333',
      answer4: '444444',
    },
    {
      id: 5,
      question: 'ooooooooooo',
      answer1: '111111',
      answer2: '222222',
      answer3: '333333',
      answer4: '444444',
    },
    {
      id: 6,
      question: '123123123123123123123123123123123123123123',
      answer1: '111111',
      answer2: '222222',
      answer3: '333333',
      answer4: '444444',
    },
  ],
};


// @route GET /
// @desc Loads db in JSON
app.get('/api/', (req, res) => {
  if (Object.entries(db).length === 0 && db.constructor === Object) {
    return res.status(404).json({ err: 'No data' });
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  return res.status(200).json(db);
});

// @route GET /users
// @desc  Display all users in JSON
app.get('/api/questions', (req, res) => {
  if (!db.questions.length) {
    return res.status(404).json({ err: 'No data' });
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  return res.status(200).json(db.questions);
});

// @route GET /users
// @desc  Display all users in JSON
app.get('/user/:id', (req, res) => {
  if (!db.users.find(user => user.id === req.params.id)) {
    return res.status(404).json({ err: `No user with id:${req.params.id}` });
  }

  return res.status(200).json(db.users.find(user => user.id === req.params.id));
});

// @route GET /feed
// @desc  Display feed
app.get('/feed', (req, res) => {
  if (!db.feed.length) {
    return res.status(404).json({ err: `No feed` });
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  return res.status(200).json(db.feed);
});

// @route POST /users
// @desc  Adds a new user
app.post('/api/questions/submit', (req, res) => {
  // const { id } = req.body;
  // const { adName } = req.body;
  // db.users.push({
  //   id,
  //   adName,
  // });
  return res.sendStatus(200);
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete('/users/:id', (req, res) => {
  if (!db.users.find(user => user.id === req.params.id)) {
    return res.status(404).json({ err: `No user with id:${req.params.id}` });
  }
  db.users.filter(({ id }) => id !== req.params.id);
});

const port = 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));
