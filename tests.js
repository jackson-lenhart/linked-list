"use strict";

let LinkedList = require("./main");

// helpers
function Result(passed, msg) {
  return {
    passed,
    msg
  };
}

// global variables for mocking
const NUMS = LinkedList([1, 2, 3]);

[
  function copy() {
    let numsCopy = NUMS.copy();

    if (numsCopy === NUMS) {
      return Result(
        false,
        "copy references original"
      );
    }

    let x = numsCopy.head;
    let y = NUMS.head;
    while (x) {
      if (!x.value === y.value) {
        return Result(
          false,
          "duplicate not equivalent"
        );
      }
      x = x.next;
      y = y.next;
    }

    return y ?
      Result(
        false,
        "original has more nodes than copy"
      ) : Result(
        true,
        "copy"
      );
  },
];
