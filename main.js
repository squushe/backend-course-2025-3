const { program } = require("commander");
const fs = require("fs");
program
  .option("-i,--input <path>")
  .option("-o, --output <path>")
  .option("-d,--display");

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

let result = `Обробка файлу ${options.input}`;

if (options.output) {
  console.log("Результат записано у файл", options.output);
}

if (options.display) {
  console.log("Результат в консоль");
  console.log(result);
}
