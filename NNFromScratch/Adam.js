"use strict"

import * as math from 'mathjs';

/*TODO Calculate Gradients of:
- reLu
- softmax
- weights
-bias
*/


/**
 * @param {float} learningRate - The learning rate to use for the Adam gradient descent algorithm 
 * @param {float} beta1 - The exponential decay rate for the 1st moment estimates.
 * @param {float} beta2 - The exponential decay rate for the 2st moment estimates.
 * @param {Array} weights - The weights which need to be updatet
 * @param {Array} bias - The weights which need to be updatet
 **/

class Adam {
    constructor(learningRate = 0.001, beta1 = 0.9, beta2 = 0.999, weights, bias) {
        this.learningRate = learningRate
        this.beta1 = beta1
        this.beta2 = beta2
        this.epsilon = 1e-8
        this.m = math.zeros([weights.length, bias.length])
        this.v = math.zeros([weights.length, bias.length])
        this.t = 0
    }

    step() {
        this.t += 1

    }
}