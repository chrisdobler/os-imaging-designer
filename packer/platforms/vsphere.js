const common = (v) => ({
  vcenter_server: v.vcenterServer,
  insecure_connection: 'true',
  host: v.host,
  username: v.username,
  password: v.password,
  datacenter: v.datacenter,
  // cluster: '{{user `vcenter_cluster`}}',
  datastore: v.datastore,
});

export default (v) => ({
  level0: {
    type: 'vsphere-iso',

    vm_version: 11,
    // cpu_cores: 4,
    CPUs: 4,
    ram: '3000',

    // network: 'Public LAN',
    network: v.network,
    resource_pool: 'templates',

    network_card: 'vmxnet3',
    guest_os_type: 'ubuntu64Guest',
    disk_controller_type: 'pvscsi',
    disk_thin_provisioned: true,
    create_snapshot: false,
    convert_to_template: true,
    // shutdown_command: 'shutdown -P now',

    folder: 'templates',
    ...common(v),
  },
  level2: {
    type: 'vsphere-clone',
    template: 'templates/ubuntu-16.04-template',
    convert_to_template: false,
    create_snapshot: false,
    ...common(v),
  },
});
