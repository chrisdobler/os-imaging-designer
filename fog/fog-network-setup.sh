
echo "
10.0.0.32:/mnt/storage-array-1/storage09/Images/fog       /images     nfs auto,nofail,noatime,nolock,intr,tcp,actimeo=1800 0 0
# 10.0.0.32:/mnt/storage-array-1/storage09/Images/fog       /images nfs     nfsvers=3,defaults,noatime 0 0
# 10.0.0.32:/mnt/storage-array-1/storage09/Images/fog/dev /images/dev nfs     nfsvers=3,defaults,noatime 0 0
" >> /etc/fstab