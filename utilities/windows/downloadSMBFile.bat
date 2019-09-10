mkdir Transfer
echo "

$secpasswd = ConvertTo-SecureString "877646" -AsPlainText -Force
$mycreds = New-Object System.Management.Automation.PSCredential ("root", $secpasswd)

New-PSDrive –Name “K” –PSProvider FileSystem –Root "\\ds-freenas2.doblersystems.local\Installations" –Persist -Credential $mycreds

Copy-Item -Source \\Installations\StarWind\starwind-v8.exe -Destination C:\path\

K:\StarWind\starwind-v8.exe

"  > C:\Users\Administrator\Transfer\downloadFile.ps1
C:\Users\Administrator\Transfer\downloadFile.bat
powershell -noexit "& ""C:\Users\Administrator\Transfer\downloadFile.ps1"""