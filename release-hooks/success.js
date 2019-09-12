const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/*
  exit code: 	Any non 0 code is considered as an unexpected error and will stop
    the semantic-release execution with an error.

  stdout: 	Can be used for logging.

  stderr: 	Can be used for logging.
*/

//This function is executed at the end of this file, after all the function declarations
async function main(argv, argc) {
  if(argc < 2 || !argv[1]) throw Error('Missing the version arg!');
  let version = argv[1];

  await exec(`
    git checkout testing &&
    git pull &&
    git merge develop &&
    git push &&
    git checkout develop
    `, { windowsHide: true });
}


//Grab args
var argv = process.argv.slice(1);
var argc = argv.length;

//Run main
main(argv, argc).catch(err => {
  console.log('\n');
  console.error(err);
}).finally(() => {
  //Clean up here if needed
});
