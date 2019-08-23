# sudo sed '10,12d' /etc/network/interfaces

sudo echo "
auto ens224
iface ens224 inet static
        address 10.0.0.44
        netmask 255.0.0.0" >> /etc/network/interfaces


# restore backup
sudo mysql fog < /home/user/transfer/fogdb.sql