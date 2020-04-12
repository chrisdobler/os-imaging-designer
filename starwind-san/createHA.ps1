Import-Module StarWindX

try
{
	$server = New-SWServer -host 127.0.0.1 -port 3261 -user root -password starwind

	$server.Connect()

	$firstNode = new-Object Node

	$firstNode.HostName = "localhost"
	$firstNode.ImagePath = "My computer\C\starwind"
	$firstNode.ImageName = "masterImg21"
	$firstNode.Size = 12
	$firstNode.CreateImage = $true
	$firstNode.TargetAlias = "targetha21"
	$firstNode.AutoSynch = $true
	$firstNode.SyncInterface = "#p2=192.168.0.46:3260"
	$firstNode.HBInterface = "#p2=192.168.56.101:3260"
	$firstNode.PoolName = "pool1"
	$firstNode.SyncSessionCount = 1
	$firstNode.ALUAOptimized = $true
    
	#
	# device sector size. Possible values: 512 or 4096(May be incompatible with some clients!) bytes. 
	#
	$firstNode.SectorSize = 512
	
	#
	# 'SerialID' should be between 16 and 31 symbols. If it not specified StarWind Service will generate it. 
	# Note: Second node always has the same serial ID. You do not need to specify it for second node
	#
	$firstNode.SerialID = "050176c0b535403ba3ce02102e33eab"
    
	$secondNode = new-Object Node

	$secondNode.HostName = "192.168.0.46"
	$secondNode.HostPort = "3261"
	$secondNode.Login = "root"
	$secondNode.Password = "starwind"
	$secondNode.ImagePath = "My computer\C\starwind"
	$secondNode.ImageName = "partnerImg22"
	$secondNode.Size = 12
	$secondNode.CreateImage = $true
	$secondNode.TargetAlias = "partnerha22"
	$secondNode.AutoSynch = $true
	$secondNode.SyncInterface = "#p1=192.168.0.99:3260"
	$secondNode.HBInterface = "#p1=192.168.56.1:3260"
	$secondNode.SyncSessionCount = 1
	$secondNode.ALUAOptimized = $true
        
	$device = Add-HADevice -server $server -firstNode $firstNode -secondNode $secondNode -initMethod "Clear"
    
	while ($device.SyncStatus -ne [SwHaSyncStatus]::SW_HA_SYNC_STATUS_SYNC)
	{
		$syncPercent = $device.GetPropertyValue("ha_synch_percent")
	        Write-Host "Synchronizing: $($syncPercent)%" -foreground yellow

		Start-Sleep -m 2000

        	$device.Refresh()
	}
}
catch
{
	Write-Host $_ -foreground red 
}
finally
{
	$server.Disconnect()
}
