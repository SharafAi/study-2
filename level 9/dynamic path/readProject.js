const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const projectRoot = __dirname;

function readFolder(folderPath) {
  const items = fs.readdirSync(folderPath);
  const result = {};

  items.forEach(item => {
    const fullPath = path.join(folderPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      result[item] = readFolder(fullPath);
    } else {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const compressed = zlib.deflateSync(content).toString('base64');
      result[item] = compressed;
    }
  });

  return result;
}

const projectData = readFolder(projectRoot);

console.log(JSON.stringify(projectData));