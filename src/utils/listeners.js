"use strict";

const Canvas = require("/src/canvas")
const math = require("mathjs")
const TrainedModel = require("/src/trainedModel")


const canvas = new Canvas()
const Model = require("C:/Users/nicla/Desktop/Programming/NNWebsite/src/model.js")
const getData = require("./getData")

const htmlElements = {
  rstButton: document.getElementById("rstButton"),
  predButton: document.getElementById("predButton"),
  canvas: document.getElementById("myCanvas"),
  modelJson: document.getElementById("modelJson").getAttribute("href"),
  predOutPut: document.getElementById("predNumber"),
  confidence: document.getElementById("confidence")
};

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
  })

  htmlElements.canvas.addEventListener("mouseleave", () => {
    canvas.drawLine = false
  })

  htmlElements.rstButton.addEventListener("click", () => {
    canvas.clearCanvas()
    getData().then((data) => {
      console.log(data.x_train[0])
      const model2 = new Model(data.x_train, data.y_train, 0, 0, 1)
      model2.createModel()
      model2.trainModel()
    })
  })

  htmlElements.predButton.addEventListener("click", () => {
    let canvasOutput = canvas.getCanvasOutput()
    model.predictNumber(canvasOutput).then((pred) => {
      htmlElements.predOutPut.innerText = pred[0]
      htmlElements.confidence.innerText = "Confidence " + math.round(pred[1] * 100, 2) + "%"
    });
  })

};