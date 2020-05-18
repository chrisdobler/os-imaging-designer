sudo mv -v /home/user/interfaces /etc/network/
# sudo sed '10,12d' /etc/network/interfaces

# update the host name
sudo echo "$HOSTNAME" | sudo tee /etc/hostname > /dev/null