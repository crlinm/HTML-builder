const fsp = require('node:fs/promises');
const path = require('node:path');
const fs = require('node:fs');

const stylesFolder = path.join(__dirname, 'styles');
const bundleCss = path.join(__dirname, 'project-dist', 'bundle.css');
const writeStream = fs.createWriteStream(bundleCss);

(async () => {
  const styleFiles = await fsp.readdir(stylesFolder);
  console.log(styleFiles);
  for (const style of styleFiles) {
    const ext = path.extname(style);
    if (ext === '.css') {
      console.log(style, ext, path.join(stylesFolder, style));
      const readStream = fs.createReadStream(
        path.join(stylesFolder, style),
        'utf8',
      );
      readStream.pipe(writeStream, { end: false });
      await new Promise((resolve) => readStream.on('close', resolve));
    }
  }
})();
