# Using an AWS E3 VM as an agent to stream live data continuously into Foundry

Optimized VM SKU config for data streaming agent:
- SKU: t3 micro (2vCPUs, 1GiB RAM) - cheapest
- Security group: SSH inbound enabled, HTTP outbound enabled
- Disk: General purpose SSD 8GiB (3000 IOPS)

On the VM:
- update packages
```
sudo apt update
```
- download python package installer
```
sudo apt install python3-pip
```
- install python libraries: websockets and requests
```
pip3 install websockets requests
```

