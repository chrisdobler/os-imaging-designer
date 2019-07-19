rm /var/lib/dpkg/lock

apt-get install -y software-properties-common

add-apt-repository universe

apt-get update

apt-get install -y apparmor-utils apt-transport-https avahi-daemon ca-certificates curl dbus jq network-manager socat sqlite

curl -fsSL get.docker.com | sh

# reference https://www.home-assistant.io/hassio/installation/
curl -sL "https://raw.githubusercontent.com/home-assistant/hassio-installer/master/hassio_install.sh" | bash -s