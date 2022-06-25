"use strict";

const tf = require("@tensorflow/tfjs");

module.exports = class Model {
  constructor(
    x_train = 0,
    y_train = 0,
    x_test = 0,
    y_test = 0,
    epochs = 0,
  ) {
    this.x_train = tf.tensor(x_train);
    this.y_train = tf.tensor(y_train);

    this.x_test = tf.tensor(x_test);
    this.y_test = tf.tensor(y_test);
    this.epochs = epochs;
    this.model;
  }

  compileModel() {
    this.model.compile({
      optimizer: "adam",
      loss: "categoricalCrossentropy",
      metrics: ["accuracy"],
    });
  }

  createModel() {
    this.model = tf.sequential({
      layers: [
        tf.layers.conv2d({ kernelSize: 3, filters: 16, inputShape: [28, 28, 1] }),
        tf.layers.activation({ activation: "relu" }),
        tf.layers.flatten(),
        tf.layers.dense({ units: 10 }),
        tf.layers.activation({ activation: "relu" })
      ]
    })
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
  async predictNumber(input) {
    let outPut = await this.model.predict(input)
    let prediction = outPut.argMax(-1)
    let confidence = outPut.max()
    prediction = Array.from(prediction.dataSync())
    confidence = Array.from(confidence.dataSync())
    return [prediction, confidence];
  }

  async loadModel(file) {
    this.model = await tf.loadLayersModel(
      file
    );
  }
};