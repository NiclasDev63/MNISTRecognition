"use strict";

module.exports = function globalEventListener(eventType, element, cb) {
  document.addEventListener(eventType, (e) => {
    try {
      if (e.target.matches(element)) {
        cb(e);
      }
    } catch {
      console.log("wrong Element");
      console.log("Your target must be", e.target)
    }
  });
};
