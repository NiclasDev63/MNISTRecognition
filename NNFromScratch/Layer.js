"use strict"

import * as math from 'mathjs';

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
    }

    relu(output) {
        let arr = []
        for (let x = 0; x < output.length; x++) {
            arr[x] =
                math.max(0, output[x])
        }
        return arr
    }

    // numerically stable softmax version (prevents overflow)
    softmax(output) {
        const max = math.max(output)

        const z = math.subtract(output, max)
        const numerator = math.exp(z)

        const denominator = math.sum(numerator)

        const softmax = math.divide(numerator, denominator)

        return softmax
    }
}