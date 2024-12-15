import fs from "fs";
const input = fs.readFileSync("./input.txt", "utf-8");
const shortInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

const [rules, updates] = shortInput.trim().split("\n\n");
// 75 needs to be before 29, 53, 47, 61, 13

const rulesMap = new Map();
for (const rule of rules.split("\n")) {
  const [from, to] = rule.split("|").map(Number);
  if (rulesMap.has(from)) {
    rulesMap.get(from).push(to);
  } else {
    rulesMap.set(from, [to]);
  }
}

// rulesMap = {
//   75 => [ 29, 53, 47, 61, 13 ],
//   47 => [ 53, 13, 61, 29 ],
//   97 => [ 13, 61, 47, 29, 53, 75 ],
//   61 => [ 13, 53, 29 ],
//   29 => [ 13 ],
//   53 => [ 29, 13 ]
// }

// update = 75,47,61,53,29
// 75,97,47,61,53

// 75 is before 47, 61, 53, 29
// 75 needs to be before 29, 53, 47, 61, 13

const updateList = updates
  .split("\n")
  .map((update) => update.split(","))
  .map((update) => update.map(Number));

const isValidOrder = (update) => {
  const position_map = new Map(update.map((value, index) => [value, index]));

  for (let i = 0; i < update.length; i++) {
    const from = update[i];
    const needsToBeBeforeSet = rulesMap.get(from);

    if (!needsToBeBeforeSet) continue;

    for (const to of needsToBeBeforeSet) {
      const toIndex = position_map.get(to);
      if (toIndex !== undefined && toIndex < i) {
        return false; // Invalid position detected
      }
    }
  }
  return true;
};

let sum = 0;

for (const update of updateList) {
  if (isValidOrder(update)) {
    sum += update[Math.floor(update.length / 2)];
  }
}

console.log(sum);
