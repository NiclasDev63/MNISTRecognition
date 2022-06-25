"use strict";

const tf = require("@tensorflow/tfjs");
const tfvis = require("@tensorflow/tfjs-vis")

const trainingPlot =  document.getElementById("lossData")

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

    console.log(this.x_train.data())

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
        tf.layers.dense({ units: 20, inputShape: [4] }),
        tf.layers.activation({ activation: "relu" }),
        tf.layers.dense({ units: 20 }),
        tf.layers.activation({ activation: "relu" }),
        tf.layers.dense({ units: 3 }),
        tf.layers.activation({ activation: "sigmoid" })
      ]
    })
    this.compileModel();
  }

  async trainModel() {
    this.model.summary();
    const callbacks = tfvis.show.fitCallbacks(trainingPlot, ['loss'], {callbacks:['onEpochEnd']})
    await this.model
      .fit(this.x_train, this.y_train, {
        epochs: this.epochs,
        batchSize: 10,
        callbacks: callbacks
      })
      .then((info) => {
        console.log(
          "Final accuracy",
          info.history.acc[info.history.acc.length - 1]
        );
      })
  }

  evaluateModel() {
    const result = this.model.evaluate(this.x_test, this.y_test, {
      batchSize: 4,
    });

    tf.print(result[0]);
    tf.print(result[1]);
  }

};
