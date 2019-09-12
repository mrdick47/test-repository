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
  let projectPath = path.resolve(path.join(__dirname, '..'));
  let folders = fs.readdirSync(projectPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for(const dir of folders) {
    let dirPath = path.join(projectPath, dir);
    let files = fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => !dirent.isDirectory())
      .map(dirent => dirent.name);

    for(const file of files) {
      if(file === 'package.json') {
        await exec(`npm version ${version} --no-git-tag-version --allow-same-version`, { cwd: dirPath, windowsHide: true });
        await exec(`git add ${path.join(dirPath, 'package.json')} ${path.join(dirPath, 'package-lock.json')}`, { windowsHide: true });
      }
    }
  }

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
