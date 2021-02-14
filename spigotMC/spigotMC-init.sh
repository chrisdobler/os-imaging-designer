mkdir minecraft_server
mkdir build_tools
cd build_tools
wget https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar
git config --global --unset core.autocrlf
java -jar BuildTools.jar --rev 1.16.1
mv spigot-1.16.1.jar ../minecraft_server/spigot.jar
cd ..
cd minecraft_server
echo '#!/bin/sh\n
java -Xms1G -Xmx1G -XX:+UseConcMarkSweepGC -jar spigot.jar nogui' > start.sh
chmod +x start.sh