export default {
  mode: 'level1',
  machineType: 'ubuntu-16.04',
  supportsInitialBuild: false,
  supportFiles: false,
  builder: ({ vm_name, targetPlatform }) => ({
    builders: [],
    provisioners: [],
  }),
};
