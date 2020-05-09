sudo apt-get update

sudo apt-get install -y openjdk-8-jre-headless
sudo apt-get install -y screen
sudo apt-get install -y unzip

# scp -r /Users/chris/Projects/machines/configuration/doblerworld-minecraft-pauline/backup/* user@192.168.15.8:~


# could put this behind upgrade flag
# wget https://launcher.mojang.com/v1/objects/bb2b6b1aefcd70dfd1892149ac3a215f6c636b07/server.jar

mkdir minecraft_server
mkdir build_tools
cd build_tools
wget https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
git config --global --unset core.autocrlf
java -jar BuildTools.jar --rev latest
mv spigot-1.15.2.jar ../minecraft_server
cd minecraft_server
echo '#!/bin/sh\n
java -Xms1G -Xmx1G -XX:+UseConcMarkSweepGC -jar spigot.jar nogui' > start.sh
chmod +x start.sh

# todo: discover issue with minecraft game broadcast. below is wip.
# sudo iptables -A INPUT -m state --state NEW -m udp -p udp --dport 4445 -j ACCEPT
# sudo iptables -A OUTPUT -m state --state NEW -m udp -p udp --dport 4445 -j ACCEPT
# sudo apt-get install iptables-persistent
# sudo netfilter-persistent save

# todo: configure this to startup on the machine
# java -Xmx1024M -Xms1024M -jar server.jar nogui
# cd minecraft_server
# ./start.sh

# screen -S "Minecraft server 1"
# screen -r