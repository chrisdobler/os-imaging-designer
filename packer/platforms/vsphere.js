export default (v) => ({
  level0: {
    type: 'vsphere-iso',
    vcenter_server: v.vcenterServer,
    insecure_connection: 'true',
    username: v.username,
    password: v.password,
    // cluster: '{{user `vcenter_cluster`}}',
    host: v.host,
    datacenter: v.datacenter,
    vm_version: 11,
    cpu_cores: 4,
    // cpus: 4,
    ram: '2048',

    // network: 'Public LAN',
    network: v.network,

    network_card: 'vmxnet3',
    guest_os_type: 'ubuntu64Guest',

    // datastore: '{{user `vcenter_datastore`}}',

    disk_controller_type: 'pvscsi',
    disk_thin_provisioned: true,
    create_snapshot: false,
    convert_to_template: true,
    // shutdown_command: 'shutdown -P now',

    folder: 'templates',
  },
});
