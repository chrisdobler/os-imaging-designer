sudo apt-get update

sudo apt-get install -y openjdk-8-jre-headless
sudo apt-get install -y screen
sudo apt-get install -y unzip

mkdir minecraft_server
mv start.sh minecraft_server
chmod +x minecraft_server/start.sh

sudo mv minecraft-server.service /etc/systemd/system/
sudo chmod 664 /etc/systemd/system/minecraft-server.service

sudo systemctl daemon-reload
sudo systemctl enable minecraft-server.service

# todo: discover issue with minecraft game broadcast. below is wip.
# sudo iptables -A INPUT -m state --state NEW -m udp -p udp --dport 4445 -j ACCEPT
# sudo iptables -A OUTPUT -m state --state NEW -m udp -p udp --dport 4445 -j ACCEPT
# sudo apt-get install iptables-persistent
# sudo netfilter-persistent save