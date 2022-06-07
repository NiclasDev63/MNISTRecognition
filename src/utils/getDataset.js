"use strict";

const fs = require("fs");


module.exports = function getData() {
  return new Promise((resolve) => {
    fs.readFile("C:/Users/nicla/Desktop/Programming/MNISTWebsite/Dataset/MNIST.json", "utf8", (err, data) => {
      if (err) {
        console.log("File read failed:", err);
        return;
      }

      return resolve(JSON.parse(data));
    });
  });
};
