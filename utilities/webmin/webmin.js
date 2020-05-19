export default [
  {
    type: 'file',
    source: `../configuration/profiles/cert.pem`,
    destination: '/home/user/',
  },
  {
    type: 'shell',
    script: `${process.cwd()}/utilities/webmin/webmin-setup.sh`,
    execute_command:
      "echo '{{user `ubuntu_template_password`}}' | sudo -S sh -c '{{ .Vars }} {{ .Path }}'",
  },
];
