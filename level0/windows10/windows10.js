export default {
  mode: 'level0',
  builder: ({ targetPlatform }) => ({
    builders: [
      {
        disk_size: 32768,
        guest_os_type: 'windows9_64Guest',
        floppy_files: [`${process.cwd()}/level0/windows10/setup/`],
        iso_paths: [
          '[Installations] PC/Microsoft/Win10_1909_English_x64.iso',
          '[Installations] VMware/tools/windows/10.1/vmtools/windows.iso',
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
