"use strict"

import * as math from 'mathjs';
import { globalVariables } from "./model.js"

/**
 * @param {float} learningRate - The learning rate to use for the Adam gradient descent algorithm 
 * @param {float} beta1 - The exponential decay rate for the 1st moment estimates.
 * @param {float} beta2 - The exponential decay rate for the 2st moment estimates.
 **/

class Adam {
    constructor(learningRate = 0.001, beta1 = 0.9, beta2 = 0.999) {
        this.learningRate = learningRate
        this.beta1 = beta1
        this.beta2 = beta2
        this.epsilon = 1e-8
        this.m;
        this.v;
        this.t;
    }
}