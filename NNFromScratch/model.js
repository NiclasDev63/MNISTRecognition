"use strict"


import * as math from 'mathjs';
import { Layer } from "./Layer.js"

export const globalVariables = {
    input: [],
    layerCount: 0,
    weights: [],
    bias: [],
    output: [],
    layers: [],
    y_true: [],
    y_pred: []
}

class Model {
    constructor() {
        this.test = 0
    }

    addLayer(args) {
        if (globalVariables.layerCount === 0) {
            globalVariables.layers[globalVariables.layerCount] = new Layer(args.inputDim, args.units, args.activation, args.useBias)
        } else {
            globalVariables.layers[globalVariables.layerCount] = new Layer(args.units, args.units, args.activation, args.useBias)
        }
    }

    forwardPass() {
        for (let layer = 0; layer < globalVariables.layerCount; layer++) {
            for (let y = 0; y < globalVariables.weights[layer][0].length; y++) {
                let sum = 0
                for (let x = 0; x < globalVariables.weights[layer].length; x++) {
                    if (layer === 0) {
                        sum += globalVariables.input[x] * globalVariables.weights[layer][x][y]
                    } else {
                        sum += globalVariables.output[layer - 1][x] * globalVariables.weights[layer][x][y]
                    }
                }
                globalVariables.output[layer][y] = globalVariables.bias[layer][y] + sum
            }
            let activation = globalVariables.layers[layer].activation
            this.chooseActivation(activation, layer)
        }
    }

    chooseActivation(activation, layer) {
        switch (activation) {
            case "relu": globalVariables.layers[layer].relu(layer); break;
            case "softmax": globalVariables.layers[layer].softmax(layer); break;
            default: console.log("This Activation function doesn't exist"); break;
        }
    }

    categoricalCrossEntropy() {
        globalVariables.y_pred = globalVariables.layerCount - 1
        globalVariables.y_pred = globalVariables.output[globalVariables.y_pred]

        const loss = -math.sum(math.multiply(globalVariables.y_true, math.log(globalVariables.y_pred)))
            / globalVariables.y_true.length
        console.log("Loss: ", loss)
    }

    categoricalDerivate() {
        return math.subtract(globalVariables.y_pred, globalVariables.y_true)

    }

}
const model = new Model()

globalVariables.input = [0, 2, 3, -4, 6, -6]
globalVariables.y_true = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]

let inputDim = globalVariables.input.length

model.addLayer({ inputDim: inputDim, units: 2, activation: "relu", useBias: true })
model.addLayer({ units: 2, activation: "relu", useBias: true })
model.addLayer({ units: 10, activation: "softmax", useBias: true })





model.forwardPass()

console.log(globalVariables.output)

model.categoricalCrossEntropy()

