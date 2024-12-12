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

const lines = input.trim().split("\n");

let count = 0;

function isValid(i, j) {
  return i > 0 && i < lines.length - 1 && j > 0 && j < lines[i].length - 1;
}

// M.S | S.S | S.M | M.M |
// .A. | .A. | .A. | .A. |
// M.S | M.M | S.M | S.S |
for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    // check corner to have MSMS, SSMM, SMSM, MMSS
    if (lines[i][j] === "A" && isValid(i, j) && followingPattern(i, j)) {
      count++;
      console.log(`Pattern found at (${i}, ${j}), count: ${count}`);
    }
  }
}

// i-1, j-1 | i-1, j+1 | i+1, j-1 | i+1, j+1
// need to follow one of the following patterns:
//MSMS, SSMM, SMSM, MMSS
function followingPattern(i, j) {
  const cornerTexts =
    lines[i - 1][j - 1] +
    lines[i - 1][j + 1] +
    lines[i + 1][j - 1] +
    lines[i + 1][j + 1];
  return (
    cornerTexts === "MSMS" ||
    cornerTexts === "SSMM" ||
    cornerTexts === "SMSM" ||
    cornerTexts === "MMSS"
  );
}

console.log(count);

// .M.S...... // 1
// ..A..MSMS. // 1
// .M.S.MAA.. // 1
// ..A.ASMSM. // 1
// .M.S.M.... // 1
// ..........
// S.S.S.S.S.
// .A.A.A.A..
// M.M.M.M.M. // 4
