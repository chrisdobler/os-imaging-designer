wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -

sudo apt-get install apt-transport-https

echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list

sudo apt-get -y install filebeat
sudo systemctl enable filebeat

sudo apt-get install heartbeat-elastic
sudo systemctl enable heartbeat-elastic

sudo apt-get install journalbeat
sudo systemctl enable journalbeat