export default (v) => ({
  level0: {
    type: 'vmware-iso',
    // headless: true,
    // memory: 1024,
    network_adapter_type: 'vmxnet3',
    // network: 'bridged',
    disk_type_id: 1,
    output_directory: `/Users/chris/Virtual Machines Mobile/${v.vm_name}`,
  },
  level2: {
    type: 'vmware-vmx',
    // headless: true,
    // memory: 1024,
    // network: 'bridged',
    linked: true,
    source_path:
      '/Users/chris/Virtual Machines Mobile/ubuntu-16.04-template/ubuntu-16.04-template.vmx',
    output_directory: `/Users/chris/Virtual Machines Mobile/${v.vm_name}`,
  },
});
