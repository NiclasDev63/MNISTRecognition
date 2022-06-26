"use strict";

/**
 * @param eventType the type of event globalEventListener should call
 * @param element the element on which globalEventListener is called
 * @param cb callback
 */
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
