import fusion from './packer/builders/fusion';
import { spawnSync as spawn } from 'child_process';
import fs from 'fs';

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

const packer = async () => {
  const dir = 'tmp/';
  const configFile = 'config.json';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  await fs.writeFile(`${dir}${configFile}`, 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  return spawn(
    'packer',
    [
      'build',
      `-var-file=configuration/packer-variables.json`,
      // `-var 'folder=automated'`,
      // `-var 'vm_name=unifi-network-pauline'`,
      // `-var 'ipaddr=192.168.15.151/24'`,

      `${dir}${configFile}`,
      // `packer-scripts/unifi-network/unifi-network.json`,
    ],
    { encoding: 'utf8' }
  );
};

console.log(packer().stdout.toString());
