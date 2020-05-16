export default {
  mode: 'level2',
  machineType: 'ubuntu-16.04',
  builder: ({ targetPlatform, machineTypeSpecific, options = {} }) => {
    const base = {
      builders: [
        {
          ...(() => (targetPlatform === 'vmware-workstation' ? {} : {}))(),
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
