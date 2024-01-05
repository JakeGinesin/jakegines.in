CCDC: National Collegiate Cyber Defense Competition. 

# Links & Resources
- Competition site: [nationalccdc.org/](https://www.nationalccdc.org/)
- [nuccdc.club/](https://nuccdc.club/)
- (see federico's CCDC doc)
- [github.com/carlospolop/PEASS-ng/tree/master/linPEAS](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS)

# Club Tools
I think CCDC makes it policy so security tools clubs build should be public. See the links below.
- [github.com/BYU-CCDC/public-ccdc-resources](https://github.com/BYU-CCDC/public-ccdc-resources)
- [github.com/s00p123/resource-repo/](https://github.com/s00p123/resource-repo/)
- [github.com/cpp-cyber/blue](https://github.com/cpp-cyber/blue)
- [github.com/nuccdc/tools](https://github.com/nuccdc/tools)
- [github.com/UCI-CCDC](https://github.com/UCI-CCDC)
- [github.com/ucrcyberI](https://github.com/ucrcyberI)

# Windows tools
- autoruns - see where things are holding persistence. see what is triggered on startup!
- process explorer - task manager on drugs
- process monitor (procmon)
- registry capture tool
- windows event log

# Windows Malware Things
- Windows edr : endpoint detection and response
- Look at command line arguments for trusted things
- Don't trust any process! no way!
- Purple: encrypted in memory
- Change the name of the thing you're trying to process
- Run autorun as admin before you do anything
    - see whether something is verified (sig is signed by microsoft)
    - options->scan options
    - use virustotal and sees which binaries are sus
- run process monitor
    - don't suspend windows processes! don't suspend login, etc.
    - python.exe is suspicious! 
        - python itself is verified, so it'll show up
        - don't kill, but suspend the python process. any sort of persistence will check to see if the process is still running
    - powershell sessions... command line, all suspicious 
    - just run virustotal off the bat. make sure to check off unknown executables
    - red -> process killed, green->process started, purple->"packed" (running with memory that is compressed)
- TCpview : looks at connections
    - should be binaries associated w connection
- multilevel persistence 
- check temp on windows for persistence 
    - %tmp%

# Linux 
- /etc/pam.d/ -> rigorous permissions. check this! more powerful than sudoers file. need a tool to edit something safely.
- /var/spool/
- put ! in front of things in /etc/shadow to disable account

