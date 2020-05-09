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
        ...machineTypeSpecific,
        {
          type: 'shell',
          script: `${process.cwd()}/minecraft/minecraft-setup.sh`,
          execute_command:
            "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
        },
      ],
    };

    return base;
  },
};
