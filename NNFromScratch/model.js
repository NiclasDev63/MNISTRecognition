"use strict"

import * as math from 'mathjs';
import { Layer } from "./Layer.js"
import { argMax } from "/Users/nicla/Desktop/Programming/NNWebsite/src/utils/argMax.js"
import { categoricalCrossEntropy } from "./LossFunction.js"

// export const globalVariables = {
//     input: [],
//     layerCount: 0,
//     weights: [],
//     bias: [],
//     output: [],
//     layers: [],
//     y_true: [],
//     y_pred: []
// }

class Model {
    constructor(input, y_train) {
        this.input = input
        this.y_train = y_train
        this.layerCount = 0
        this.weights = []
        this.bias = []
        this.output = []
        this.layers = []
    }

    addLayer(args) {
        if (this.layerCount === 0) {
            this.layers[this.layerCount] = new Layer(args.inputDim, args.units, args.activation, args.useBias)
        } else {
            this.layers[this.layerCount] = new Layer(args.units, args.units, args.activation, args.useBias)
        }
        this.initializeWeights(args.units)
        if (args.useBias) {
            this.initializeBias()
        }
        this.layerCount++
    }

    initializeWeights(units) {
        if (this.layerCount !== 0) {
            this.weights[this.layerCount] =
                //math.random([this.layers[this.layerCount - 1].units, this.layers[this.layerCount].units], 0, 2)
                math.random([units, this.layers[this.layerCount - 1].units], 0, 2)
        } else {
            this.weights[this.layerCount] =
                //math.random([this.input.length, this.layers[this.layerCount].units], -2, 2)
                math.random([units, this.input.length], -2, 2)
        }
        this.output[this.layerCount] = math.zeros([units])
    }

    initializeBias() {
        this.bias[this.layerCount] =
            math.random([this.layers[this.layerCount].units], -1, 1)
    }

    // forwardPass() {
    //     for (let layer = 0; layer < this.layerCount; layer++) {
    //         for (let y = 0; y < this.weights[layer][0].length; y++) {
    //             let sum = 0
    //             for (let x = 0; x < this.weights[layer].length; x++) {
    //                 if (layer === 0) {
    //                     sum += this.input[x] * this.weights[layer][x][y]

    //                 }else{
    //                 sum += this.output[layer - 1][x] * this.weights[layer][x][y]
    //                 }
    //             }
    //             if (this.useBias) {
    //                 this.output[layer][y] = this.bias[layer][y] + sum
    //                 continue
    //             }
    //             this.output[layer][y] = this.bias[layer][y] + sum
    //         }
    //         let activation = this.layers[layer].activation
    //         this.output[layer] = this.chooseActivation(activation, layer)
    //     }
    //     let output = this.output[this.layerCount - 1]
    //     categoricalCrossEntropy(output, this.y_train)
    // }
    forwardPass() {
        let input = this.input
        for (let layer = 0; layer < this.layerCount; layer++) {
            let temp = math.multiply(this.weights[layer], input)
            temp = math.add(temp, this.bias[layer])

            this.output[layer] = temp

            let activation = this.layers[layer].activation
            this.output[layer] = this.chooseActivation(activation, layer)

            input = this.output[layer]
        }

    }
    chooseActivation(activation, layer) {
        let output;
        switch (activation) {
            case "relu": output = this.layers[layer].relu(this.output[layer]); break;
            case "softmax": output = this.layers[layer].softmax(this.output[layer]); break;
            default: console.log("This Activation function doesn't exist"); break;
        }
        return output
    }

}


const input = [1, 50, 1, 0.5, 30, 1]

const y_true = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]



const inputDim = input.length

const model = new Model(input, y_true)

model.addLayer({ inputDim: inputDim, units: 256, activation: "relu", useBias: true })
model.addLayer({ units: 256, activation: "relu", useBias: true })
model.addLayer({ units: 10, activation: "softmax", useBias: true })




model.forwardPass()

console.log(model.output)