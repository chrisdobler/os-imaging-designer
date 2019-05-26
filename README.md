# packer-scripts

A set of packer scripts with generalized configuration logic for deploying various appliance servers onto VMware vSphere hypervisor platform.

## Description

The purpose of this project is to extract out as much of the build script code as possible into a shareable set of generalized build script templates for a variety of different operating systems ranging from Linux to Windows and even Mac OS. Embedded applications are planned as well.

These scripts use the packer build script utility, by Hashicorp - https://www.packer.io.

The deployment at this point is somewhat biased toward the VMware vSphere hypervisor platform https://www.vmware.com/products/vsphere.html. Its also planned to move away from this and make the deployment more agnostic so that the majority of the script logic can be applied to any deployment platform.

The trickiest part of this project is how to decide to properly draw a distinction between private configuration and public coniguration for a machine build script. Contributions are very appreciated for methods and ways to extract more of the generalized logic out of the 'private' coniguration files and in to here.

Ideally you run these scripts from one level up from you working directory so that you can relatively reference private scripts.

```
/.
| packer-scripts/<machine types>
| private-config/<your personal configs>
```

## Supported platforms

This is a lits of all the application servers which are currently supported, and what their level of support is currently at.

#### Pi Hole Server

reference: https://pi-hole.net/, https://github.com/pi-hole/pi-hole

support:

- Build - OK
- Backups - OK, can backup all settings, log file backup not yet integrated.

BUILD

```
packer build -var-file=configuration/packer-variables.json packer-scripts/pi-hole/pi-hole.json
```

BACKUP

```
scp -r user@192.168.16.4:/etc/pihole/* configuration/ds-pi-hole/etc/pihole/
```

#### DHCP ISC Server Cluster

An ubuntu dhcp server with a failover peer for redundancy. Use the 'dominance' flag to indicate if this is a cluster master or not.

support:

- Build - OK
- Backups - In progress

BUILD

```
packer build \
-var 'dominance=<master|backup>' \
-var-file=configuration/packer-variables.json \
packer-scripts/dhcp/dhcp.json
```

BACKUP

```
scp -r user@192.168.16.4:/etc/pihole/* configuration/ds-pi-hole/etc/pihole/
```

### level0 Ubuntu 16.04

This is a base build script to install the operating system and perform as much shared config as possible before passing up to a specific builder.

- Starts with iso/netboot install
- Installs recommended baseline sotware
- Updates system
