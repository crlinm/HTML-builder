const fsp = require('node:fs/promises');
const path = require('node:path');

const initialFolder = path.join(__dirname, 'files');

async function copyDir() {
  const copyFolder = path.join(__dirname, 'files-copy');
  await fsp.rm(copyFolder, { recursive: true, force: true });
  await fsp.mkdir(copyFolder, { recursive: true });
  const files = await fsp.readdir(initialFolder);
  console.log(files);
  for (const file of files) {
    await fsp.copyFile(
      path.join(initialFolder, file),
      path.join(copyFolder, file),
    );
  }
}

copyDir();
