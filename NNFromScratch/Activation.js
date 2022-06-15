"use strict"

import * as math from 'mathjs';

export class Softmax {
    constructor(input) {
        this.input = input
        this.outPutDim = this.input.length
        this.newOutput;
        this.gradient = math.zeros([this.outPutDim, this.outPutDim])
    }

    forward(input = this.input) {
        this.input = input
        const max = math.max(this.input)
        const z = math.subtract(this.input, max)
        const numerator = math.exp(z)
        const denominator = math.sum(numerator)
        this.newOutput = math.divide(numerator, denominator)

        return this.newOutput
    }

    backward() {
        for (let i = 0; i < this.input.length; i++) {
            for (let j = 0; j < this.input.length; j++) {
                if (i === j) {
                    this.gradient[i][j] = this.newOutput[i] * (1 - this.newOutput[i])
                    continue
                }
                this.gradient[i][j] = -this.newOutput[i] * this.newOutput[j]
            }
        }
        return this.gradient
    }
}


const arr = [
    54.8107325990937,
    23.389749169308,
    17.6756261359287,
    97.3125100738938,
    43.2656157981841,
    50.1166010725483,
    80.2681322212866,
    98.2158840470644,
    44.6910461305857,
    13.73903354551905
]

const arr2 = [
    54.8107325990937,
    13.389749169308,
    17.6756261359287,
    37.3125100738938,
    3.2656157981841,
    40.1166010725483,
    20.2681322212866,
    18.2158840470644,
    64.6910461305857,
    53.73903354551905
]

const softmax = new Softmax(arr)
softmax.forward(arr)
softmax.forward(arr2)
console.log(softmax.newOutput)
softmax.backward()
console.log(softmax.gradient.length)
