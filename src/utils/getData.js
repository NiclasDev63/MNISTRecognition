"use strict";

module.exports = async function getData() {
    const data = await fetch("C:/Users/nicla/Desktop/Programming/NNWebsite/Dataset/Iris.json", "utf8")
    return JSON.parse(data)
}