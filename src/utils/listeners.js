"use strict";

const Canvas = require("/src/canvas")
const math = require("mathjs")
const TrainedModel = require("/src/trainedModel")
const draw = require("./drawNetwork");
const drawNetwork = require("./drawNetwork");

const htmlElements = {
  rstButton: document.getElementById("rstButton"),
  canvas: document.getElementById("myCanvas"),
  modelJson: document.getElementById("modelJson").getAttribute("href"),
  predOutPut: document.getElementById("predNumber"),
  confidence: document.getElementById("confidence"),
  canvas2: document.getElementById("myCanvas")
};

function getPred(canvasOutput){
  model.predictNumber(canvasOutput).then((pred) => {
    htmlElements.predOutPut.innerText = pred[0]
    draw(pred[0], htmlElements.canvas)
    htmlElements.confidence.innerText = "Confidence " + math.round(pred[1] * 100, 2) + "%"
  });
}

//Initialize the Canvas with the Network in it
//draw()

const canvas = new Canvas()
const model = new TrainedModel(htmlElements.modelJson)

module.exports = function runListeners() {

  htmlElements.canvas.addEventListener("mousedown", (event) => {
    canvas.drawLine = true
    canvas.getMousePosition(event)
  })

  htmlElements.canvas.addEventListener("mousemove", (event) => {
    canvas.draw(event)
  })

  htmlElements.canvas.addEventListener("mouseup", () => {
    canvas.drawLine = false
    let canvasOutput = canvas.getCanvasOutput()
    getPred(canvasOutput)
  })

  htmlElements.canvas.addEventListener("mouseleave", () => {
    canvas.drawLine = false
  })

  htmlElements.rstButton.addEventListener("click", () => {
    canvas.clearCanvas()
    draw()
  })

};