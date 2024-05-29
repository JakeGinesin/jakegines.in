CCDC -> Collegiate Cyber Defense Competition

This post details my experience competing in the Northeast Regional CCDC ([NECCDC](https://neccdl.org/neccdc/)) and the National CCDC ([NCCDC](https://www.nationalccdc.org/)) competitions. This was a bomb and mega formative experience, and this post has been a long time in the making.

# What is the Collegiate Cyber Defense Competition?
In short, a team of 8 college students are set up in a modeled corporate environment with Linux and Windows machines running various services. Some *professional* red teamers attack the network, and the team defends the network while completing "injects" - random surprise tasks such as writing a report, changing a service, setting up a fileshare, etc. Points are earned by keeping services up and completing injects.

The competition is long and grueling: 8 hours a day, for two days. There are 10 total regions spanning across the US, and the winner of each regional competition advances to nationals. [My team](https://nuccdc.club/) is apart of the Northeast region.

# Northeast Regional
We competed in a qualifier in late February, and regionals towards the end of March. We competed against 24 teams in the qualifier, and against 9 teams in regionals.

The network we had to defend at regionals was pretty interesting: we had various Kubernetes services, various services on a windows domain, a PLC, and FreeIPA. I was on the Linux team; I managed a bunch of Kubernetes services and floated around all the Linux boxes. I kept sessions on all machines via tmux, profusely monitored logs, services, and `who -a`, and ran [LinPEAS](https://github.com/peass-ng/PEASS-ng/tree/master/linPEAS) and `nmap --script=vuln` over and over. We did a pretty kick ass job locking down the Linux machines, and for the most part we kept the red team out, modulo a few mistakes... 

One of the services I was managing, Nextcloud, ended up going down in the last hour. Turns out Docker for some reason had a *remote exec* service running, allowing the red team to access the Docker image hosting Postgresql, use the default password, and drop the tables. I did go into the Postgresql Docker container and change the passwords, but the red team had a persistent session that was created before this. Should have restarted Postgresql first.

Then, just ~40 minutes before the competition was over, the red team got into our AWS instance via an attack chain starting with the same docker remote exec attack vector. Then, they wiped our entire infrastructure. Lol.

Somehow, we racked in enough points from the injects and services to eek out the win! Onto nationals!

[[regionals]](/media/ccdc-regionals.png)

# Nationals
CCDC Nationals is a huuge deal. Instead of 8 red teamers for all 10 blue teams like at regionals, at nationals 3 red teamers are assigned to *each team*. The network teams defend at nationals is pretty beefy: lots more Linux boxes, more windows domains, and many more services. A big step up from Northeast regionals.

The red teams at nationals are also much more powerful and sophisticated; our coach described them to us as "genuinely a nation-state level threat." My teammates who previously competed in CCDC nationals described horror stories of tracing polymorphic malware that injected itself into systemd services. They told me red team has highly sophisticated scripts to instantly probe, compromise, and install persistence on our machines within 30 seconds of the competition starting. I was told red team *will* get in, and shit *will* hit the fan. Needless to say, I was horrified.

[[regionals]](/media/ccdc-horror.png)

Each team is allowed to prepare scripts to be publicized and used during the competition. I prepared to fight tooth and nail to maintain access to our Linux systems. Expecting the absolute worst, I wrote an [ICMP Backdoor](https://github.com/JakeGinesin/icmp-backdoor), a [LKM Rootkit](https://github.com/JakeGinesin/j-rootkit), a [sophisticated honeypot](https://github.com/JakeGinesin/tunnelbees), and various other tools to ensure we never lost access to our boxes. I figured if we lost access to machines hosting the firewall or EXSI (our network virtualiztion software), it's just game over for us. I even included [Diamorphine](https://github.com/m0nad/Diamorphine) in our tools repo. I will be real, going into the competition I was expecting the absolute worst.

My team designated me to manage the network firewall(s), and in competition I ended up managing a Palo Alto firewall and a Cisco firewall simultaneously. This was a bit unexpected: I thought I'd be put on a few Linux machines, but the competition network had a surprisingly few number of Linux boxes. Nevertheless, the dual firewall management proved to be extraordinarily difficult. My entire team was routed through the firewall, and so mistakes on my end could mean my teammates would be sitting idle until I fixed my mistakes. And boy let me tell you: I made so many mistakes. The competition had a few Palo Alto Networks and Cisco staff on-site to help with issues during the competition, and I was constantly running down the halls to the organizers' room to ask them questions. By the end of the 16 hour competition I had entirely segmented the network and instituted all kinds of rules. I blocked hundreds of IPs. Words cannot describe how draining this was.

[[regionals]](/media/ccdc-n1.jpeg)
[[regionals]](/media/ccdc-n2.png)

Besides a certain large-scale incident on my end with the firewall, our network and services had a lot less downtime than I initially expected. Surprisingly, we had no major compromises. The only real damage was self-inflicted. We never had to fight over any boxes; whenever we noticed a compromise or anything off about our machines, we just insta-reset the box to a previous snapshot with EXSI.

# Post-Comp and Lessons Learned
At the dinner after the national comp, our team spoke with our red-teamers, a group of security engineers from [scale](https://scale.com/). A few points of interest from that conversation:

- the red team tried to use *my tools* to gain persistence on our Linux machines. Oops. They tried to compile them with the makefiles i provided, but thankfully they ran into some glibc errors? Somehow, they didn't notice I provided statically linked binaries. Oops x2.

- my firewall-ing helped a lot! The firewall stopped almost all the C2 traffic, and they had tons of trouble pivoting to multiple machines. 

- they compromised every single Linux box, but whenever the red team made any sort of noise we just insta-reset of the box. Being silent was super hard for them, apparently


At the dinner I got a ton of recruitment swag :] I also talked to [Alex Levonson](https://alexlevinson.wordpress.com/) about his insane Linux persistence techniques. He was the guy who authored the aforementioned polymorphic malware.

At the rewards ceremony the captain of the red team, [Dave Cowen](https://www.crai.com/our-people/david-cowen/), gave a sick address. Interestingly, during the presentation he said something along the lines of, "yeah, the [blue] teams this year had very sophisticated scripts and tools that we [the red team] adapted to and used. We didn't know how to elevate a sudo shell without tty until we saw the blue team tools for this year..." 

Uh oh. I spent a ton of time writing a nice guide on how to get full tty on a sudo shell in my [ICMP backdoor](https://github.com/JakeGinesin/icmp-backdoor). The red team totally used that to their advantage. Shit.

Some lessons for next year:

- Obviously, don't mess up the firewall. I could have definitely done much better there

- I prepared a bunch of battle-ready persistence tools that we didn't end up using for a few reasons. (1), we did a great job securing the Linux boxes and never had to battle it out over a system; (2), whenever a machine was compromised we just reset it to a snapshot with EXSI; and (3), the tools were slightly nontrivial to set up and use, making it hard for my teammates to deploy them mid-competition

- red team *will* study our scripts and adapt their tools around them. It's best to ensure scripts are sufficiently obscured

- Don't include tools in the repos that can be of help to red team, lol

- We should ensure the tools we *do* include are very ergonomic and easy to use and deploy


We ended up coming in 7th out of 10 teams, which is okay. The teams at nationals spent much more time, comparatively, preparing for the competition. I specialize in math and computer science theory, after all. Either way, I learned a ton and I'm looking forward to next year!

:wq
