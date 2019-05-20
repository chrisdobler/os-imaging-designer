sudo rm /var/lib/dpkg/lock
sudo apt-get -y update
sudo apt-get -y upgrade

sudo apt-get install -y vim htop curl git

sudo mkdir .ssh
sudo mv id_rsa.pub .ssh/authorized_keys