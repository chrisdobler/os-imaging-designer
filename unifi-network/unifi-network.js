import { ssh, fusionClone } from 'common';

module.exports = ({ vm_name }) => ({
  builders: [
    {
      vm_name,
      ...fusionClone({
        vm_name: 'ubuntu-16.04-template',
        path: '/Users/chris/Virtual Machines Mobile/',
      }),
      ...ssh,
    },
  ],
  provisioners: [
    {
      type: 'shell',
      script: 'packer-scripts/unifi-network/unifi-network-setup-network.sh',
      execute_command:
        "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
    },
    {
      type: 'shell',
      script: 'packer-scripts/unifi-network/unifi-network-setup.sh',
      execute_command:
        "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
    },
  ],
});
