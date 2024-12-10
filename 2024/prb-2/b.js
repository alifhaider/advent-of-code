import fs from "fs";
const input = fs.readFileSync("./input.txt", "utf-8");

const rows = input.split("\n");
const reports = rows.map((row) => row.split(" "));

// 1 ,2 , 3, 4, 5

function isSafe(report) {
  if (report.length < 2) return true;
  const firstDiff = report[1] - report[0];

  if (firstDiff === 0 || Math.abs(firstDiff) > 3) return false;
  const expectedSign = firstDiff / Math.abs(firstDiff);
  for (let i = 1; i < report.length - 1; i++) {
    let diff = report[i + 1] - report[i];

    if (diff === 0 || Math.abs(diff) > 3) return false;
    const sgn = diff / Math.abs(diff);
    if (sgn !== expectedSign) {
      return false;
    }
  }
  return true;
}

let count = 0;
for (let report of reports) {
  if (isSafe(report)) {
    count++;
  } else {
    let reportCpy = report;
    for (let i = 0; i < reportCpy.length; i++) {
      const removedOne = reportCpy.filter((_, idx) => i !== idx);
      if (isSafe(removedOne)) {
        count++;
        break;
      }
    }
  }
}

console.log(count);
