const fs = require("fs");
const path = require("path");

const getAllEntryPoints = function (dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllEntryPoints(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file === "index.ts") {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
};

export default getAllEntryPoints;
