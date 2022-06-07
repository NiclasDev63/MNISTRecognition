"use strict";

const Model = require("./src/model");
const MNIST = require("./src/utils/getDataset");

async function getModel(model) {
  return await model.loadModel();
}

MNIST().then((MNIST) => {
  const x_train = MNIST.x_train;
  const y_train = MNIST.y_train;

  const x_test = MNIST.x_test;
  const y_test = MNIST.y_test;

  const model = new Model(x_train, y_train, x_test, y_test, 15);

  getModel(model).then(() => {

  //model.createModel();
  model.compileModel()

  //model.predictNumber(inputArr)
  //model.saveModel()

  model.trainModel().then((info) => {
    model.evaluateModel();
  });
});

})