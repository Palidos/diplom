const { Router } = require('express');

const modelAnswers = require('../models/answers');
const modelQuestions = require('../models/questions');

const router = Router();

// const db = {
//   questions: [
//     {
//       id: 1,
//       question: 'asdasdas',
//       answers: [
//         '111111',
//         '222222',
//         '333333',
//         '444444',
//       ],
//     },
//     {
//       id: 2,
//       question: 'kkkkkkk',
//       answers: [
//         '111111',
//         '222222',
//         '333333',
//         '444444',
//       ],
//     },
//     {
//       id: 3,
//       question: 'wwwwwwwwwwwww',
//       answers: [
//         '111111',
//         '222222',
//         '333333',
//         '444444',
//       ],
//     },
//     {
//       id: 4,
//       question: 'qqqqqqqqq',
//       answers: [
//         '111111',
//         '222222',
//         '333333',
//         '444444',
//       ],
//     },
//     {
//       id: 5,
//       question: 'ooooooooooo',
//       answers: [
//         '111111',
//         '222222',
//         '333333',
//         '444444',
//       ],
//     },
//     {
//       id: 6,
//       question: '123123123123123123123123123123123123123123',
//       answers: [
//         '111111',
//         '222222',
//         '333333',
//         '444444',
//       ],
//     },
//   ],
//   answers: [
//     {
//       id: 1,
//       answerId: 1,
//     },
//     {
//       id: 2,
//       answerId: 0,
//     },
//     {
//       id: 3,
//       answerId: 3,
//     },
//     {
//       id: 4,
//       answerId: 0,
//     },
//     {
//       id: 5,
//       answerId: 2,
//     },
//     {
//       id: 6,
//       answerId: 2,
//     },
//   ],
// };


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


router.post('/api/questions/submit', (req, res) => {
  const clientAnswers = req.body;
  const rightAnswers = clientAnswers.map(answer => ({
    id: answer.id,
    correctAnswerId: modelAnswers.findById(answer.id, (err, ans) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (!ans) {
        return res.status(404).json({ err: `No question with id: ${answer.id}` });
      }
      return ans.answerId;
    }),
  }));
  return res.json(rightAnswers).sendStatus(200);
});


router.get('*', (req, res) => {
  res.status(404).send('404');
});


module.exports = router;
