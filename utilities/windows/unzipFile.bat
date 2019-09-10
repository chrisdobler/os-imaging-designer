
mkdir Transfer
echo "

Add-Type -AssemblyName System.IO.Compression.FileSystem
function Unzip
{
    param([string]$zipfile, [string]$outpath)

    [System.IO.Compression.ZipFile]::ExtractToDirectory($zipfile, $outpath)
}

Unzip 'C:\Users\Administrator\Transfer\' 'C:\a'

"  > C:\Users\Administrator\Transfer\unzipFile.ps1
C:\Users\Administrator\Transfer\downloadFile.bat
powershell -noexit "& ""C:\Users\Administrator\Transfer\downloadFile.ps1"""