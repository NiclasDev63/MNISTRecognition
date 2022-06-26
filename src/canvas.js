"use strict";

const tf = require("@tensorflow/tfjs");

module.exports = class Canvas {
  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.drawLine = false;
    this.mousePos = { x: 0, y: 0 };
    this.context = this.canvas.getContext("2d");
  }

  getMousePosition(event) {
    const bound = this.canvas.getBoundingClientRect();

    this.mousePos.x = event.clientX - bound.left;
    this.mousePos.y = event.clientY - bound.top;
  }

  draw(event) {
    if (this.drawLine) {
      this.context.beginPath();
      this.context.lineWidth = 15;

      this.context.strokeStyle = "white";
      this.context.moveTo(this.mousePos.x, this.mousePos.y);

      this.getMousePosition(event);

      this.context.lineTo(this.mousePos.x, this.mousePos.y);

      this.context.stroke();
    }
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // https://github.com/maneprajakta/Digit_Recognition_Web_App/blob/master/js/main.js
  getCanvasOutput() {
    let tensor = tf.browser.fromPixels(this.canvas).resizeNearestNeighbor([28, 28]).mean(2).expandDims(2).expandDims().toFloat();
    return tensor.div(255.0);
  }

};