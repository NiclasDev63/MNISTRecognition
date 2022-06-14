"use strict"

import * as math from 'mathjs';

export function categoricalCrossEntropy(y_pred, y_true) {
    const loss = -math.sum(math.multiply(y_true, math.log(y_pred)))
        / y_true.length
    console.log("Loss: ", loss)
}

export function categoricalDerivate(y_pred, y_true) {
    return math.subtract(y_pred, y_true)

}