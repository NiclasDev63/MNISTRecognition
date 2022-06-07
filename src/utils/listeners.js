"use strict";

const Board = require("/src/board");
const globalEventListener = require("./GlobalEventListener");
const getPredNumber = require("./feedInputIntoModel");

const board = new Board();
board.createBoard();

const htmlElements = {
  rstButton: document.getElementById("rstButton"),
  predButton: document.getElementById("predButton"),
  boardElem: document.getElementById("board"),
  modelJson: document.getElementById("modelJson").getAttribute("href"),
  predOutPut: document.getElementById("predNumber")
};

module.exports = function runListeners() {
  globalEventListener("mousedown", "td", (e) => {
    board.drawing = true;
    board.draw(e.target);
  });

  htmlElements.predButton.addEventListener("click", () => {
    board.createArray();
    getPredNumber(board.outPutArr, htmlElements.modelJson).then((pred) => {
      let prediction = pred[0];
      htmlElements.predOutPut.innerText = prediction
    });
  });

  globalEventListener("mouseover", "td", (e) => {
    board.draw(e.target);
  });

  globalEventListener("mouseup", "td", () => {
    board.drawing = false;
  });

  htmlElements.boardElem.addEventListener("mouseleave", () => {
    board.drawing = false;
  });

  htmlElements.rstButton.addEventListener("click", () => {
    board.resetBoard();
    htmlElements.predOutPut.innerText = "Draw a Number between 0-9"
  });
};