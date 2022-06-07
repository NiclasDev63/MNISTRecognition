"use strict";
const fillArr = require("./utils/createAndFillTwoDimArr");

module.exports = class Board {
  constructor() {
    this.rows = 28;
    this.columns = 28;
    this.board = document.getElementById("board");
    this.boardBody = this.board.firstElementChild;
    this.count = { x: 0, y: 0 };
    this.drawing = false;
    this.outPutArr = fillArr(this.rows, this.columns, 0);
  }
  createColumn(row) {
    const column = document.createElement("td");
    column.setAttribute("id", this.count.y + "-" + this.count.x);
    column.setAttribute("class", "unclicked");
    row.appendChild(column);
    this.count.x++;
  }

  createRow() {
    const row = document.createElement("tr");
    row.setAttribute("id", this.count.y);
    this.boardBody.appendChild(row);

    return row;
  }

  createBoard() {
    for (let row = 0; row < this.rows; row++) {
      const parentRow = this.createRow();
      for (let column = 0; column < this.columns; column++) {
        this.createColumn(parentRow);
      }
      this.count.y++;
      this.count.x = 0;
    }
  }

  resetBoard() {
    const clickedTdElements = document.querySelectorAll(".clicked");
    for (const td of clickedTdElements) {
      td.setAttribute("class", "unclicked");
    }
  }

  draw(element) {
    if (this.drawing) {
      element.setAttribute("class", "clicked");
    }
  }

  createArray() {
    const trElements = document.querySelectorAll("tr");
    for (let tr = 0; tr < trElements.length; tr++) {
      const tdElements = trElements[tr].childNodes;
      for (let td = 0; td < tdElements.length; td++) {
        if (tdElements[td].getAttribute("class") === "clicked") {
          this.outPutArr[tr][td] = 1;
          continue;
        }
        this.outPutArr[tr][td] = 0;
      }
    }
  }
};
