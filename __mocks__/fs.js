
const fs = jest.genMockFromModule('fs');

function writeFileSync(filePath, fileContent) {
  console.log('Mock fs is writing a file');
  if (filePath == null || fileContent == null) {
    throw new Error('Unvalid parameters');
  }
}

fs.writeFileSync = writeFileSync;

module.exports = fs;
