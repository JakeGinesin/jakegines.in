How to use warp-cli

pre: 
1. `systemctl stop systemd-resolved`
2. `systemctl disable systemd-resolved`

connect:
1. `sudo systemctl start warp-svc`
2. `warp-cli status`
3. `warp-cli connect` (will change your /etc/resolv.conf to a new config)

disconnect:
1. `warp-cli disconnect` (will change your /etc/resolv.conf back)
2. `systemctl stop systemd-resolved`
3. `systemctl disable systemd-resolved`
4. `sudo systemctl start warp-svc`

it seems warp-svc is fighting with /etc/resolv.conf over stuff for no reason. see: [Arch Linux Forum Post](https://bbs.archlinux.org/viewtopic.php?id=287445). This takes disabling *systemd-resolved* to solve.

other related:
- [People Crying on the Ubuntu Forum](https://askubuntu.com/questions/1458796/how-to-prevent-warp-cli-from-overwriting-etc-resolv-conf-file)
