Special thanks to : https://medium.com/@jmrobles/how-to-create-a-kubernetes-cluster-with-rancher-on-hetzner-3b2f7f0c037a


# Hetzner Cloud Context
```
hcloud context create k8s-monkey
```

# Hetzner Network
```
hcloud network create --ip-range 10.1.0.0/16 --name k8s-network
```

# Create Ranger VM
```
hcloud server create --name rancher.c3smonkey.ch \
    --type cx11 \
    --image ubuntu-20.04 \
    --ssh-key ~/.ssh/id_rsa.pub \
    --datacenter nbg1-dc3
```

# Add Server To Network
```
hcloud server attach-to-network c3smonkey.ch --network k8s-network
```

## Install Docker
```
ssh root@rancher.c3smonkey.ch
apt-get update -y
apt install -y docker.io
systemctl start docker
```

## Install Ranger
```
docker run -d --restart=unless-stopped \
  -p 80:80 -p 443:443 \
  -v /opt/rancher:/var/lib/rancher \
  --name rancher-server \
  rancher/rancher:latest \  
  --acme-domain rancher.c3smonkey.ch
```

## Configure Ranger

https://rancher.c3smonkey.ch


### Add node driver
https://rancher.c3smonkey.ch/n/drivers/cluster



Download URL: 
https://github.com/marzelwidmer/rancher-hetzner-k8s/raw/master/hcloud-rancher-v2-ui-driver/docker-machine-driver-hetzner_2.1.0_linux_amd64.tar.gz


Custom UI URL (for Add Node template UI): 
https://raw.githubusercontent.com/marzelwidmer/rancher-hetzner-k8s/master/hcloud-rancher-v2-ui-driver/component.js

Whitelist Domains (to access UI file): 
storage.googleapis.com












# Setting Up A Private Docker Registry
https://www.alajmovic.com/posts/setting-up-a-private-docker-registry/
