"use strict";

const tf = require("@tensorflow/tfjs");

module.exports = class Model {
  constructor(
    x_train = 0,
    y_train = 0,
    x_test = 0,
    y_test = 0,
    epochs = 0,
    loadModel = false
  ) {
    this.x_train = tf.tensor(x_train);
    this.y_train = tf.tensor(y_train);

    this.x_test = tf.tensor(x_test);
    this.y_test = tf.tensor(y_test);
    this.epochs = epochs;
    this.model;
  }

  compileModel() {
    const adamax = tf.train.adamax(0.001);
    this.model.compile({
      optimizer: adamax,
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"],
    });
  }

  createModel() {
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({
          inputShape: [784],
          units: 256,
          activation: "relu",
        }),
        tf.layers.dense({ units: 256, activation: "relu" }),
        tf.layers.dense({ units: 10, activation: "softmax" }),
      ],
    });
    this.compileModel();
  }

  trainModel() {
    this.model.summary();
    return new Promise((resolve) => {
      return resolve(
        this.model
          .fit(this.x_train, this.y_train, {
            epochs: this.epochs,
            batchSize: 128,
          })
          .then((info) => {
            console.log(
              "Final accuracy",
              info.history.acc[info.history.acc.length - 1]
            );
          })
      );
    });
  }

  evaluateModel() {
    const result = this.model.evaluate(this.x_test, this.y_test, {
      batchSize: 4,
    });

    tf.print(result[0]);
    tf.print(result[1]);
  }
  predictNumber(input) {
    input = tf.tensor(input).reshape([-1, 784]);
    let outPut = this.model.predict(input).argMax(-1)
    outPut = outPut.dataSync()
    return Array.from(outPut);
  }
  async saveModel() {
    try {
      let tsModelTraining = await this.model.save(
        "file:///Users/nicla/Desktop/Programming/MNISTWebsite/MNISTClassifier"
      );
    } catch (error) {
      console.log(error);
    }
  }

  async loadModel(file) {
    this.model = await tf.loadLayersModel(
      //"file:///Users/nicla/Desktop/Programming/MNISTWebsite/MNISTClassifier/model.json"
      file
    );
  }
};