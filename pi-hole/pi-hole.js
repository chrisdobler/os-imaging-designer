export default {
  mode: 'level2',
  machineType: 'ubuntu-16.04',
  builder: ({ vm_name, targetPlatform, machineTypeSpecific, options = {} }) => {
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
          script: `${process.cwd()}/pi-hole/pi-hole-setup.sh`,
          execute_command:
            "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
        },
      ],
    };

    // if restoring config
    if (options.restore)
      base.provisioners.unshift({
        type: 'file',
        source: `configuration/${vm_name}/etc/pihole`,
        destination: '/home/user',
      });

    return base;
  },
};
