Set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server'-name "fDenyTSConnections" -Value 0
#or?
#Set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp' -name "UserAuthentication" -Value 1

Enable-NetFirewallRule -DisplayGroup "Remote Desktop"


# use this to recreate the rule
# netsh advfirewall firewall add rule name="allow RemoteDesktop" dir=in protocol=TCP localport=3389 action=allow

# test connection
# Test-NetConnection 192.168.1.11 -CommonTCPPort rdp