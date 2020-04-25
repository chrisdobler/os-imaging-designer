import { ssh, fusionClone } from '../packer/builders/common';

export default {
  mode: 'level2',
  builder: ({ vm_name, targetPlatform, platformSpecific }) => ({
    builders: [
      {
        ...platformSpecific,
        vm_name,
        ...(() => (targetPlatform === 'vmware-workstation' ? {} : {}))(),
        ...ssh,
      },
    ],
    provisioners: [
      {
        type: 'shell',
        script: `${process.cwd()}/unifi-network/unifi-network-setup-network.sh`,
        execute_command:
          "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
      },
      {
        type: 'shell',
        script: `${process.cwd()}/unifi-network/unifi-network-setup.sh`,
        execute_command:
          "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
      },
    ],
  }),
};
