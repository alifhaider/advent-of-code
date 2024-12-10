import fs from "fs";
const input = fs.readFileSync("./input.txt", "utf-8");
const shortInput =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64)(mul(11,8)undo()?mul(8,5))";

//skip in between texts between two strings

const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;

const instructions = input.match(regex);

let result = 0;
let skip = false;

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i];

  // If inside a 'don't' and 'do' block, skip mul() instructions
  if (skip) {
    if (instruction === "do()") {
      skip = false; // End skipping at 'do()'
    }
    continue;
  }

  // If we encounter 'don't()', start skipping mul() instructions until 'do()' is found
  if (instruction === "don't()") {
    skip = true;
    continue;
  }

  // Process valid mul() instructions
  if (instruction.startsWith("mul")) {
    const [_, a, b] = instruction.match(/mul\((\d+),(\d+)\)/);
    result += parseInt(a) * parseInt(b);
  }
}
console.log(result);

// write a regex which will return: mul(2,4)mul(8,5)

// should skip mul(5,5)mul(32,64)mul(11,8)
// should return mul(2,4)mul(8,5)
// this regex /mul\((\d+),(\d+)\)/g; returns all the mul instructions
// we need to skip the ones that starts with don't and ends with undo
// we can use negative look ahead and look behind to skip the instructions
