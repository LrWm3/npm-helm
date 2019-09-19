const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function runCommand(cmd, args) {
  const argsIn = (args.join) ? args.join(' ') : args;
  const {
    stdout,
    stderr
  } = await exec(cmd + ' ' + argsIn);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}