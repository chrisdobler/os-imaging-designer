import { ssh, fusionClone } from '../packer/builders/common';

export default {
  mode: 'level2',
  machineType: 'ubuntu-16.04',
  builder: ({
    vm_name,
    targetPlatform,
    platformSpecific,
    machineTypeSpecific,
    options = {},
  }) => {
    const base = {
      builders: [
        {
          ...platformSpecific,
          vm_name,
          ...(() => (targetPlatform === 'vmware-workstation' ? {} : {}))(),
          ...ssh,
        },
      ],
      provisioners: [
        machineTypeSpecific,
        {
          type: 'shell',
          script: `${process.cwd()}/pi-hole/pi-hole-network-setup.sh`,
          execute_command:
            "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
        },
        {
          type: 'shell',
          script: `${process.cwd()}/pi-hole/pi-hole-setup.sh`,
          execute_command:
            "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
        },
      ],
    };

    // if restoring config
    // options.restore
    // ? {
    //     type: 'file',
    //     source: `configuration/${vm_name}/etc/pihole`,
    //     destination: '/home/user',
    //   }

    return base;
  },
};
