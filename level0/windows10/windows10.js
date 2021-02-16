export default {
  mode: 'level0',
  builder: ({ targetPlatform }) => ({
    builders: [
      {
        disk_size: 32768,
        guest_os_type: 'windows9_64Guest',
        floppy_files: [`${process.cwd()}/level0/windows2012/setup/`],
        iso_paths: [
          '[Installations] PC/Microsoft/Windows2012/Windows2012R2.iso',
          '[Installations] VMware/tools/windows/11.2.5/vmtools/windows.iso"',
        ],
        ...(() => (targetPlatform === 'vmware-workstation' ? {} : {}))(),
      },
    ],
    provisioners: [
      // {
      //   type: 'file',
      //   source: '/Users/chris/.ssh/id_rsa.pub',
      //   destination: '/home/user/',
      // },
      {
        type: 'windows-shell',
        inline: ['dir c:\\'],
      },
    ],
  }),
};
