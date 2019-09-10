$RegPath = "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon"

Set-ItemProperty $RegPath "AutoAdminLogon" -Value "1" -type String

Set-ItemProperty $RegPath "DefaultUsername" -Value "Administrator" -type String

Set-ItemProperty $RegPath "DefaultPassword" -Value "$env:windows_template_password" -type String