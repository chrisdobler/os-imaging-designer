sudo apt-get update

sudo apt-get install -y bind9 bind9utils bind9-doc

named -v

if [ "$RESTORE" = true ] ; then
    echo "Restoring configuration profile..."
    sudo mv -v /home/user/named.conf.options /etc/bind
    sudo mv -v /home/user/named.conf.local /etc/bind
fi

# sudo systemctl restart bind9
# sudo journalctl -eu bind9