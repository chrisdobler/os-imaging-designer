import { ssh } from 'common';

module.exports = ({ vm_name }) => ({
  builders: [
    {
      type: 'vmware-iso',
      // headless: true,

      iso_url:
        'http://old-releases.ubuntu.com/releases/16.04.5/ubuntu-16.04.5-server-amd64.iso',
      iso_checksum: '24636fd103a2a43c95659f1c3c63718e',
      iso_checksum_type: 'md5',
      floppy_files: [`${process.cwd()}/level0/ubuntu-16.04-preseed.cfg`],
      // memory: 1024,
      // shutdown_command: 'shutdown -P now',
      boot_command: [
        '<enter><wait><f6><wait><esc><wait>',
        '<bs><bs><bs><bs><bs><bs><bs><bs><bs><bs>',
        '<bs><bs><bs><bs><bs><bs><bs><bs><bs><bs>',
        '<bs><bs><bs><bs><bs><bs><bs><bs><bs><bs>',
        '<bs><bs><bs><bs><bs><bs><bs><bs><bs><bs>',
        '<bs><bs><bs><bs><bs><bs><bs><bs><bs><bs>',
        '<bs><bs><bs><bs><bs><bs><bs><bs><bs><bs>',
        '<bs><bs><bs><bs><bs><bs><bs><bs><bs><bs>',
        '<bs><bs><bs><bs><bs><bs><bs><bs><bs><bs>',
        '<bs><bs><bs>',
        '/install/vmlinuz',
        ' initrd=/install/initrd.gz',
        ' priority=critical',
        ' locale=en_US',
        ' file=/media/ubuntu-16.04-preseed.cfg',
        '<enter>',
      ],

      vm_name,
      disk_size: 32768,
      disk_type_id: 1,
      guest_os_type: 'ubuntu64Guest',
      network_adapter_type: 'vmxnet3',
      // network: 'bridged',
      output_directory: `/Users/chris/Virtual Machines Mobile/${vm_name}`,

      ...ssh,
    },
  ],
  provisioners: [
    {
      type: 'file',
      source: '/Users/chris/.ssh/id_rsa.pub',
      destination: '/home/user/',
    },
    {
      type: 'shell',
      scripts: [`${process.cwd()}/level0/ubuntu-16.04-template-setup.sh`],
      execute_command:
        "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
    },
  ],
});
