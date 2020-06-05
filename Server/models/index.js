/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs');

// const models = { math: require('./math') };
// const models = { };

const modelsNames = fs.readdirSync(__dirname).map(file => file.split('.')[0]).filter(file => file !== 'index');

// modelsNames.map(modelName => ({
//   ...models,
//   [modelName]: require(`./${modelName}`),
// }));

const models = modelsNames.reduce((obj, modelName) => ({
  ...obj,
  [modelName]: require(`./${modelName}`),
}), {});
module.exports = models;
