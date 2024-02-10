LKM -> Linux Kernel Module

A linux kernel module is a is a piece of code that can be loaded into the kernel on demand and can extend the functionality of the kernel whenever. 

# Basic stuff
- `lsmod` -> show loaded kernel modules
- `modinfo [module name]` -> show info about some moedule
- `modprobe -c | less` -> give whole configuration of all modules
- `modprobe --show-depends [module name]` -> list dependencies

# Rootkits
A common trait of linux rootkits is linking into the kernel module to more effectively do suspicious things. Some examples of LKM rootkits:
- [github.com/m0nad/Diamorphine](https://github.com/m0nad/Diamorphine)
- [github.com/MatthiasCr/LKM-Rootkit](https://github.com/MatthiasCr/LKM-Rootkit)

# Links
- [Detecting Kernel Rootkits](https://la-samhna.de/library/rootkits/detect.html)
- [Awesome Linux Rootkits](https://github.com/milabs/awesome-linux-rootkits)
- [Hiding Open Ports](https://xcellerator.github.io/posts/linux_rootkits_08/)
- [Linux Kernel Hacking Repo](https://github.com/xcellerator/linux_kernel_hacking/blob/master/3_RootkitTechniques/3.5_hiding_processes/rootkit.c)
- [Linux Kernel Module Programming Book](https://sysprog21.github.io/lkmpg/)
- [Arch Wiki Page](https://wiki.archlinux.org/title/Kernel_module)
