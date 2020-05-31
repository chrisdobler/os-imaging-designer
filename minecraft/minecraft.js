export default {
  mode: 'level2',
  machineType: 'ubuntu-16.04',
  builder: ({ targetPlatform }) => ({
    builders: [
      {
        ...(() => (targetPlatform === 'vmware-workstation' ? {} : {}))(),
      },
    ],
    provisioners: [
      {
        type: 'shell',
        script: `${process.cwd()}/minecraft/minecraft-setup.sh`,
        execute_command:
          "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
      },
    ],
  }),
};
