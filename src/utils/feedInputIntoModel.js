"use strict";

const Model = require("/src/model");

async function getModel(model, file) {
  return await model.loadModel(file);
}

module.exports = function getNumber(inputArr, file) {
  const model = new Model();
  return new Promise((resolve) => {
    return resolve(
      getModel(model, file).then(() => {
        model.compileModel();
        return model.predictNumber(inputArr);
      })
    );
  });
};
