sudo apt-get install -y curl git

sudo mkdir /etc/pihole
sudo mv -v /home/user/setupVars.conf /etc/pihole/

sudo curl -sSL https://install.pi-hole.net | bash