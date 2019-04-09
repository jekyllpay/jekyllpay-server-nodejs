#!/usr/bin/env node
let vars = process.argv.slice(2);
let gateway = vars[0];

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const path = require('path');
let gatewayCmdFilePath = path.resolve("src/bin", gateway);

async function initGateway() {
    const { stdout, stderr } = await exec(`node ${gatewayCmdFilePath}.js`);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
}

initGateway();