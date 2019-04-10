#!/usr/bin/env node
require('dotenv').config();

let vars = process.argv.slice(2);
let gateway = vars[0];

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require('chalk');

const path = require('path');

let gatewayCmdFilePath = path.resolve("src/bin/gateways", gateway);

async function initGateway() {
    return await exec(`node ${gatewayCmdFilePath}.js`);
}

initGateway().then(({ stdout, stderr }) => {
    console.log(chalk.bgGreen.black(stdout));
    console.log(chalk.bgRed.yellow(stderr));
});




