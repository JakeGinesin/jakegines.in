A "playbook" for CTF purposes

# Pipeline
- Listen to things -> Map things with ping scans -> figure out what is running what service -> figure out some attack vector based on scanning, etc -> gain access to a machine -> get some sessions -> escalation -> persistence -> find other hosts, continue mapping

## Network Mapping
See nmap.md for more details.

First, we want to find our IP address: `ip addr show`. You already know how to interpret network controllers. Find your IP address. If your IP address has a `/16` you're on a bigger network, and `/24` if you're on a smaller network.

To do more broad network discovery, run:
- `nmap -sn 192.168.0.0/16`
- If smaller, run `nmap -sn 192.168.100`
- `netdiscover` also nice for listening

To do discovery via an arp scan, do:
- `sudo arp-scan -l` -> scan all IP addresses on the local subnet
- `sudo arp-scan 192.168.1.0/24` -> try a different subnet
- `sudo arp-scan -lq` -> see only live hosts and not any error msg stats
- `sudo arp-scan -I eth0 -l` -> scan with your desired network interface

Now, we have some IP addresses to play with! Here are some general notes regarding nmap:
- `nmap -sn <range>` -> discover live hosts (other active things). ping sweep.
- `nmap <target IP>` -> scan the 1000 most common ports
- `nmap -p- <target IP>` -> scan all 65,535 ports
- `nmap -sV -sC <target IP>` -> get service versions
    - `nmap -sV <target IP>` -> get banner information for some service
- `nmap -O <target IP>` -> get OS version of target
- `nmap -A <target IP>` -> aggressive scan. get OS, version detection, script scanning, and traceroute
- `nmap -sS <target IP>` -> stealth SYN scan
- `nmap -sU <target IP>` -> scan for open UDP ports (as opposed to TCP)
- `nmap -oX output.xml <target IP>` -> save scan result

Timing templates:
- `-T0` -> paranoid, super slow and stealthy
- `-T1` -> sneaky
- `-T2` -> polite, gives more prio to device limitations 
- `-T3` -> normal
- `-T4` -> aggressive, fast and dirty but you might miss some shit
- `-T5` -> insane, fastest scan timing. you'll miss shit and you'll be caught.

Classical ports:
- 21 -> FTP -> TCP -> Transfer files
- 22 -> SSH -> TCP/UDP -> Secure Shell
- 23 -> Telnet -> TCP/UDP -> Remote administration (depreciated)
- 21 FTP TCP FTPS, 989/990 Transfer Files from host to host
- 22 SSH TCP/UDP Secure Shell Connection
- 23 Telnet TCP/UDP Remote administration (deprecated)
- 25 SMTP TCP SMTP w/ TLS, 465/587 Sends Email
- 49 TACACS+ TCP Remote Authentication
- 53 DNS TCP/UDP DNSSEC Hostname to IP resolution
- 69 TFTP UDP Basic version of FTP
- 80 HTTP TCP HTTPS, 443 Transmit web page data
- 88 Kerberos TCP/UDP Network Authentication using tickets
- 110 POP3 TCP POP3 w/ TLS, 995 Receives Email
- 119 NNTP TCP Transport Usenet Articles
- 135 RPC TCP/UDP Locate DCOM ports
- 137-139 NetBIOS TCP/UDP Name quering, sending data, NetBIOS connection
- 143 IMAP TCP IMAP4 w/ TLS, 993 Email retrieval
- 161 SNMP UDP Remote network device monitoring
- 162 SNMPTRAP TCP/UDP Traps/InformRequests sent to SNMP manager
- 389 LDAP TCP/UDP LDAP w/ TLS, 636 Maintain user and other object directory
- 445 SMB TCP Shared access to files and resources
- 514 Syslog UDP Syslog w/ TLS, 6514 Computer message logging
- 860 iSCSI TCP IP based protocol for linking data storage facilities
- 1433 Ms-sql-s TCP Opens MS SQL server queries
- 1701 L2TP UDP VPN protocol with no security, used with IPsec
- 1723 PPTP TCP/UDP VPN protocol with security
- 1812/1813 RADIUS UDP AAA protocol for authentication, authorization and accounting
- 3225 FCIP TCP/UDP Encapsulate Fibre channel frames
- 3389 RDP TCP/UDP Remote Desktop Protocol for Windows
- 3868 Diameter TCP AAA protocol that can replace RADIUS

