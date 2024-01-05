All things linux security!

# Tools
- LinEnum, privilege escalation checks on Linux: [github.com/rebootuser/LinEnum](https://github.com/rebootuser/LinEnum)
- LinPEAS, an amazing privilege escaltion script: [github.com/carlospolop/PEASS-ng/tree/master/linPEAS#linpeas---linux-privilege-escalation-awesome-script](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS#linpeas---linux-privilege-escalation-awesome-script)

# System Structure
- `/bin` -> essential user command binaries
- `/etc` -> configuration files for the system
    - `/etc/pam.d/` -> pluggable authentication modules, responsible for checking the local account authentication
    - `/etc/security` -> many things installed with pam
        - `/etc/security/limits.conf` -> resource limits for specific users
    - `/etc/host.conf` -> resolver configuration file, see `man host.conf` 
    - `/etc/sudoers` -> shows who can run what without using sudo. edit with visudo
- `/sbin` -> essential system binaries
- `/usr` -> read-only user application support data & binaries
    - `/usr/bin` -> lots of user commands and whatnot
    - `/usr/include` -> lots of standard includes, e.g., things required to run c
    - `/usr/lib` -> obj, bin. lib files for coding and packages and whatnot
    - `/usr/local` -> local software, contains bin, lib, man, sbin, share
    - `/usr/share` -> data for sharing across all architectures
- `/var` -> variable data files 
    - `/var/cache` -> application cache data
    - `/var/lib` -> data modified as programs run
    - `/var/log` -> logs
    - `/var/opt` -> variable data for installed packages
    - `/var/spool` -> where data goes when it's waiting to be processed, e.g., `/var/spool/mail`
    - `/var/tmp` -> temporary files saved between reboots
- `/dev` -> device files
    - `/dev/null` -> deletes everything that's written to it
- `/home` -> user home directories
- `/lib` -> libraries and kernel modules
- `/mnt` -> mount files and temporary file systems
- `/opt` -> optional software applications
- `/proc` -> process and kerenl info files
- `/root` -> home dir for the root user!
- `/boot` -> everything needed for boot

# Important things to check
- `who/w` -> see who is currently logged in
- `last` -> last login
- `ps aux/top` -> see what processes are currently running
- `netstat -tuln/ss -tuln` -> see active network connections 
= `/etc/passwd` -> check for unfamiliar user accounts
- `/etc/shadow` -> for users with no passwords or weak passwords
    - look for users with UID of 0 other than root
    - to disable an account, put a ! in front of their hash as such: `username:!$6$hashvalue:...`
- `/etc/log/auto.log` or `/var/log/secure`
- check crontab at `/etc/crontab`
- look at services in `/etc/systemd` and `/etc/init.d`
- check out `/etc/rc.local` and `/etc/inittab`
- nmap scan on myself: `nmap -p- -sV --open -v 127.0.0.1`
- look at permissions for like, the fucking cronjob items lmao. `/var/spool/cron`
- look at vim history
- look at sudoers

# Analyzing sus things
- identify sus processes with `top/htop`
- use `ps aux` to list all running processes. look for sus things!
- look at `netstat -tulnp` or `ss -tulnp` to see active network connections - look for unfamiliar IP addresses or unexpected outbound connections.
    - also, look at `lsof -i :port` to find which processes are using network connections. might need sudo.
- check ps -aux | grep `[PID]`
- once we have a process, use `lsof -p [PID]` to see which files the process is accessing, or `strace -p [PID]` to trace system calls made by it
- to analyze a suspicious binary, use GDB, strings, file (to determine filetype)
