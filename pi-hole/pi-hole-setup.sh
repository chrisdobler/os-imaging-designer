sudo apt-get install -y curl git

sudo mkdir /etc/pihole
sudo mv -v /home/user/pihole/ /etc/pihole/

git clone https://github.com/pi-hole/pi-hole.git

sudo pi-hole/automated\ install/basic-install.sh --unattended