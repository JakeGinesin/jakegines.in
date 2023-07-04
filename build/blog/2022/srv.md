srv -> Home Server Setup

Here's some of the details behind how I configured my home network and set up my locally hosted minecraft server. This post is mainly for my own future reference.  

### Modem 
I don't have enough money to blow on a new high-speed modem, so I was stuck with the default modem Comcast Xfinity, my Internet provider, gives to their customers for free. Comcast Xfinity had recently upgraded our modem for free, so I had made the easy mistake in believing I could actually make use of it.  

It turns out, this "upgrade" severely inhibited the functionality of the model. I was now *unable* to edit most of the modem's settings without downloading Comcast Xfinity's disfunctional, spyware-ridden mobile app. To emphasize on the latter bit, the app would attempt to collect my location *every 30 seconds*.  

My solution to getting around the god-awful modem was setting it into "bridge mode" in the local settings. See [Xfinity's support article](https://www.xfinity.com/support/articles/wireless-gateway-enable-disable-bridge-mode). 

### Router
I built a computer out of some old parts and installed pfsense on it. (I made a [reddit post](https://www.reddit.com/r/homelab/comments/zxhl96/this_homelab_goes_hard_af_specs_in_comments/) further detailing specs, details, etc). 

### Pi
I attached my raspberri pi 4 running Arch Linux to my network, gave it a static IP address assignment, and created a port forwarding rule to that IP address in pfsense. I then configured the pi as an SSH server. 

To restart the pi through ssh, use `sudo shutdown -r now`

### Minecraft Server 
Because pis have poor single-core performance, the only way viable way to run a minecraft server smoothly is to use [papermc](https://papermc.io/). I just replaced my server's jar file with papermc's and everything worked fine. I further optimized the server with help from [this reddit post](https://www.reddit.com/r/RASPBERRY_PI_PROJECTS/comments/ktt8j7/how_can_i_improve_a_raspberry_pi_minecraft_server/) and [this blog post](https://docs.dedicatedmc.io/server-optimization/paper-config-optimization-guide/). 

To keep the minecraft server up 24/7, I found the best solution was to create a systemd service. I initially tried to use a cron job, but this solution proved to be clunky. Systemd better.  

*ok, systemd has problems, but it's fine for my pi.*

Anyways, guided by this [stackoverflow](https://stackoverflow.com/a/34333783) post, I created `mc.service` in the directory `.config/systemd/user` with the contents:

```
[Unit]
Description=Minecraft Server

[Service]
type=simple
WorkingDirectory=/home/pi/Server
ExecStart=/bin/sh /home/pi/Server/run.sh
Restart=always
RestartSec=10

[Install]
WantedBy=default.target
```
