const fs = require("fs");
const path = require("path");
let args = process.argv[2];

function getFileStats(data) {
  return {
    text: data.split(/\r?\n/).length,
    words: data.trim().split(/\s+/).length,
    char: data.length,
  };
}

try {
    
  if (args && !fs.existsSync(path.resolve(args)))
    console.error(`could not find path: ${args}`);
  else {
    let target = path.resolve(args)
    let data = fs.readFileSync(path.resolve(target), { encoding: "utf8" });
    let stats = getFileStats(data);
    console.log(`Lines: ${stats.text}`);
    console.log(`Words: ${stats.words}`);
    console.log(`Characters ${stats.char}`);
  }
} catch (err) {
  console.log("error: please provide a file path");
}
