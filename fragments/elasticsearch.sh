wget https: //artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.1.1-linux-x86_64.tar.gz
wget https: //artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.1.1-linux-x86_64.tar.gz.sha512
shasum -a 512 -c elasticsearch-7.1.1-linux-x86_64.tar.gz.sha512 
tar -xzf elasticsearch-7.1.1-linux-x86_64.tar.gz
cd elasticsearch-7.1.1/

// mac export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-12.0.1.jdk/Contents/Home
 6009* ./bin/elasticsearch


 // kibana

curl -O https://artifacts.elastic.co/downloads/kibana/kibana-7.1.1-darwin-x86_64.tar.gz
shasum -a 512 kibana-7.1.1-darwin-x86_64.tar.gz 
tar -xzf kibana-7.1.1-darwin-x86_64.tar.gz
cd kibana-7.1.1-darwin-x86_64/ 

wget https://artifacts.elastic.co/downloads/kibana/kibana-7.1.1-linux-x86_64.tar.gz
shasum -a 512 kibana-7.1.1-linux-x86_64.tar.gz 
tar -xzf kibana-7.1.1-linux-x86_64.tar.gz
cd kibana-7.1.1-linux-x86_64/ 