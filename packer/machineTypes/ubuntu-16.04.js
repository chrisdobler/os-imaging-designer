export default ({
  location,
  vm_name,
  address,
  netmask,
  gateway,
  dns_nameservers,
}) => [
  // {
  //   type: 'file',
  //   source: `../configuration/${
  //     location && `${location}/`
  //   }${vm_name}/interfaces`,
  //   destination: '/home/user/',
  // },
  {
    type: 'shell',
    environment_vars: [
      `HOSTNAME=${vm_name}`,
      `ADDRESS=${address}`,
      `NETMASK=${netmask}`,
      `GATEWAY=${gateway}`,
      `DNS_NAMESERVERS=${dns_nameservers}`,
    ],
    script: `${process.cwd()}/packer/machineTypes/ubuntu-16.04-network-setup.sh`,
    execute_command:
      "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
  },
];
