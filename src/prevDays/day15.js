const findShortestPath = require('./shortestPath');
const findShortestPathWithLogs = require('./shortestPathWithLogs');
const start = new Date();
const inputfile = require("../inputfile");

const inspect = require('util');

const inputArray =   inputfile.readInputArray('../input/day15.txt'); /*
 [
    '1163751742',
    '1381373672',
    '2136511328',
    '3694931569',
    '7463417111',
    '1319128137',
    '1359912421',
    '3125421639',
    '1293138521',
    '2311944581',
]; //*/

function solve(input) {
    const inputArray = input;
    const mapSize = inputArray.length;

    const graph = {}
    const nums = inputArray.map(line => line.split('').map(Number));
    for (let x=0;x<mapSize;x++) {
        for (let y=0;y<mapSize;y++){
            let index = 'x'+x+'y'+y;
            let value = {}
            if (x < mapSize - 1) {value['x'+parseInt(x+1,10)+'y'+y] = nums[x+1][y]};
            if (y < mapSize - 1) {value['x'+x+'y'+parseInt(y+1,10)] = nums[x][y+1]};
            if (x > 0) {value['x'+parseInt(x-1,10)+'y'+y] = nums[x-1][y]};
            if (y > 0) {value['x'+x+'y'+parseInt(y-1,10)] = nums[x][y-1]};
            graph[index] = value;
        }
    }
    const endCoord = 'x'+parseInt(mapSize-1,10)+'y'+parseInt(mapSize-1,10);
    const shortestPath = findShortestPathWithLogs(graph, 'x0y0', endCoord);
    console.log(shortestPath);
}
//solve(inputArray);

function incDigit(a,b=1) {
    let res = a+b;
    if (res > 9) { res -= 9;}
    return res;
}
function incLine5(s) {
    let newS = s;
    let nums = s.split('').map(Number);
    newS += nums.map(d => incDigit(d)).join('');
    nums = nums.map(d => incDigit(d));
    newS += nums.map(d => incDigit(d)).join('');
    nums = nums.map(d => incDigit(d));
    newS += nums.map(d => incDigit(d)).join('');
    nums = nums.map(d => incDigit(d));
    newS += nums.map(d => incDigit(d)).join('');
    return newS;
}

function fiveRows(s) {
    let returnRows = [];
    for (let i=0;i<5;i++) {
        for (let j=0;j<s.length;j++) {
            nums = s[j].split('').map(Number);
            returnRows.push(nums.map(d => incDigit(d,i)).join(''));
        }
    }
    return returnRows;
}


let newInput = fiveRows(inputArray).map(line => incLine5(line));

console.log(newInput);
solve(newInput);

const end = new Date() - start;
console.log('Execution time: %dms', end)