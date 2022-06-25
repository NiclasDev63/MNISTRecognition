"use strict"

const Model = require("./src/model")
const fs = require("fs")

const rawData = fs.readFileSync("C:/Users/nicla/Desktop/Programming/NNWebsite/Dataset/Iris.json")

const json = JSON.parse(rawData)
const model = new Model(json.x_train, json.y_train, 0, 0, 10)

model.createModel()
model.trainModel()
