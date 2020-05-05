export default ({ vm_name }) => [
  {
    type: 'file',
    source: `../configuration/${vm_name}/interfaces`,
    destination: '/home/user/',
  },
  {
    type: 'shell',
    script: `${process.cwd()}/packer/machineTypes/ubuntu-16.04-network-setup.sh`,
    execute_command:
      "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
  },
];
