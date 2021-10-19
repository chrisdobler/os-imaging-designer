sudo rm /var/lib/dpkg/lock
sudo apt-get -y update
sudo apt-get -y upgrade

sudo apt-get install -y vim htop curl git iperf3 software-properties-common

# add java 16
sudo add-apt-repository ppa:linuxuprising/java
sudo apt update
sudo apt install oracle-java16-installer --install-recommends

sudo mkdir .ssh
sudo mv id_rsa.pub .ssh/authorized_keys

# todo: remove splash screen
# sudo sed line10 GRUB_CMDLINE_LINUX_DEFAULT=""
# sudo update-grub

# force fsck on every boot
# ubuntu will lock the boot partition if any errors are detected. this saves you.
# /etc/fstab: static file system information.
# sudo fdisk -l
sudo tune2fs -c 1 /dev/sda1

# todo: sudo rsync
# https://askubuntu.com/questions/719439/using-rsync-with-sudo-on-the-destination-machine