const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

(async () => {
  const distFolder = path.join(__dirname, 'project-dist');
  await fsp.mkdir(distFolder, { recursive: true });
  const bundleCss = path.join(distFolder, 'style.css');
  const stylesFolder = path.join(__dirname, 'styles');
  await mergeStyle(stylesFolder, bundleCss);

  const assetsFolder = path.join(__dirname, 'assets');
  const distAssetsFolder = path.join(distFolder, 'assets');
  await copyDir(assetsFolder, distAssetsFolder);

  const componentsFolder = path.join(__dirname, 'components');
  const indexHTML = await createHTML(componentsFolder);
  await fsp.writeFile(path.join(distFolder, 'index.html'), indexHTML);
})();

const createHTML = async (componentsFolder) => {
  let template = await fsp.readFile(
    path.join(__dirname, 'template.html'),
    'utf8',
  );
  const components = await fsp.readdir(componentsFolder);
  for (const component of components) {
    const componentData = await fsp.readFile(
      path.join(componentsFolder, component),
      'utf8',
    );
    template = template.replace(`{{${component.slice(0, -5)}}}`, componentData);
  }
  return template;
};

const mergeStyle = async (stylesFolder, bundleCss) => {
  const writeStream = fs.createWriteStream(bundleCss);
  const styleFiles = await fsp.readdir(stylesFolder);
  for (const style of styleFiles) {
    const ext = path.extname(style);
    if (ext === '.css') {
      const readStream = fs.createReadStream(
        path.join(stylesFolder, style),
        'utf8',
      );
      readStream.pipe(writeStream, { end: false });
      await new Promise((resolve) => readStream.on('close', resolve));
    }
  }
};

async function copyDir(initialFolder, copyFolder) {
  await fsp.rm(copyFolder, { recursive: true, force: true });
  await fsp.mkdir(copyFolder, { recursive: true });
  const files = await fsp.readdir(initialFolder, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      await fsp.copyFile(
        path.join(initialFolder, file.name),
        path.join(copyFolder, file.name),
      );
    } else {
      await copyDir(
        path.join(initialFolder, file.name),
        path.join(copyFolder, file.name),
      );
    }
  }
}