You can confirm individual connection things with netcat:
- `nc -v <IP> <PORT>` -  

Things you might run into when scanning:
- `tcpwrapped` -> completed a full connection. likely a firewall. Try slowing thespeed, using `-T2`. Don't use `-A`, but `-sV`. Or, drill down on the specific packet type.

Some other useful tools for further enumeration:
- for web servers, use dirb, nikto, gobuster
- for smb shares, use enum4linux
- for SNMP, use `snmpwalk` or `snmp-check`

## Using DNS...
Using DNS, we can get a ton of different information on a network. First, how do we obtain what server is a DNS server?
- use nmap to see who is serving dns requests: `nmap -p 53 --open <target-range>`
- through passive observation... using wireshark etc

Once we have the IP of the server sending dns requests, we can try a few things:
- Try to get the zone info using a zone transfer: `dig axfr @<DNS-server> domain.com` (axfr is a full zone transfer, ixfr is a partial zone transfer, the difference from last requested)
- Do reverse lookup brute forcing with DNSrecon: `dnsrecon -r <ip range> -n <DNS-server>`
- check for DNSsec with `dig +dnssec domain.com`
- Use `Responder` for LLMNR, NBT-NS, and MDNS poisoning to capture credentials

## What to do now with all this info?
Okay, we found some random shit. We did some discovering. What now? Well, we really have two options... 
- first, we can *listen* to packets over the wire. this way, we can do some network analysis and whatnot. see: listen-ctf.md for more
- second, we can try to exploit shit directly. this is what this markdown bit will be focusing on.

## Nice tools

### Crackmapexec
a "swiss army knife" for pen testing networks. See: [github.com/byt3bl33d3r/CrackMapExec](https://github.com/byt3bl33d3r/CrackMapExec). 
- See the [wiki](https://www.crackmapexec.wiki/getting-started/using-credentials)

This tool is mostly used for password stuff and brute forcing. This is good for SMB (fucking windows), LDAP (directory access), WINRM, MSSQL, SSH, FTP, RDP, WMI


## Other Tools for merking shit you find
- nikto, scan web servers: [github.com/sullo/nikto](https://github.com/sullo/nikto)
- metasploit, obviously
- pymodbus, a thing for communicating with things over the modbus protocol: [github.com/pymodbus-dev/pymodbus](https://github.com/pymodbus-dev/pymodbus)
- linuxprivchecker.py, more linux privilege escalation check scripts: [github.com/sleventyeleven/linuxprivchecker](https://github.com/sleventyeleven/linuxprivchecker)
- Linux-exploit-suggester, [github.com/The-Z-Labs/linux-exploit-suggester](https://github.com/The-Z-Labs/linux-exploit-suggester)
- Hydra, attempt to brute force ssh: [kali.org/tools/hydra/](https://www.kali.org/tools/hydra/)
- wfuzz, a web application fuzzer: [github.com/xmendez/wfuzz](https://github.com/xmendez/wfuzz)
- OWASP ZAP, a super popular web app scanner: [zaproxy.org/](https://www.zaproxy.org/)
    - a guide on how to use OWASP: [hackerone.com/knowledge-center/owasp-zap-6-key-capabilities-and-quick-tutorial](https://www.hackerone.com/knowledge-center/owasp-zap-6-key-capabilities-and-quick-tutorial)
- infoga, a tool for checking whether some email has been pwned. see: [geeksforgeeks.org/infoga-email-information-gathering-tool-in-kali-linux/#](https://www.geeksforgeeks.org/infoga-email-information-gathering-tool-in-kali-linux/#)
- enum4linux, a tool that enumerates windows machines *from* linux: [github.com/CiscoCXSecurity/enum4linux](https://github.com/CiscoCXSecurity/enum4linux)
- smbmap, a tool for SMB enumeration (a windows thing) [github.com/ShawnDEvans/smbmap](https://github.com/ShawnDEvans/smbmap)

## Priv escalation 
- Linpeas, winpeas, linenum
 
