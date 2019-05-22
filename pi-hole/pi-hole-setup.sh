sudo apt-get install -y curl git

sudo mv -v /home/user/pihole/ /etc/

git clone https://github.com/pi-hole/pi-hole.git

sudo pi-hole/automated\ install/basic-install.sh --unattended