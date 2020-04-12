yum install -y centos-release-scl yum-utils
yum-config-manager --enable centos-sclo-rh-testing
yum install -y scl-utils

yum install -y gcc gcc-c++ systemd-devel

yum-config-manager --enable rhel-server-rhscl-7-rpms
yum-config-manager --enable rhel-server-rhscl-beta-7-rpms

yum install -y rh-python36