sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

sudo apt-get install -y build-essential libssl-dev libffi-dev libgmp3-dev
virtualenv python-pip libpq-dev python-dev

mkdir pgAdmin4
cd pgAdmin4
virtualenv pgAdmin4

source bin/activate
wget https://ftp.postgresql.org/pub/pgadmin/pgadmin4/v2.1/pip/pgadmin4-
2.1-py2.py3-none-any.whl
pip install pgadmin4-2.1-py2.py3-none-any.whl