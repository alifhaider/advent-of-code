import fs from "fs";
const input = fs.readFileSync("./input.txt", "utf-8");
const pairJoined = input.trim().replaceAll("\n", ",").split(","); // ['1   2', '3   4']
const pair = pairJoined.map((el) => el.split("   ")); // [['1', '2'], ['3', '4']]

const left = pair.map((el) => el[0]);
const right = pair.map((el) => el[1]);
const sortedLeft = left.sort((a, b) => a - b);
const sortedRight = right.sort((a, b) => a - b);

// console.log(sortedLeft, sortedRight);
let totalDistance = 0;

for (let i = 0; i < sortedLeft.length; i++) {
  totalDistance += Math.abs(sortedLeft[i] - sortedRight[i]);
}

console.log(totalDistance);
