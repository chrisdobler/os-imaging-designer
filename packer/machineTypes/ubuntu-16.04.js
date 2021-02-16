export default ({
  location,
  vm_name,
  address,
  netmask,
  gateway,
  dns_nameservers,
}) => ({
  provisioners: [
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
        `DNSNAMESERVERS=\"${dns_nameservers}\"`,
      ],
      script: `${process.cwd()}/packer/machineTypes/ubuntu-16.04-network-setup.sh`,
      execute_command:
        "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
    },
  ],
  communicator: 'ssh',
});
