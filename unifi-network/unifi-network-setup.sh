# sudo apt-get install nagios-nrpe-server nagios-plugins openssl nagios-nrpe-plugin nagios-plugins-extra nagios-plugins-basic
# sudo vim /etc/nagios/nrpe.cfg

sudo apt-get update && sudo apt-get install ca-certificates apt-transport-https 

echo 'deb https://www.ui.com/downloads/unifi/debian stable ubiquiti' | sudo tee /etc/apt/sources.list.d/100-ubnt-unifi.list

sudo wget -O /etc/apt/trusted.gpg.d/unifi-repo.gpg https://dl.ui.com/unifi/unifi-repo.gpg 

sudo apt-get update && sudo apt-get install unifi -y