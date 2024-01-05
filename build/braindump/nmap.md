All things nmap - a network scanning tool.

# Resources
- [github.com/CyberLions/CompetitionResources-CPTC/blob/master/Cheat%20Sheets/NmapCheatSheetv1.1.pdf](https://github.com/CyberLions/CompetitionResources-CPTC/blob/master/Cheat%20Sheets/NmapCheatSheetv1.1.pdf)

# Setup
- get your own ip address with `ip addr show`

# All things NMAP
now, we have some ip addresses to play with! here are some general notes regarding nmap:
- `nmap -sn <range>` -> discover live hosts (other active things). ping sweep.
- `nmap <target ip>` -> scan the 1000 most common ports
- `nmap -p- <target ip>` -> scan all 65,535 ports
- `nmap -sv -sc <target ip>` -> get service versions
    - `nmap -sv <target ip>` -> get banner information for some service
- `nmap -O <target ip>` -> get os version of target
- `nmap -a <target ip>` -> aggressive scan. get os, version detection, script scanning, and traceroute
- `nmap -ss <target ip>` -> stealth syn scan
- `nmap -su <target ip>` -> scan for open udp ports (as opposed to tcp)
- `nmap -ox output.xml <target ip>` -> save scan result
- `-sI <address>` -> spoof some address

# timing templates
- `-t0` -> paranoid, super slow and stealthy
- `-t1` -> sneaky
- `-t2` -> polite, gives more prio to device limitations 
- `-t3` -> normal
- `-t4` -> aggressive. generally recommended if you have a connection faster than dial up.
- `-t5` -> insane, fastest scan timing. you'll miss shit and you'll be caught.

# going from domain to scanning
- `whois -h whois.arin.net n [service]` -> gets a range of IPs to scan
- ping the web server for latency est.
- `dig @dns-nameserver webserver.com. any` dig through DNS records 

# tricks and notes
- `-sL <addr>` -> finds reverse DNS entries that resolve to some address
- `-sS` -> SYN scan. this is the default, but it's ok to mention explicitly. 
- `-p-` -> requests Nmap scans every port from 1-65535
- `-PS22,80,113,33334 -PA80,113,21000 -PU19000 -PE` -> sends TCP syn to 22,80,113,33334, TCP ack to 80,113,21000, UDP to 19000, and ICMP echo.
- `-A` -> advanced and aggressive form. equivalent to `-sV -sC -O --traceroute`
- `oA` -> output things 
- 12.34.56.78/24 could instead be specified as 6.209.24.0-255
- IANA specifies official ports, but this isn't always followed.
- some nmap tools: [unspecific.com/nmap/](http://www.unspecific.com/nmap/)
- `-p80` -> looking for web ports only
- host enumeration -> the process of identifying all hosts on a network
- running `nmap -sS -PS80 -iR 0 -p 80` is kinda cute for locating random servers
- `host -t ns [domain.com]` -> gets the name servers serving the domain
- `-sP` -> *only* perform a ping scan. no further testing whatsoever.
- `-PS<port list>` -> TCP SYN Ping (`-PA` is ack, `-PU<list>` is UDP)
- `--source-port <portnum>` -> sets a constant source port. helps with rule checking shit.
- `oA,oN, oG, oX` are output options. 
- `host -t ns [domain.com]` -> gets the name servers for 
- `--reason` -> indicates what exactly the probe responded to
- for UDP ports, you want to try to target 53 (DNS port) and some arbitrarily high numbered port (e.g., 34444) to target shit firewalls with bad range proofs.
- a set of ping options that'll catch the vaaast number of hosts: `-PE -PA -PS21,23,23,25,80,113,31339 -PA80,113,443,10042`, and adding in `--source-port 53` migth also work.
- by default, nmap just scans and classifies the 1000 most commonly used TCP ports on the target
- ports are a software abstraction. 
- `-6` - IPv6 scanning!
- `nmap -p80 -oG logs 10.110.150.125/24` -> scan network for open web ports, and put that shit in a nice file, "logs," which is searchable by grep 
- a faster version of the above which optimizes reverse DNS resolution: `nmap -T4 -PN -p80 --max-rtt-timeout 200ms --initial-rtt-timeout 150ms --min-hostgroup 512ms -oGlogs 216.163.128.0/20`
    - in order to watch logs, we can run `watch -n 5 "cat logs | grep -E 'open'"`
- `-sO` - determines which IP protocols are supported by target machines. not necessarily a port scan...
- `-sC` -> run default scripts
- `--script=<script name>|<script category>|<ScriptDir>` run individual or group of scripts
- `--script-args=<Name1=Value1...>`
- `nmap --script dns-zone-transfer.nse --script-args dns-zone-transfer.domain=<domain> -p53 <hosts>` -> attempt pull DNS zone fule
- `nmap --script http-robots.txt <hosts>`
- `-oN` -> standard nmap output
- `--reason` -> nmap reason why it thinks port is open, closed, filtered, etc

# Script that are useful:
- `auth` -> utilize credentials or bypass authentication on target hosts
- `broadcast` -> discover hosts not included on command line by broadcasting to local network
- `brute` -> attempt to guess passwords for different protocols, including `http, SNMP, IAX, MySQL, VNC`
- `default` -> things that are automatically ran when `-sC` and `-A` are used
- `discovery` -> try to learn more info about target hosts via `SNMP`, directory services, etc
- `dos` -> may cause dos conditions
- `exploit `-> attempt to exploit target systems
- `external` -> interact with third party systems
- `fuzzer` -> send unexpected input in network protocol fields
- `intrusive` -> may crash target, consume excessive resources, or otherwise impact machine
- `malware` -> look for signs of malware infection
- `safe` -> don't impact target system
- `version` -> get versions
- `vuln` -> measure whether systems have a known vulnerability

