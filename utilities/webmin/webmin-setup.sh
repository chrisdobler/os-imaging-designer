# install webmin for management
sudo echo "deb http://download.webmin.com/download/repository sarge contrib" | sudo tee --append /etc/apt/sources.list
 > /dev/null
wget http://www.webmin.com/jcameron-key.asc
sudo apt-key add jcameron-key.asc
sudo apt update 
sudo apt install -y webmin

sudo mv -v /home/user/cert.pem /etc/webmin/miniserv.pem