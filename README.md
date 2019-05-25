# packer-scripts

A set of packer scripts for deploying various appliance servers.

## Descriptions

The purpose of this project is to extract out as much of the build script code as possible into a shareable set of generalized build script templates for a variety of different operating systems ranging from Linux to Windows and even Mac OS. Embedded applications are planned as well.

These scripts use the packer build script utility, by Hashicorp - https://www.packer.io

The trickiest part of this project is how to decide to properly draw a distinction between private configuration and public coniguration for a machine build script. Contributions are very appreciated for methods and ways to extract more of the generalized logic out of the 'private' coniguration files and in to here.

## Supported platforms

This is a lits of all the application servers which are currently supported, and what their level of support is currently at.

#### Pi Hole Server

reference: https://pi-hole.net/, https://github.com/pi-hole/pi-hole
support:
Build - OK
Backups - OK, can backup all settings, log file backup not yet integrated.

BUILD

```
packer build -var-file=configuration/packer-variables.json packer-scripts/pi-hole/pi-hole.json
```

BACKUP

```
scp -r user@192.168.16.4:/etc/pihole/* configuration/ds-pi-hole/etc/pihole/
```

### level0

- Starts with iso/netboot install
- Installs recommended baseline sotware
- Updates system
