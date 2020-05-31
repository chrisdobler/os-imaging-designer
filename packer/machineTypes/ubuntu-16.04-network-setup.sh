# DEPRECATED: static interface upload
# sudo mv -v /home/user/interfaces /etc/network/
# sudo sed '10,12d' /etc/network/interfaces

# update the host name
sudo echo "$HOSTNAME" | sudo tee /etc/hostname > /dev/null

sudo echo "
source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto ens192
iface ens192 inet static
address $ADDRESS
netmask $NETMASK
gateway $GATEWAY
dns-nameservers $DNS_NAMESERVERS" > /etc/network/interfaces