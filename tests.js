"use strict";

const colors = require("colors");

const LinkedList = require("./main");

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
  function copiesNums() {
    let numsCopy = NUMS.copy();

    if (!numsCopy.isValid() || !NUMS.isValid()) {
      return Result(
        false,
        "invalid list"
      );
    }

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
        `created valid duplicate of NUMS`
      );
  },
  function mapsAddition() {
    let numsCopy = NUMS.copy();

    numsCopy.map(x => x + 1);
    let expectedValues = [2, 3, 4];
    let temp = numsCopy.head;
    let i = 0;
    while (temp) {
      if (temp.value !== expectedValues[i]) {
        return Result(
          false,
          "values not all correct"
        );
      }
      temp = temp.next;
      i++;
    }
    return Result(
      true,
      "values map correctly"
    );
  }
].forEach(f => {
  let r = f();
  r.passed ?
    console.log(
      `${f.name} passed: ${r.msg}`.green
    ) : console.log(
      `${f.name} failed: ${r.msg}`.red
    );
});
