mkdir /mnt/freenas2
mkdir /mnt/freenas2/images
mkdir /mnt/freenas2/images/dev

git clone https://github.com/FOGProject/fogproject.git /home/user/fog 
cd /home/user/fog 
git pull 
cd bin 
sudo ./installfog.sh -y

sudo apt-get install -f -y