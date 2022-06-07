"use strict";

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
      this.context.lineWidth = 5;
      this.context.strokeStyle = "blue";
      this.context.moveTo(this.mousePos.x, this.mousePos.y);

      this.getMousePosition(event);

      this.context.lineTo(this.mousePos.x, this.mousePos.y);

      this.context.stroke();
    }
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getImageFromInput() {
    // return this.context.getImageData(
    //   0,
    //   0,
    //   this.canvas.width,
    //   this.canvas.height
    // );

    return this.canvas.toDataURL();
  }

  resizeImg(img) {
    const img = new Image();

    img.src = this.getImageFromInput();
    let oc = document.createElement("canvas"),
      octx = oc.getContext("2d");

    oc.width = 448 * 0.5;
    oc.height = 448 * 0.5;

    octx.drawImage(img, 0, 0, oc.width, oc.height);

    octx.drawImage(img, 0, 0, oc.width * 0.5, oc.height * 0.5);

    this.context.drawImage(
      img,
      0,
      0,
      oc.width * 0.25,
      oc.height * 0.25,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }
};