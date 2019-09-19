const util = require('util');
const exec = util.promisify(require('child_process').exec);
const log = require("loglevel")

module.exports = async function runCommand(cmd, args) {
  const argsIn = (args.join) ? args.join(' ') : args;
  const {
    stdout,
    stderr
  } = await exec(cmd + ' ' + argsIn);
  log.info(stdout);
  if (stderr) {
    log.error(stderr)
  }
}