ls -t | tail -n +4

echo -n "Delete these files?: Y/n"
read VAR

if [[ $VAR -eq "Y" ]]
then
  echo "Deleteing files..."
# ls -t | tail -n +4 | xargs rm --
fi
