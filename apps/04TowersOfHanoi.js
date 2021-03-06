'use strict';

var assert = require('assert');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}
//Popping and pushing the startstack and endstack so the pieces will move.
function movePiece(startStack, endStack) {
  // Your code here
  var begin = stacks[startStack].pop();
  stacks[endStack].push(begin);

}

//Making sure the moves are legal moves.
function isLegal(startStack, endStack) {
  var start = stacks[startStack].slice(-1)
  var end = stacks[endStack].slice(-1)
  if (stacks[endStack].length === 0) {
    return true
  }
  return start < end
}
//Checking to see if it's a valid move and seeing if there is a win.
function checkForWin() {
  console.log("You Win!");
  return stacks.b.length === 4 || stacks.c.length === 4
}
//If not a valid move it says that's not a valid move.
function towersOfHanoi(startStack, endStack) {
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack)
    getPrompt();
  } else {
    console.log("That's not a valid move")
    getPrompt();
  }
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      checkForWin();
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', function() {
    it('should be able to move a block', function() {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, {
        a: [4, 3, 2],
        b: [1],
        c: []
      });
    });
  });

  describe('#isLegal()', function() {
    it('should not allow an illegal move', function() {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', function() {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', function() {
    it('should detect a win', function() {
      stacks = {
        a: [],
        b: [4, 3, 2, 1],
        c: []
      };
      assert.equal(checkForWin(), true);
      stacks = {
        a: [1],
        b: [4, 3, 2],
        c: []
      };
      assert.equal(checkForWin(), false);
    });
  });
} else {

  getPrompt();

}
