const fs = require('node:fs');
const path = require('node:path');

const readStr = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
readStr.on('data', (chunk) => {
  console.log(chunk);
});
