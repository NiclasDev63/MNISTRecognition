"use strict";

module.exports = function createAndFillTwoDArray(rows, columns, fillValue) {
  let rowsArr = [];
  for (let i = 0; i < rows; i++) {
    rowsArr[i] = [];
    for (let j = 0; j < columns; j++) {
      rowsArr[i][j] = fillValue;
    }
  }
  return rowsArr;
};
