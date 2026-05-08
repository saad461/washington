
import { washingtonCounties } from '../data/washingtonCounties';

const suffix = " Child Support 2026 | WSCSS";
const maxLength = 60;

console.log(`Checking ${washingtonCounties.length} counties...`);

const exceeding = [];

for (const county of washingtonCounties) {
  const title = `${county.name}${suffix}`;
  if (title.length > maxLength) {
    exceeding.push({ name: county.name, length: title.length });
  }
}

if (exceeding.length === 0) {
  console.log("SUCCESS: All county titles are within 60 characters.");
} else {
  console.log("FAILURE: Some titles exceed 60 characters:");
  console.table(exceeding);
}

const longestCounties = [
  "Grays Harbor County",
  "Walla Walla County",
  "Pend Oreille County",
  "Skamania County",
  "Klickitat County"
];

console.log("\nLongest counties check:");
for (const name of longestCounties) {
  const title = `${name}${suffix}`;
  console.log(`${name}: ${title.length} chars`);
}
