mkdir /mnt/freenas2
mkdir /mnt/freenas2/images
mkdir /mnt/freenas2/images/dev

sudo apt-get update
sudo apt-get install -y git nfs-common

git clone https://github.com/FOGProject/fogproject.git /home/user/fog 
cd /home/user/fog 
git pull 
cd bin 
sudo ./installfog.sh -y

sudo apt-get install -f -y