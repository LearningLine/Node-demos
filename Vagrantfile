# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.provider "virtualbox" do |v|
    v.memory = ENV["VAGRANT_MEMORY"] || 2 * 1024
    v.cpus = ENV["VAGRANT_CPUS"] || 2
  end

  if ENV["VAGRANT_DISK_PATH"]
    disk_path = ENV["VAGRANT_DISK_PATH"]
    disk_size = ENV["VAGRANT_DISK_SIZE"] || 80 * 1024

    config.vm.provider "virtualbox" do |v|
      if ARGV[0] == "up" && ! File.exist?(disk_path)
        v.customize ['createhd', '--filename', disk_path, '--size', disk_size]
        v.customize ['storageattach', :id, '--storagectl', 'SATAController', '--port', 1, '--device', 0, '--type', 'hdd', '--medium', disk_path]
      end
    end

    config.vm.provision "shell", inline: MOUNT_EXTRA
  end

  config.vm.provision "shell", inline: ENABLE_SWAP
  config.vm.provision "shell", inline: INSTALL_DOCKER
  config.vm.provision "shell", inline: INSTALL_DOCKER_COMPOSE
  config.vm.provision "shell", inline: INSTALL_NODE

  if ENV["VAGRANT_PUBLIC"] =~ (/(true|t|yes|y|1)$/i)
    config.vm.network "public_network"
  end

  if ENV["VAGRANT_PRIVATE"]
    unless ENV["VAGRANT_PRIVATE"] =~ (/(false|f|no|n|0)$/i)
      config.vm.network "private_network", ip: ENV["VAGRANT_PRIVATE"]
    end
  else
    config.vm.network "private_network", ip: "10.10.10.10"
  end

  if ENV["VAGRANT_FORWARD"]
    ENV["VAGRANT_FORWARD"].split(",").each do |port|
      config.vm.network "forwarded_port", guest: port.to_i, host: port.to_i
    end
  end
end

MOUNT_EXTRA = <<SCRIPT
if [ ! -e /dev/vgextra/lvextra ]; then
  sudo apt-get install -y lvm2
  sudo fdisk -u /dev/sdb <<EOF
n
p
1


t
8e
w
EOF
  sudo pvcreate /dev/sdb1
  sudo vgcreate vgextra /dev/sdb1
  sudo lvcreate -l $(sudo pvdisplay /dev/sdb1 -c | cut -d: -f10) -n lvextra vgextra
  sudo mkfs -t ext4 /dev/vgextra/lvextra
  sudo mkdir -p /mnt/extra
  sudo mount -t ext4 /dev/vgextra/lvextra /mnt/extra
  sudo sh -c "echo '/dev/vgextra/lvextra /mnt/extra ext4 defaults 0 0' >> /etc/fstab"
fi
SCRIPT

ENABLE_SWAP = <<SCRIPT
if [[ ! -f /swapfile ]]; then
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  sudo sh -c "echo '/swapfile none swap sw 0 0' >> /etc/fstab"
fi
SCRIPT

INSTALL_DOCKER = <<SCRIPT
if ! hash docker 2>/dev/null; then
  # Install AUFS support.
  sudo apt-get update
  sudo apt-get install -y linux-image-extra-`uname -r`
  # This requires a reboot before Docker can use the AUFS driver.

  # Install Docker.
  curl -sSL https://get.docker.io/ubuntu/ | sudo sh

  # Modify default Docker daemon options:
  sudo sh -c "echo 'DOCKER_OPTS=\\"-H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375 --dns 172.17.42.1 --dns 8.8.8.8 --dns-search node.consul --dns-search service.consul --storage-driver aufs\\"' > /etc/default/docker"

  # Add the vagrant user to the docker group to run docker commands without sudo.
  sudo gpasswd -a vagrant docker
fi
SCRIPT

INSTALL_DOCKER_COMPOSE = <<SCRIPT
if ! hash docker-compose 2>/dev/null; then
  # Install Docker Compose.
  curl -sSL https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
fi
SCRIPT

INSTALL_NODE = <<SCRIPT
if ! hash node 2>/dev/null; then
  curl -sL https://deb.nodesource.com/setup | sudo bash -
  sudo apt-get install -y nodejs build-essential
fi
SCRIPT
