sudo apt-get update
sudo apt-get install -y network-manager
sudo apt-get remove -y --auto-remove net-tools

# not necessary - copies in script to allow network manager to manage ifconfig
# sudo mv -v /home/user/NetworkManager.conf /etc/NetworkManager/

sudo sed -i '10,12d' /etc/network/interfaces > /etc/network/interfaces
# sudo rm /etc/network/interfaces

sudo systemctl enable NetworkManager.service
sudo systemctl start NetworkManager.service

sudo nmcli con add type ethernet con-name "ethernet1" ifname ens192

# sudo touch /etc/NetworkManager/conf.d/10-globally-managed-devices.conf

sudo nmcli con mod "ethernet1" \
  ipv4.addresses $IPADDR \
  ipv4.gateway "192.168.16.1" \
  ipv4.dns "192.168.16.4,192.168.16.2" \
  ipv4.dns-search "doblersystems.local" \
  ipv4.method "manual"

if [ $IPADDR2 ]
then
  sudo nmcli con add type ethernet con-name "ethernet2" ifname ens224
  sudo nmcli con mod "ethernet2" \
    ipv4.addresses $IPADDR2 \
    ipv4.method "manual"
fi

# sudo ifdown --exclude=lo -a && sudo ifup --exclude=lo -a
# sudo service network-manager restart

nmcli con show 
nmcli dev status
ip addr show