const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// __filename is the full path to the currently running file
const currentFile = __filename;

try {
  // Read file content
  const content = fs.readFileSync(currentFile, 'utf-8');

  // Compress content to base64
  const compressed = zlib.deflateSync(content).toString('base64');

  // Output JSON with filename as key
  const output = {};
  output[path.basename(currentFile)] = compressed;

  console.log(JSON.stringify(output, null, 2));
} catch (err) {
  console.error(`Failed to read current file: ${currentFile}`, err);
}