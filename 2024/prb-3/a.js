import fs from "fs";
const input = fs.readFileSync("./input.txt", "utf-8");
const shortInput =
  "which()xmul(2,3)mul(2x,3)mult(2,3x)mul(2x,3x)mul(4,5)&mul(3,2)";

// {which()xmul(2, 3)mul(2x, 3)mult(2, 3x)mul(2x, 3x)mul(4, 5)&mul(3, 2)}
// write a regex which will return: mul(2, 3)mul(4, 5)mul(3, 2)

const regex = /mul\((\d+),(\d+)\)/g;
const instructions = input.match(regex);

let result = 0;

instructions.forEach((instruction) => {
  const [_, a, b] = instruction.match(/mul\((\d+),(\d+)\)/);
  result += parseInt(a) * parseInt(b);
});

console.log(result);
