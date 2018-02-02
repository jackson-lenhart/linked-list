"use strict";

function Node(value) {
  return {
    value,
    next: null
  };
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
} else if (seed.toString() === "[object Object]") {
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
    }
  };
}

module.exports = LinkedList;
