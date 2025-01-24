const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const os = require('node:os');
const { stdin, stdout } = require('node:process');

const file = path.join(__dirname, 'file.txt');
const writeStream = fs.createWriteStream(file);

const line = readline.createInterface({
  input: stdin,
  output: stdout,
});

line.on('SIGINT', () => {
  closeConsole();
});

stdout.write('Hello! Enter you input:\n');

line.on('line', (ans) => {
  if (ans !== 'exit') {
    writeStream.write(ans + os.EOL);
  } else {
    closeConsole();
  }
});

const closeConsole = () => {
  console.log('Bye!');
  line.close();
  writeStream.end();
};
