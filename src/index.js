// Libs
require = require("esm")(module)
let fs = require("fs")
let path = require("path")
var log = require('loglevel');

// Dependencies
let getPlatform = require("./get-platform.js").default
let runCommand = require('./run-command')

async function main() {

  // Constants
  const binaryName = "helm";
  const binaryInputArgs = process.argv.slice(2);

  log.setDefaultLevel("debug")

  // Get platform, to select the appropriate binary to run
  let platform = getPlatform();
  log.debug("Platform found: " + JSON.stringify(platform))

  // Construct the full path to the file
  let binPath = path.resolve(__dirname, '../bin')
  let binaryDirName = platform.name + "-" + platform.arch;
  let binaryFilename = binaryName + platform.extension;
  let fullBinaryPath = path.join(binPath, binaryDirName, binaryFilename);

  // See if the file is there
  if (fs.existsSync(fullBinaryPath)) {
    console.debug(`Found binary ${fullBinaryPath}`)
    runCommand(fullBinaryPath, binaryInputArgs)
    // Now that we have the binary, we want to try running it
  } else {
    console.error(`Couldn't find expected binary ${fullBinaryPath}! Is your platform (${binaryDirName}) supported?`)
    console.error('  Supported Platforms:')
    console.error('  - windows-x86')
    console.error('  - mac-x86')
    console.error('  - linux-x86')

  }
}

main().then(console.log('done!'))