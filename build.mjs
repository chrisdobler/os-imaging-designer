import fusion from './packer/builders/fusion-iso';
import { spawn } from 'child_process';
import fs from 'fs';
import prettier from 'prettier';

// packer build \
// -var 'pool=Automated Machines' \
// -var-file=configuration/packer-variables.json \
// -var 'folder=automated' \
// -var 'vm_name=unifi-network-pauline' \
// -var 'ipaddr=192.168.15.151/24' \
// packer-scripts/unifi-network/unifi-network.json

// (async () => {
//   if (somethingIsTrue) {
//     const { default: myDefault, foo, bar } = await import('/modules/my-module.js');
//   }
// })();

const packer = () => {
  const dir = 'tmp/';
  const configFile = 'config.json';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(
    `${dir}${configFile}`,
    prettier.format(
      JSON.stringify(
        fusion({
          vm_name: 'ubuntu-16.04-template',
        })
      ),
      { parser: 'json' }
    ),
    'utf8'
  );

  const child = spawn(
    'packer',
    [
      'build',
      `-var-file=../configuration/packer-variables.json`,
      // `-var 'folder=automated'`,
      // `-var 'vm_name=unifi-network-pauline'`,
      // `-var 'ipaddr=192.168.15.151/24'`,

      `${dir}${configFile}`,
      // `packer-scripts/unifi-network/unifi-network.json`,
    ],
    { encoding: 'utf8' }
  );

  child.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`${data}`);
  });
};

packer();
