import { spawn } from 'child_process';
import fs from 'fs';
import prettier from 'prettier';
import stdio from 'stdio';

import unifiNetwork from './unifi-network/unifi-network';

// packer build \
// -var 'pool=Automated Machines' \
// -var-file=configuration/packer-variables.json \
// -var 'folder=automated' \
// -var 'vm_name=unifi-network-pauline' \
// -var 'ipaddr=192.168.15.151/24' \
// packer-scripts/unifi-network/unifi-network.json

(async () => {
  const ops = stdio.getopt({
    profile: {
      key: 'p',
      args: 1,
      description:
        'The location of the profile you would like to use for the hardware provider.',
    },
    name: {
      key: 'n',
      args: 1,
      description: 'Name of the machine to be created',
    },
    type: {
      key: 't',
      args: 1,
      description:
        'Type of machine to create from the list of supported builders',
    },
  });

  // import the deployment profile
  const profile = await import(
    `../configuration/profiles/${ops.profile.substring(
      ops.profile.indexOf('/') + 1,
      ops.profile.length
    )}`
  );

  const { default: platformModes } = await import(
    `./packer/platforms/${profile.platformType}.js`
  );

  // import the type of machine to create
  const { default: type } = await import(
    `./${ops.type}/${ops.type.substring(
      ops.type.indexOf('/') + 1,
      ops.type.length
    )}.js`
  );

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
          type.builder({
            vm_name: ops.name,
            platformSpecific: platformModes[type.mode],
          })
        ),
        { parser: 'json' }
      ),
      'utf8'
    );

    // fs.writeFileSync(
    //   `${dir}${configFile}`,
    //   prettier.format(
    //     JSON.stringify(
    //       unifiNetwork({
    //         vm_name: 'unifi-network',
    //       })
    //     ),
    //     { parser: 'json' }
    //   ),
    //   'utf8'
    // );

    // const child = spawn(
    //   'packer',
    //   [
    //     'build',
    //     `-var-file=../configuration/packer-variables.json`,
    //     `${dir}${configFile}`,
    //   ],
    //   { encoding: 'utf8' }
    // );

    // child.stdout.on('data', (data) => {
    //   console.log(`${data}`);
    // });

    // child.stderr.on('data', (data) => {
    //   console.error(`${data}`);
    // });
  };

  packer();
})();
