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

function toArray(head) {
  let temp = head;
  let arr = [];
  while (temp) {
    arr.push(temp.value);
    temp = temp.next;
  }
  return arr;
}

// global variables for mocking
const NUMS = LinkedList([2, 1, 4, 6, 3]);

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
    let expectedValues = toArray(NUMS.head).map(x => x + 1);
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
  },
  function sortsNums() {
    let numsCopy = NUMS.copy();

    numsCopy.sort((a, b) => a - b);
    let sortedOrder = toArray(NUMS.head).sort();
    let temp = numsCopy.head;
    let i = 0;
    while (temp) {
      if (temp.value !== sortedOrder[i]) {
        return Result(
          false,
          "values not in sorted order"
        );
      }
      temp = temp.next;
      i++;
    }
    return Result(
      true,
      "values sort correctly"
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
