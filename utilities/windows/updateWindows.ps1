Install-Module PSWindowsUpdate
Get-Command –module PSWindowsUpdate

Add-WUServiceManager -ServiceID 7971f918-a847-4430-9279-4a52d1efe18d

Get-WUInstall –MicrosoftUpdate –AcceptAll –AutoReboot

# https://gallery.technet.microsoft.com/scriptcenter/2d191bcd-3308-4edd-9de2-88dff796b0bc/