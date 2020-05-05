export default ({ vm_name }) => ({
  type: 'file',
  source: `../configuration/${vm_name}/interfaces`,
  destination: '/home/user/',
});
