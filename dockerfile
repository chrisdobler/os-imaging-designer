FROM ubuntu

# set a directory for the app
WORKDIR /usr/src/app
# VOLUME /usr/src/data

# install dependencies
RUN apt-get update
RUN apt-get install -y wget unzip

# https://computingforgeeks.com/install-latest-packer-on-linux-freebsd-macos-windows/
ENV PACKER_RELEASE="1.7.2"
RUN wget https://releases.hashicorp.com/packer/${PACKER_RELEASE}/packer_${PACKER_RELEASE}_linux_amd64.zip -P /tmp/
RUN unzip /tmp/packer_${PACKER_RELEASE}_linux_amd64.zip -d /tmp
RUN mv /tmp/packer /usr/local/bin


# RUN packer init

# see: https://github.com/vmware/govmomi/releases
# RUN export URL_TO_BINARY=https://*
# RUN curl -L $URL_TO_BINARY | gunzip > /usr/local/bin/govc
# RUN chmod +x /usr/local/bin/govc

# RUN go get -u github.com/vmware/govmomi

# RUN pip install --no-cache-dir -r requirements.txt

# define the port number the container should expose
# EXPOSE 5000

# copy all the files to the container
# COPY . .

# run the command
# CMD ["/usr/local/bin/packer"]
# CMD ["ls", "/data", "-la"]