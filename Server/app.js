const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const db = {
  questions: [
    {
      id: 1,
      question: 'asdasdas',
      answers: [
        '111111',
        '222222',
        '333333',
        '444444',
      ],
    },
    {
      id: 2,
      question: 'kkkkkkk',
      answers: [
        '111111',
        '222222',
        '333333',
        '444444',
      ],
    },
    {
      id: 3,
      question: 'wwwwwwwwwwwww',
      answers: [
        '111111',
        '222222',
        '333333',
        '444444',
      ],
    },
    {
      id: 4,
      question: 'qqqqqqqqq',
      answers: [
        '111111',
        '222222',
        '333333',
        '444444',
      ],
    },
    {
      id: 5,
      question: 'ooooooooooo',
      answers: [
        '111111',
        '222222',
        '333333',
        '444444',
      ],
    },
    {
      id: 6,
      question: '123123123123123123123123123123123123123123',
      answers: [
        '111111',
        '222222',
        '333333',
        '444444',
      ],
    },
  ],
  answers: [
    {
      id: 1,
      answerId: 1,
    },
    {
      id: 2,
      answerId: 0,
    },
    {
      id: 3,
      answerId: 3,
    },
    {
      id: 4,
      answerId: 0,
    },
    {
      id: 5,
      answerId: 2,
    },
    {
      id: 6,
      answerId: 2,
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

// @route POST /users
// @desc  Adds a new user
app.post('/api/questions/submit', (req, res) => {
  const clientAnswers = req.body;
  const rightAnswers = clientAnswers.map(answer => ({
    id: answer.id,
    correct: answer.answerId === db.answers.find(({ id }) => id === answer.id).answerId,
  }));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  return res.json(rightAnswers).sendStatus(200);
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
