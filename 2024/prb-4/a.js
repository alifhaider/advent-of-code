import fs from "fs";
const input = fs.readFileSync("./input.txt", "utf-8");
const shortInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const lines = input.split("\n");

let count = 0;

const isWithinBounds = (i, j, di, dj) => {
  return (
    i + 3 * di >= 0 &&
    i + 3 * di < lines.length &&
    j + 3 * dj >= 0 &&
    j + 3 * dj < lines[i].length
  );
};

const checkPattern = (i, j, di, dj) => {
  for (let k = 0; k < 4; k++) {
    if (lines[i + k * di][j + k * dj] !== "XMAS"[k]) {
      return false;
    }
  }
  return true;
};

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    // Check all directions
    const directions = [
      [0, 1], // Horizontal
      [0, -1], // Backward Horizontal
      [1, 0], // Vertical
      [-1, 0], // Backward Vertical
      [1, 1], // Diagonal Right
      [1, -1], // Diagonal Left
      [-1, 1], // Backward Diagonal Right
      [-1, -1], // Backward Diagonal Left
    ];

    for (const [di, dj] of directions) {
      if (isWithinBounds(i, j, di, dj) && checkPattern(i, j, di, dj)) {
        count++;
        console.log(
          `Pattern found at (${i}, ${j}) in direction (${di}, ${dj}), count: ${count}`
        );
      }
    }
  }
}

console.log("Total patterns found:", count);

// ....XXMAS. 2 diagonalRight 1  horizontal 1
// .SAMXMS... 1 backwardHorizontal 1
// ...S..A... 0
// ..A.A.MS.X 2 Vertical 1 diagonalLeft 1
// XMASAMX.MM 3 horizontal 1 backwardHorizontal 1 backwardVertical 1
// X.....XA.A 2 backwardDiagonalLeft 1 backwardDiagonalRight 1
// S.S.S.S.SS
// .A.A.A.A.A
// ..M.M.M.MM
// .X.X.XMASX 8 horizontal 1 vertical 1 backwardDiagonalRight 3 backwardDiagonalLeft 3
