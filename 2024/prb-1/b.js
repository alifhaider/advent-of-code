import fs from "fs";

// Read and process the input
const input = fs.readFileSync("./input.txt", "utf-8");
const pairJoined = input.trim().replaceAll("\n", ",").split(",");
const pair = pairJoined.map((el) => el.split("   "));

// Separate left and right arrays
const left = pair.map((el) => el[0]);
const right = pair.map((el) => el[1]);

// Use a map to count occurrences in the right array
const rightCountMap = {};
for (const r of right) {
  rightCountMap[r] = (rightCountMap[r] || 0) + 1;
}

// Calculate the sum
let sum = 0;
for (const l of left) {
  if (rightCountMap[l]) {
    sum += l * rightCountMap[l];
  }
}

console.log(sum);
