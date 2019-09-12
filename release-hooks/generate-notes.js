const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
/*
  exit code: 	Any non 0 code is considered as an unexpected error and will stop
    the semantic-release execution with an error.

  stdout: 	Only the release note must be written to stdout.

  stderr: 	Can be used for logging.
*/
//This function is executed at the end of this file, after all the function declarations
async function main(argv, argc) {


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
