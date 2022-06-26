"use strict"

const tf = require("@tensorflow/tfjs");

/**
 * @param file the model.json of the trained model
 */
module.exports = class TrainedModel {
    constructor(file) {
        this.file = file
        this.model;
        this.loadModel()
    }
    async loadModel() {
        this.model = await tf.loadLayersModel(this.file)
    }

    async predictNumber(input) {
        let outPut = await this.model.predict(input)
        let prediction = outPut.argMax(-1)
        let confidence = outPut.max()
        prediction = Array.from(prediction.dataSync())
        confidence = Array.from(confidence.dataSync())
        return [prediction, confidence];
    }
}