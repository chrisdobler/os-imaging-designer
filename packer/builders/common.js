module.exports = {
  ssh: {
    communicator: 'ssh',
    ssh_username: '{{user `ssh_username`}}',
    ssh_private_key_file: '{{user `ssh_private_key_file`}}',
  },

  vsphereClone: {
    type: 'vsphere-clone',
    vcenter_server: '{{user `vcenter_server`}}',
    username: '{{user `vcenter_user`}}',
    password: '{{user `vcenter_password`}}',
    insecure_connection: 'true',
    datacenter: '{{user `vcenter_datacenter`}}',
    resource_pool: '{{user `vcenter_resource_pool`}}',
    template: 'templates/ubuntu-16.04-template-dhcp',
    cluster: '{{user `vcenter_cluster`}}',
    host: '{{user `vcenter_host`}}',
    datastore: '{{user `vcenter_datastore`}}',
    convert_to_template: false,
    create_snapshot: false,
  },

  fusionClone: ({ vm_name, path }) => ({
    type: 'vmware-vmx',
    source_path: `${path}${vm_name}/${vm_name}.vmx`,
  }),
};
