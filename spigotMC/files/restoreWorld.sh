#!/bin/bash

killall -9 java

# PARAMS=""
# while (( "$#" )); do
#   case "$1" in
#     -a|--my-boolean-flag)
#       MY_FLAG=0
#       shift
#       ;;
#     -b|--my-flag-with-argument)
#       if [ -n "$2" ] && [ ${2:0:1} != "-" ]; then
#         MY_FLAG_ARG=$2
#         shift 2
#       else
#         echo "Error: Argument for $1 is missing" >&2
#         exit 1
#       fi
#       ;;
#     -*|--*=) # unsupported flags
#       echo "Error: Unsupported flag $1" >&2
#       exit 1
#       ;;
#     *) # preserve positional arguments
#       PARAMS="$PARAMS $1"
#       shift
#       ;;
#   esac
# done
# # set positional arguments in their proper place
# eval set -- "$PARAMS"

unset -v latest
for file in "./minecraft_server/backups"/*; do
  [[ $file -nt $latest ]] && latest=$file
done

echo $latest;
unzip -o $latest;
chmod +x minecraft_server/start.sh
reboot