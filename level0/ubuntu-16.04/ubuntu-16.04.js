import { ssh } from '../../packer/builders/common';

export default {
  mode: 'level0',
  builder: ({ vm_name, targetPlatform, platformSpecific }) => ({
    builders: [
      {
        ...platformSpecific,
        vm_name,
        disk_size: 32768,
        guest_os_type: 'ubuntu64Guest',
        ...() =>
          targetPlatform === 'vmware-workstation'
            ? {
                iso_url:
                  'http://old-releases.ubuntu.com/releases/16.04.5/ubuntu-16.04.5-server-amd64.iso',
                iso_checksum: '24636fd103a2a43c95659f1c3c63718e',
                iso_checksum_type: 'md5',
                floppy_files: [
                  `${process.cwd()}/level0/ubuntu-16.04-preseed.cfg`,
                ],
              }
            : {
                iso_paths:
                  '[Installations] Linux/Ubuntu/ubuntu-16.04.5-server-amd64.iso',
                floppy_files: ['{{template_dir}}/ubuntu-16.04-preseed.cfg'],
              },
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
  }),
};
