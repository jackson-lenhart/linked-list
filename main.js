"use strict";

// helpers
function isObject(x) {
  return x.toString() === "[object Object]";
}

function Node(value) {
  return {
    value,
    next: null
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

function isNode(n) {
  let keys = Object.keys(n);
  let expectedKeys = Object.keys(Node("test"));
  if (keys.length !== expectedKeys.length) {
    return false;
  }

  keys.sort();
  expectedKeys.sort();

  let correctTemplate = true;
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] !== expectedKeys[i]) {
      correctTemplate = false;
    }
  }

  return correctTemplate &&
    isObject(n) &&
    n.next === null || isObject(n.next);
}

function isSorted(head, f) {
  let currNode = head;
  while (currNode.next) {
    let difference = f(currNode.value, currNode.next.value);
    if (isNaN(difference)) {
      throw new Error("Sorting function does not return a number for all cases");
    }

    if (difference > 0) {
      return false;
    }
    currNode = currNode.next;
  }
  return true;
}

function LinkedList(seed) {
  let head;
  if (Array.isArray(seed)) {
    if (seed.length === 0) {
      return Node(null);
    }

    head = Node(seed[0]);

    let temp = head;
    for (let i = 1; i < seed.length; i++) {
      temp.next = Node(seed[i]);
      temp = temp.next;
    }
  // when seed is an object literal that should mean we are making a copy
  } else if (isObject(seed)) {
    head = seed;
  } else {
    head = Node(seed);
  }

  return {
    head,
    copy: () =>
      LinkedList({
        ...head
      }),
    map: f => {
      let temp = head;
      while (temp) {
        temp.value = f(temp.value);
        temp = temp.next;
      }
    },
    render: () => {
      let temp = head;
      while (temp) {
        console.log(temp.value);
        temp = temp.next;
        if (temp) {
          console.log("|");
          console.log("v");
        }
      }
    },
    push: x => {
      let temp = head;
      while (temp.next) {
        temp = temp.next;
      }
      temp.next = Node(x);
    },
    contains: x => {
      let temp = head;
      while (temp) {
        if (temp.value === x) {
          return true;
        }
        temp = temp.next;
      }
      return false;
    },
    reduce: (f, initialValue) => {
      let acc = initialValue;
      let temp = head;
      while (temp) {
        acc = f(acc, temp.value);
        temp = temp.next;
      }
      return acc;
    },
    isValid: () => {
      let temp = head;
      while (temp) {
        if (!isNode(temp)) {
          return false;
        }
        temp = temp.next;
      }
      return true;
    },
    sort: f => {
      while (!isSorted(head, f)) {
        let currNode = head;
        while (currNode.next) {
          let difference = f(currNode.value, currNode.next.value);
          if (difference > 0) {
            let temp = currNode.value;
            currNode.value = currNode.next.value;
            currNode.next.value = temp;
          }
          currNode = currNode.next;
        }
      }
    }
  };
}

module.exports = LinkedList;
