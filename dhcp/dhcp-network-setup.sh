sudo apt-get update
sudo apt-get install -y network-manager
sudo apt-get remove -y --auto-remove net-tools

sudo mv -v /home/user/NetworkManager.conf /etc/NetworkManager/

sudo sed '10,12d' /etc/network/interfaces

sudo systemctl enable NetworkManager.service
sudo systemctl start NetworkManager.service

sudo nmcli con add type ethernet con-name ethernet ifname ens192

# sudo touch /etc/NetworkManager/conf.d/10-globally-managed-devices.conf

sudo nmcli con mod "ethernet" \
  ipv4.addresses $IPADDR \
  ipv4.gateway "192.168.16.1" \
  ipv4.dns "192.168.16.2,8.8.8.8" \
  ipv4.dns-search "doblersystems.local" \
  ipv4.method "manual"

nmcli con show
nmcli dev status
