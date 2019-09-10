# packer-scripts

A set of packer scripts with generalized configuration logic for deploying various appliance servers onto VMware vSphere hypervisor platform.

## Description

\*\*\* This is a work in progress. Some of the core features are still being worked on.

The purpose of this project is to extract out as much of the build script code as possible into a shareable set of generalized build script templates for a variety of different operating systems ranging from Linux to Windows and even Mac OS. Embedded applications are planned as well. The next step is to divide the scripts into fragments which can be dynamically created using a design schema. the files in the 'packer-scripts' directory reresent configured script renderings. These will eventually be removed in favor of dynamically created scripts. Then the files in this directory would represent temporary configs that can be used for debugging imaging issues.

These scripts use the packer build script utility, by Hashicorp - https://www.packer.io.

The deployment at this point is somewhat biased toward the VMware vSphere hypervisor platform https://www.vmware.com/products/vsphere.html. Its also planned to move away from this and make the deployment more agnostic so that the majority of the script logic can be applied to any deployment platform.

The trickiest part of this project is how to decide to properly draw a distinction between private configuration and public coniguration for a machine build script. Contributions are very appreciated for methods and ways to extract more of the generalized logic out of the 'private' configuration files and in to here.

Ideally you run these scripts from one level up from you working directory so that you can relatively reference private scripts.

```
/.
| packer-scripts/<rendered machine types>
| private-config/<your personal configs>
```

## Prepare Local Environment

see: https://github.com/vmware/govmomi/releases

```
% export URL_TO_BINARY=https://*
% curl -L $URL_TO_BINARY | gunzip > /usr/local/bin/govc
% chmod +x /usr/local/bin/govc
```

## Supported platforms

This is a lits of all the application servers which are currently supported, and what their level of support is currently at. The hardcoded values will be phased out soon.

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
- Backups - OK

BUILD

```
packer build \
-var 'dominance=<master|backup>' \
-var 'pool=<192.168.16.5 Dedicated|192.168.16.6 Dedicated>' \
-var-file=configuration/packer-variables.json \
-var 'folder=<esx1-dedicated|esx2-dedicated>' \
-var 'ipaddr=<192.168.16.23|192.168.16.49>/24' \
packer-scripts/dhcp/dhcp.json
```

packer build \
-var 'dominance=master' \
-var 'pool=192.168.16.5 Dedicated' \
-var-file=configuration/packer-variables.json \
-var 'folder=esx1-dedicated' \
-var 'ipaddr=192.168.16.23/24' \
packer-scripts/dhcp/dhcp.json

packer build \
-var 'dominance=backup' \
-var 'pool=192.168.16.6 Dedicated' \
-var-file=configuration/packer-variables.json \
-var 'folder=esx2-dedicated' \
-var 'ipaddr=192.168.16.49/24' \
packer-scripts/dhcp/dhcp.json

BACKUP

```
scp -r user@ds-dhcp-<master|backup>:/etc/dhcp/* configuration/ds-dhcp-<master|backup>/etc/dhcp/
// todo: backup sqlite

```

scp -r user@ds-dhcp-master:/etc/dhcp/\* configuration/ds-dhcp-master/etc/dhcp/

scp -r user@ds-dhcp-backup:/etc/dhcp/\* configuration/ds-dhcp-backup/etc/dhcp/

UPDATE SETTINGS

```
scp -r configuration/ds-dhcp-master/etc/dhcp/ user@ds-dhcp-master:~
export PASS=<password>
echo $PASS | ssh user@ds-dhcp-master sudo -S sh -c '"cp -r ~/dhcp/* /etc/dhcp/ && service isc-dhcp-server restart && service isc-dhcp-server status"'

```

#### Open vSwitch

reference: http://www.openvswitch.org/

This example also integrates together with Fog Server to finalize the deployment into a bare metal box.

support:

- Build - In progress
- Backups - In progress

BUILD

```
packer build \
-var 'pool=Automated Machines' \
-var-file=configuration/packer-variables.json \
-var 'folder=automated' \
-var 'vm_name=ds-sw02' \
-var 'ipaddr=192.168.16.54/24' \
packer-scripts/open-vswitch/open-vswitch.json

export MATREMPASS=<password>
sshpass -p $MATREMPASS scp -r configuration/ds-sw02/ds-sw02-fog-source.vmx root@192.168.16.5:/vmfs/volumes/5cec0655-eb3c09f0-c5f2-0010e044a0f9/ds-sw02-fog-source/

# enable an image from fog

# boot machine

```

ADJUST VM TEMPLATE

```
scp -r root@192.168.16.5:/vmfs/volumes/5cec0655-eb3c09f0-c5f2-0010e044a0f9/ds-sw02-fog-source/ds-sw02-fog-source.vmx configuration/ds-sw02/
```

