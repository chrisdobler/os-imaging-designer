export default ({
  location,
  vm_name,
  address,
  netmask,
  gateway,
  dns_nameservers,
}) => ({
  provisioners: [],
  communicator: 'winrm',
});
