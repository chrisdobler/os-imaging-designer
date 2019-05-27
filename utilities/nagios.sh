sudo apt-get install nagios-plugins openssl nagios-nrpe-plugin nagios-plugins-extra nagios-plugins-basic nagios-plugins-all nagios-nrpe-server

sudo mv check_filesystem /usr/lib/nagios/plugins


sudo vim /etc/nagios/nrpe.cfg

sudo /etc/init.d/nagios-nrpe-server restart
/usr/lib64/nagios/plugins/check_procs -w 190 -c 210 