const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');

const file = path.join(__dirname, 'file.txt');
const writeStream = fs.createWriteStream(file);

const line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

line.on('SIGINT', () => {
  console.log('Bye!');
  line.close();
});

(async () => {
  for (;;) {
    const ans = await line.question('Hello! Enter you input: ');
    if (ans === 'exit') {
      console.log('Bye!');
      break;
    }
    writeStream.write(ans);
  }
  line.close();
  writeStream.end();
})();
