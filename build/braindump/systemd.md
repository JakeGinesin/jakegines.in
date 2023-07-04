Systemd is a linux service manager. It's what I personally use on my arch config, and it's how I create custom background services.

### Basic Commands
• Show System Status - `systemctl status`  
• List Running Units - `systemctl` or `systemctl list-units`  
• Show System Status - `systemctl status`  
• Show Process Status - `systemctl status [process]`  
• Start A Process - `systemctl start [process]`  
• Restart A Process - `systemctl relead [process]`  
• Start A Process At Boot - `systemctl enable [process]`  
• Disable Start On Boot - `systemctl disable [process]`  
• Reload Everything - `systemctl daemon-reload`

Note: When navigating processes, using grep or less is really helpful for parsing large outputs.

### Creating Custom Services - Starting A Docker Image
I have a docker image running [ArchiveBox](https://github.com/ArchiveBox) on my main workstation as a systemd service. Here's how I did it.  
  
Here's the short bash script I wrote to start my docker image:  
```sh=
#!/bin/bash
cd /home/jakeg/archivebox
sudo docker-compose up
```

I used `chmod +x [file].sh` to give systemd execution access to the script.  
  
In the systemd directory `/etc/systemd/system` I wrote the file `archivebox.service` with the contents:
```sh=
[Unit]
Description=archivebox service

[Service]
type=simple
ExecStart=/bin/bash /home/jakeg/archivebox/run.sh

[Install]
WantedBy=multi-user.target
```

### References
• "Creating a Linux service with systemd" - [Medium.com](https://medium.com/@benmorel/creating-a-linux-service-with-systemd-611b5c8b91d6)
• [https://wiki.archlinux.org/title/systemd](https://wiki.archlinux.org/title/systemd)
