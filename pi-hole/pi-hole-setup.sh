sudo apt-get update
sudo apt-get install -y curl git

sudo mkdir /etc/pihole
sudo mv -v /home/user/pihole/setupVars.conf /etc/pihole/

git clone https://github.com/pi-hole/pi-hole.git /etc/.pihole
sudo /etc/.pihole/automated\ install/basic-install.sh --unattended

## Restore backup configuration
# sudo mv -v /home/user/pihole/ /etc/
rsync -av /home/user/pihole/ /etc/pihole/
rm -rf /home/user/pihole/