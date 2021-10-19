const fs = require("fs");
const path = require("path");
const spawnSync = require("child_process").spawnSync;
const { exec } = require('child_process');

const GLOBAL_NODE_DIR = path.resolve(__dirname, "../../../node_modules");
const NODE_DIR = path.resolve(__dirname, "../node_modules");
const INPUT_DIR = path.resolve(__dirname, "../contracts");
const CONFIG_DIR = path.resolve(__dirname, "../docgen");
const OUTPUT_DIR = path.resolve(__dirname, "../docgen/docs");
const OUTPUT_IMAGES_DIR = path.resolve(__dirname, "../docgen/docs/images");
const SUMMARY_FILE = path.resolve(__dirname, "../docgen/SUMMARY.md")
const EXCLUDE_FILE = path.resolve(__dirname, "../docgen/exclude.txt");
const GITBOOK_FILE = path.resolve(__dirname, "../docgen/.gitbook.yaml")

const excludeList = lines(EXCLUDE_FILE).map((line) => INPUT_DIR + "/" + line);
const relativePath = path.relative(path.dirname(SUMMARY_FILE), OUTPUT_DIR);

let excludeListPathName = [];
let postCheckPathNameList = [];
let sourcePathNameList = [];

function lines(pathName) {
  return fs
    .readFileSync(pathName, { encoding: "utf8" })
    .split("\r")
    .join("")
    .split("\n");
}

function scan(pathName, indentation) {
  if (!excludeList.includes(pathName)) {
    if (fs.lstatSync(pathName).isDirectory()) {
      fs.appendFileSync(
        SUMMARY_FILE,
        indentation + "* " + path.basename(pathName) + "\n"
      );
      for (const fileName of fs.readdirSync(pathName))
        scan(pathName + "/" + fileName, indentation + "  ");
    } else if (pathName.endsWith(".sol")) {
      const text = path.basename(pathName).slice(0, -4);
      const link = pathName.slice(INPUT_DIR.length, -4);
      fs.appendFileSync(
        SUMMARY_FILE,
        indentation + "* [" + text + "](" + relativePath + link + ".md)\n"
      );
      postCheckPathNameList.push(
        CONFIG_DIR + "/" + relativePath + link + ".md"
      );
      sourcePathNameList.push(pathName);
    }
  } else {
    excludeListPathName.push(pathName);
  }
}

function fix(pathName) {
  if (fs.lstatSync(pathName).isDirectory()) {
    for (const fileName of fs.readdirSync(pathName))
      fix(pathName + "/" + fileName);
  } else if (pathName.endsWith(".md")) {
    fs.writeFileSync(
      pathName,
      lines(pathName)
        .filter((line) => line.trim().length > 0)
        .join("\n") + "\n"
    );
  }
}

function checkDir(pathName){
  if (!fs.existsSync(pathName)) {
	fs.mkdirSync(pathName, {
		recursive: true
	});
  }
}
checkDir(OUTPUT_IMAGES_DIR);

fs.writeFileSync(SUMMARY_FILE, "# Summary\n");
fs.writeFileSync(GITBOOK_FILE, "root: ./\n");
fs.appendFileSync(GITBOOK_FILE, "structure:\n");
fs.appendFileSync(GITBOOK_FILE, "  readme: README.md\n");
fs.appendFileSync(GITBOOK_FILE, "  summary: SUMMARY.md\n");

scan(INPUT_DIR, "");

const args = [
  GLOBAL_NODE_DIR + "/@anthonymartin/solidity-docgen/dist/cli.js",
  "--input=" + INPUT_DIR,
  "--output=" + OUTPUT_DIR,
  "--helpers=" + GLOBAL_NODE_DIR + "/@anthonymartin/solidity-docgen/dist/handlebars",
  "--templates=" + CONFIG_DIR,
  "--exclude=" + excludeListPathName.toString(),
  "--solc-module=" + NODE_DIR + "/solc",
  "--solc-settings=" +
  JSON.stringify({ optimizer: { enabled: true, runs: 200 } }),
  "--output-structure=" + "contracts",
];

const result = spawnSync("node", args, {
  stdio: ["inherit", "inherit", "pipe"],
});
if (result.stderr.length > 0) throw new Error(result.stderr);

fix(OUTPUT_DIR);

function generateGraphs(sourcePathNameList) {
  for (const sourcePathName of sourcePathNameList) {
    const contractName = path.basename(sourcePathName).slice(0, -3);
    const inputContractPathName = sourcePathName;
    const outputGraphPathName = OUTPUT_IMAGES_DIR + `/${contractName}_dependency_graph.png`;
    const outputInheritancePathName = OUTPUT_IMAGES_DIR + `/${contractName}_inheritance_graph.png`;
    const suryaPath = GLOBAL_NODE_DIR + "/surya/bin/surya";
    const dotPath = "/usr/bin/dot"

    exec(`${dotPath} -V`, (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(`exec error: ${err}`);
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    exec(`${suryaPath} graph ${inputContractPathName} | ${dotPath} -Tpng > ${outputGraphPathName}`, (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(`exec error: ${err}`);
      }
    });
    exec(`${suryaPath} inheritance ${inputContractPathName} | ${dotPath} -Tpng > ${outputInheritancePathName}`, (err, stdout, stderr) => {
      if (err) {
        //some err occurred
        console.error(`exec error: ${err}`);
      }
    });
  }
}

generateGraphs(sourcePathNameList);

function insertLinebreak(docPathNameList) {
  const re = /^\[\[linebreak\]\]/gm;
  for (const docPathName of docPathNameList) {
    let fileContent = fs.readFileSync(docPathName, "utf8");
    let insertedFileContent = fileContent.replace(re, "");
    fs.writeFileSync(docPathName, insertedFileContent, "utf8");
  }
}

insertLinebreak(postCheckPathNameList);

