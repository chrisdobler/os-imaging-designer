export default {
  mode: 'level0',
  builder: ({ targetPlatform }) => ({
    builders: [
      {
        disk_size: 32768,
        guest_os_type: 'ubuntu64Guest',
        floppy_files: [
          `${process.cwd()}/level0/ubuntu-16.04/ubuntu-16.04-preseed.cfg`,
        ],
        ...(() =>
          targetPlatform === 'vmware-workstation'
            ? {
                iso_url:
                  'http://old-releases.ubuntu.com/releases/16.04.5/ubuntu-16.04.5-server-amd64.iso',
                iso_checksum: '24636fd103a2a43c95659f1c3c63718e',
                iso_checksum_type: 'md5',
              }
            : {})(),
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
      },
    ],
    provisioners: [
      {
        type: 'file',
        source: '/Users/chris/.ssh/id_rsa.pub',
        destination: '/home/user/',
      },
    ],
  }),
};
