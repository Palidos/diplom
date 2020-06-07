/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

let models = {};

const modelsNames = fs.readdirSync(path.join(__dirname, 'collectionsModels'))
  .map(file => file.split('.')[0]);

models = modelsNames.reduce((obj, modelName) => ({
  ...obj,
  [modelName]: require(`./collectionsModels/${modelName}`),
}), {});

module.exports = models;
