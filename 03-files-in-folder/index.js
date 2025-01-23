const path = require('node:path');
const fsp = require('node:fs/promises');

const dir = path.join(__dirname, 'secret-folder');

(async () => {
  const files = await fsp.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile()) {
      const fileStat = await fsp.stat(path.join(dir, file.name));
      const ext = path.extname(file.name).slice(1);
      console.log(
        [
          file.name.slice(0, file.name.length - ext.length - 1),
          ext,
          (fileStat.size / 1024).toFixed(3) + 'kb',
        ].join(' - '),
      );
    }
  }
})();
