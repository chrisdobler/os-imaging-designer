

sudo apt-get update
sudo apt-get remove dhcp-client
sudo apt-get install -y isc-dhcp-server

sudo rsync -av /home/user/dhcp/ /etc/dhcp/
rm -rf /home/user/dhcp/