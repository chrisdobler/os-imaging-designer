import { spawn } from 'child_process';
import fs from 'fs';
import prettier from 'prettier';
import stdio from 'stdio';
import { communicators } from './packer/builders/common';

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
    location: {
      key: 'l',
      description:
        'The datacenter location. Used for classing machines into logical groups.',
    },
    restore: {
      key: 'r',
      required: false,
      description:
        'if you would like to restore backup data from an existing machine',
    },
    force: {
      key: 'f',
      required: false,
      description: 'Force an overwrite of an existing machine.',
    },
  });

  const dir = 'tmp/';
  const configFile = 'config.json';
  const vm_name = ops.name;

  // import the deployment profile
  const profile = await import(
    `../configuration/profiles/${ops.profile.substring(
      ops.profile.indexOf('/') + 1,
      ops.profile.length
    )}`
  );

  const location = ops.location || profile.location || null;
  let machineTypeSpecific = null;

  const { default: platformModes } = await import(
    `./packer/platforms/${profile.platformType}.js`
  );

  // import the type of machine to create
  const declaredType = ops.type.substring(
    ops.type.lastIndexOf('/') + 1,
    ops.type.length
  );

  const { default: type } = await import(`./${ops.type}/${declaredType}.js`);

  console.log(type, declaredType);

  const machineTypeSettingsPossibilitiesOrdered = [
    declaredType,
    ...(type.machineType ? [type.machineType] : []),
    ...(type.machineType
      ? [
          type.machineType.slice(
            type.machineType.indexOf('-') + 1,
            type.machineType.length
          ),
        ]
      : []),
  ];

  for (let i = 0; i < machineTypeSettingsPossibilitiesOrdered.length; i++) {
    try {
      const machineType = machineTypeSettingsPossibilitiesOrdered[i];
      machineTypeSpecific = await import(
        `./packer/machineTypes/${machineType}.js`
      );
      machineTypeSpecific = machineTypeSpecific.default;
    } catch (e) {
      ops.verbose &&
        console.error(
          'Error importing machine type settings for ',
          machineTypeSettingsPossibilitiesOrdered[i]
        );
      ops.verbose && console.error(e);
    }
  }

  // import the machine custom settings
  let machineSettings = { network: {} };
  try {
    machineSettings = await import(
      `../configuration/${location && `${location}/`}${vm_name}/settings.json`
    );
  } catch (e) {}

  const packer = () => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    let output = type.builder
      ? type.builder({
          vm_name,
          platformSpecific: {},
        })
      : {
          builders: [{}],
          provisioners: [],
        };

    const machineTypeSpecificConfig = machineTypeSpecific({
      vm_name,
      location,
      ...(machineSettings.network && machineSettings.network.address
        ? {
            ...profile['default-static-network'],
            ...machineSettings.network,
          }
        : {}),
    });

    output.builders = [
      {
        ...(output && output.builders[0]),
        ...platformModes({ ...profile.variables, vm_name })[type.mode],
        ...(type.overrides || {}),
        ...profile.options,
        ...(profile.media && profile.media[ops.type.replace(`level0/`, '')]
          ? profile.media[ops.type.replace(`level0/`, '')]
          : {}),
        vm_name,
        ...communicators[machineTypeSpecificConfig.communicator],
        ...(machineSettings.buildOverrides
          ? machineSettings.buildOverrides
          : {}),
      },
    ];

    const setupScriptPath = `${process.cwd()}/${ops.type}/${ops.type.substring(
      ops.type.lastIndexOf('/') + 1,
      ops.type.length
    )}-setup.sh`;

    if (fs.existsSync(setupScriptPath)) {
      console.log('adding shell setup script');
      output.provisioners.push({
        type: 'shell',
        script: setupScriptPath,
        environment_vars: [`RESTORE=${ops.restore}`],
        execute_command:
          "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
      });
    } else console.log('skipping shell setup script');

    // if restoring config
    if (ops.restore)
      output.provisioners.unshift({
        type: 'file',
        source: `../configuration/${
          location && `${location}/`
        }${vm_name}/backup/`,
        destination: '/home/user',
      });
    else if (type.supportsInitialBuild) {
      output.provisioners.push({
        type: 'shell',
        script: `${process.cwd()}/${ops.type}/${ops.type.replace(
          'level0/',
          ''
        )}-init.sh`,
        execute_command:
          "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
      });
    }

    if (type.supportFiles)
      output.provisioners.unshift({
        type: 'file',
        source: `${process.cwd()}/${ops.type}/files/`,
        destination: '/home/user',
      });

    if (type.mode !== 'level0')
      output.provisioners.unshift(...machineTypeSpecificConfig.provisioners);

    fs.writeFileSync(
      `${dir}${configFile}`,
      prettier.format(JSON.stringify(output), { parser: 'json' }),
      'utf8'
    );

    const args = ['build'];
    if (ops.force) args.push(`-force`);
    args.push(
      ...[
        `-var-file=../configuration/packer-variables.json`,
        `${dir}${configFile}`,
      ]
    );
    const child = spawn('packer', args, { encoding: 'utf8' });

    child.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

    child.stderr.on('data', (data) => {
      console.error(`${data}`);
    });
  };

  packer();
})();
