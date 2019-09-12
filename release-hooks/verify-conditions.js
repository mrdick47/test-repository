const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/*
  exit code: 	0 if the verification is successful, or any other exit code otherwise.

  stdout: 	Write only the reason for the verification to fail.

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
