process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  try {
    console.log('start');
    await execSync(`cp ${__dirname}/MinishRandomizer.exe.so /tmp`);
    console.log('copied');
    await execSync(`chmod 777 -R /tmp/*`);
    console.log('permissioned');
    const spoiler = await execSync(`bash -xec "/tmp/MinishRandomizer.exe.so ${__dirname}/tmcrom.gba"`);
    console.log('after execute');
    console.log(spoiler);
    const ls = await execSync(`ls -al /tmp`);
    console.log(ls);

    const response = {
      statusCode: 200,
      body: randodRom,
    };
    return response;
  } catch (e) {
    console.log("ERROR\n" + e)
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