#### Fog Server

reference: https://fogproject.org/

support:

- Build - OK
- Backups - OK

BUILD

```
packer build \
-var 'pool=Automated Machines' \
-var-file=configuration/packer-variables.json \
-var 'folder=automated' \
-var 'vm_name=ds-fog1' \
-var 'ipaddr=192.168.16.44/24' \
-var 'ipaddr2=10.0.0.44/24' \
packer-scripts/fog/fog-network.json

packer build \
-var 'pool=Automated Machines' \
-var-file=configuration/packer-variables.json \
-var 'folder=automated' \
-var 'vm_name=ds-fog1' \
-var 'ipaddr=192.168.16.44/24' \
-var 'ipaddr2=10.0.0.44/24' \
packer-scripts/fog/fog.json

packer build \
-var 'pool=Automated Machines' \
-var-file=configuration/packer-variables.json \
-var 'folder=automated' \
-var 'vm_name=ds-fog1' \
-var 'ipaddr=192.168.16.44/24' \
-var 'ipaddr2=10.0.0.44/24' \
packer-scripts/fog/fog-network-add-adapter.json
```

BACKUP

```
export PASS=<password>
echo $PASS | ssh user@ds-fog1 sudo -S sh -c '"sudo mysqldump -B fog > ~/fogdb.sql && ls -la ~"'
scp -r user@ds-fog1:~/fogdb.sql configuration/ds-fog1/
```

#### Home Asssistant

reference: https://www.home-assistant.io/

support:

- Build - In progress
- Backups - In progress

BUILD

```
packer build \
-var 'pool=Automated Machines' \
-var-file=configuration/packer-variables.json \
-var 'folder=automated' \
-var 'vm_name=ds-home-assistant1' \
-var 'ipaddr=192.168.16.48/24' \
packer-scripts/home-assistant/home-assistant.json
```

BACKUP

```
echo '.backup haBackup.db'  | sqlite3 /usr/share/hassio/homeassistant/home-assistant_v2.db
scp -r user@ds-home-assistant1:/home/user/haBackup.db configuration/ds-home-assistant1/usr/share/hassio/homeassistant/home-assistant_v2.db
scp -r user@ds-home-assistant1:/usr/share/hassio/* configuration/ds-home-assistant1/usr/share/hassio/
```

### Starwind vSAN

reference:

support:

- Build - in progress
- Backups - in progress

BUILD

```
packer build \
-var 'vm_name=DSs014-starwind|DSs015-starwind' \
-var 'dominance=<master|backup>' \
-var 'pool=<192.168.16.5 Dedicated|192.168.16.6 Dedicated>' \
-var-file=configuration/packer-variables.json \
-var 'folder=<esx1-dedicated|esx2-dedicated>' \
-var 'ipaddr=<192.168.16.56|192.168.16.57>/24' \
packer-scripts/starwind-san/starwind-san.json

packer build \
-var 'vm_name=DSs014-starwind' \
-var 'dominance=master' \
-var 'pool=192.168.16.5 Dedicated' \
-var-file=configuration/packer-variables.json \
-var 'folder=esx1-dedicated' \
-var 'ipaddr=192.168.16.56/24' \
packer-scripts/starwind-san/starwind-san.json
```

### PetaSAN

reference: http://www.petasan.org/

support:

- Build - in progress
- Backups - in progress

BUILD

```
packer build \
-var 'member=active|backup|witness' \
-var 'pool=<192.168.16.5 Dedicated|192.168.16.6 Dedicated>' \
-var-file=configuration/packer-variables.json \
-var 'folder=<esx1-dedicated|esx2-dedicated>' \
-var 'ipaddr=<192.168.16.56|192.168.16.57>/24' \
packer-scripts/petasan/petasan.json

packer build \
-var 'member=active' \
-var 'pool=192.168.16.5 Dedicated' \
-var-file=configuration/packer-variables.json \
-var 'folder=esx1-dedicated' \
-var 'ipaddr=192.168.16.56/24' \
packer-scripts/petasan/petasan.json
```

### level0 Ubuntu 16.04

This is a base build script to install the operating system and perform as much shared config as possible before passing up to a specific builder.

- Starts with iso/netboot install
- Installs recommended baseline sotware
- Updates system
- todo: remove splash screen

### level0 Windows 2012

```
packer build \
-var 'pool=Automated Machines' \
-var-file=configuration/packer-variables.json \
-var 'folder=automated' \
-var 'vm_name=windows-2012' \
-var 'window2012_scripts_folder=packer-scripts/level0/windows2012' \
packer-scripts/level0/windows2012/windows2012.json
```
