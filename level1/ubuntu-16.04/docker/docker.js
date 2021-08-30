import webmin from '../utilities/webmin/webmin';

export default {
  mode: 'level2',
  machineType: 'ubuntu-16.04',
  supportsInitialBuild: false,
  overrides: {
    ram: 512,
    CPUs: 2,
  },
  buildType: 'packer',
  supportFiles: false,
  builder: ({ targetPlatform }) => ({
    builders: [],
    provisioners: [],
  }),
};