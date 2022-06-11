"use strict"

import * as math from 'mathjs';

import { globalVariables } from "./model.js"




/**
 * @param {integer} inputDim - Dimensionality of the input
 * @param {integer} units - Dimensionality of the output
 * @param {String} activation - Activation function to use in the Layer
 * @param {boolean} useBias - Whether bias should be applied or not
 */

export class Layer {
    constructor(inputDim = units, units, activation, useBias) {
        this.inputDim = inputDim
        this.units = units
        this.activation = activation
        this.useBias = useBias
        if (useBias) {
            this.initializeBias()
        }
        this.initializeWeights()
        globalVariables.layerCount++
    }

    initializeWeights() {
        if (globalVariables.layerCount !== 0) {
            globalVariables.weights[globalVariables.layerCount] =
                math.random([globalVariables.layers[globalVariables.layerCount - 1].units, this.units], 0, 2)
        } else {
            globalVariables.weights[globalVariables.layerCount] =
                math.random([globalVariables.input.length, this.units], -2, 2)
        }
        globalVariables.output[globalVariables.layerCount] = math.zeros([this.units])
    }
    initializeBias() {
        globalVariables.bias[globalVariables.layerCount] =
            math.random([this.units], -1, 1)
    }


    relu(layer) {
        for (let x = 0; x < globalVariables.output[layer].length; x++) {
            globalVariables.output[layer][x] =
                math.max(0, globalVariables.output[layer][x])
        }
    }
    softmax(layer) {
        let denominator = math.sum(math.exp(globalVariables.output[layer]))
        for (let x = 0; x < globalVariables.output[layer].length; x++) {
            globalVariables.output[layer][x] =
                math.exp(globalVariables.output[layer][x]) / denominator
        }
    }
}