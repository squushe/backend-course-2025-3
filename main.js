const { program } = require("commander");
const fs = require("fs");
program
  .option("-i,--input <path>")
  .option("-o, --output <path>")
  .option("-d,--display")
  .option("-s,--survived")
  .option("-a,--age");

program.parse();

const options = program.opts();

if (!options.input) {
  console.error("Please, specify input file");
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error("Cannot find input file");
  process.exit(1);
}

if (!options.output && !options.display) {
  process.exit(0);
}

const fileContent = fs.readFileSync(options.input, "utf-8");
const data = JSON.parse(fileContent);
let workData = data;

if (options.survived) {
  workData = workData.filter((passanger) => passanger.Survived == "1");
}

const formattedLines = workData.map((passenger) => {
  const parts = [passenger.Name];

  if (options.age) {
    parts.push(passenger.Age);
  }

  parts.push(passenger.Ticket);

  return parts.join(" ");
});
const result = formattedLines.join("\n");

if (options.output) {
  console.log("Результат записано у файл", options.output);
  fs.writeFileSync(options.output, result);
}

if (options.display) {
  console.log("Результат в консоль");
  console.log(result);
}
