export default {
  mode: 'level2',
  machineType: 'ubuntu-16.04',
  supportsInitialBuild: true,
  overrides: {
    ram: 2500,
  },
  supportFiles: true,
  builder: ({ targetPlatform }) => ({
    builders: [
      {
        ...(() => (targetPlatform === 'vmware-workstation' ? {} : {}))(),
      },
    ],
    provisioners: [],
  }),
};
