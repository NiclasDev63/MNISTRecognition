"use strict";

module.exports = class Grid {
  constructor() {
    this.rows = 28;
    this.columns = 28;
    this.gridElement = document.getElementById("grid");
    this.count = 0;
  }
  craeteGridItem() {
    const gridItem = document.createElement("div");
    gridItem.setAttribute("class", "grid-item");
    gridItem.setAttribute("id", this.count);
    this.count++;

    return gridItem;
  }

  createGrid() {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        this.gridElement.appendChild(this.craeteGridItem());
      }
    }
  }
};
