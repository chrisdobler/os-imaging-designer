ls -t minecraft_server/backups | tail -n +4

echo -n "Delete these files?: Y/n "
read VAR

if [[ $VAR == "Y" ]]
then
  echo "Deleteing files..."
  cd minecraft_server/backups
  ls -t | tail -n +4 | xargs rm --
fi
