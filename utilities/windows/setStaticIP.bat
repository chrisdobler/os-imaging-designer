netsh interface ip set address name="Ethernet0" static %IPADDR% 255.255.255.0 192.168.16.1

netsh interface ip set dnsserver name="Ethernet0" static 192.168.16.2 index=1
netsh interface ip set dnsserver name="Ethernet0" static 192.168.16.4 index=2

shutdown –r