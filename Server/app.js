const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes/routes');

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-c6g2m.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' })); // for parsing application/json
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true,
})); // for parsing application/x-www-form-urlencoded
app.use(routes);

const start = async () => {
  try {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    await console.log('Mongo DB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
