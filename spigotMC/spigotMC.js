import { ssh, fusionClone } from '../packer/builders/common';

export default {
  mode: 'level2',
  machineType: 'ubuntu-16.04',
  supportsInitialBuild: true,
  overrides: {
    ram: 2500,
  },
  supportFiles: true,
  builder: ({ vm_name, targetPlatform, platformSpecific }) => ({
    builders: [
      {
        ...platformSpecific,
        vm_name,
        ...(() => (targetPlatform === 'vmware-workstation' ? {} : {}))(),
        ...ssh,
      },
    ],
    provisioners: [],
  }),
};
