//run command=>/ node readProject.js

// readProject.js
const fs = require('fs');
const path = require('path');

const projectRoot = __dirname; // or your specific project path

function readFolder(folderPath) {
  const items = fs.readdirSync(folderPath);
  items.forEach(item => {
    const fullPath = path.join(folderPath, item);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      readFolder(fullPath); // recursion for subfolders
    } else {
      const content = fs.readFileSync(fullPath, 'utf-8');
      console.log('==== File:', fullPath, '====\n');
      console.log(content, '\n');
    }
  });
}

readFolder(projectRoot);