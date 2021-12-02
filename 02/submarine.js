'use strict';
var Submarine = /** @class */ (function () {
    function Submarine(horizontal, depth) {
        this.horizontal = horizontal;
        this.depth = depth;
    }
    Submarine.prototype.forward = function (steps) {
        this.horizontal += steps;
    };
    Submarine.prototype.up = function (steps) {
        this.depth -= steps;
    };
    Submarine.prototype.down = function (steps) {
        this.depth += steps;
    };
    Submarine.prototype.position = function () {
        return this.horizontal * this.depth;
    };
    return Submarine;
}());
function moveSub(line) {
    var _a = line.split(' '), command = _a[0], value = _a[1];
    switch (command) {
        case 'forward': {
            subM.forward(parseInt(value));
            break;
        }
        case 'up': {
            subM.up(parseInt(value));
            break;
        }
        case 'down': {
            subM.down(parseInt(value));
            break;
        }
    }
}
var subM = new Submarine(0, 0);
require('fs').readFileSync('/Users/eszpee/projects/adventofcode2021/02/input.txt', 'utf-8').split(/\r?\n/).forEach(moveSub);
console.log(subM.position());
