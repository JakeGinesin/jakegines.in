phn -> dumb phone

I use a samsung xcover 4s, a budget smartphone from 2019, as my daily driver. It's rooted, runs firmware I doctored myself, and runs unlauncher. In this post, I'll discuss (1), my motivation for using this phone, and (2), some technical details of the phone itself.  

### Minimalism 
There's a fantastic book, "Digital Minimalism," by Cal Newport. Some of the main ideas of the book are living your life *intentionally*, just how bad social media can be for your brain, and how to properly curate your technology such that it doesn't become a distraction. 

The latter point is particularly significant to me. I obsessively [optimize my main computer](https://github.com/JakeGinesin/dotfiles), and I thought I should give my phone, an equally important piece of technology in my life, some more thought. I asked myself, what do I seriously *need* my phone for? 

- being reachable by friends and family
- listening to music
- checking my calendar
- two factor authentication
- ... seriously, what else?

I have a seriously awesome computing setup, which can do many of the things my phone used to do, but better. So, I got a phone to better fit my (clearly minimal) needs.

### Dumbphone journey
My first dumb phone was the Unihertz Jelly 2, a tiny phone running Android 11 that was just $120. This phone was awesome... for the 7 months it was alive. I didn't realize the [power button is not very durable](https://www.reddit.com/r/UnihertzJelly2/comments/rxa238/power_button_malfunction/) until it was too late. It didn't help the phone is practically impossible to repair on your own due to the compact build (although, props to the manufacturer for shipping [cheap replacement parts](https://www.unihertz.com/products/replacement-parts-for-jelly-2)). 

After this, I gave the Schok Classic a shot. This was my first flip phone, and I found it incredibly hard to use - from the keypad to the operating system, KaiOS, it wasn't as *usable* as I would have liked for the needs I've outlined.  

[[jelly and sho]](/media/jelly_schok.jpg)

So, I outlined some *wants* in a dumb-phone:
- durable & repairable
- semi-usable
- rootable
- usb-c (as to have the same charger as the rest of my tech)

### Arriving at the xcover 4s
I found the xcover 4s when searching for phones with both a removable battery and usb-c - specifically, I found this [reddit post](https://www.reddit.com/r/lgv20/comments/c0k254/samsung_xcover_4s_the_only_phone_with_both/) shitting on it. Some dude says, "So samsung made a new 2019 $300 phone, labeled it rugged, but its worse in every statistical way than an LG v20 that was released 3.5 years earlier? WTF." 

[[Jake's Phone]](/media/4s.jpg)

*It's 70$ for a new one of these today off ebay. Excuse me!?*

You're telling me a phone that has...
- usb-c 
- a removable battery
- dual sim & expandable storage
- *physical buttons* and a *rugged build*
- a headphone jack & bluetooth
- GPS
- a battery designed to last days
- an IP68 rating
- hotspot support
- ongoing support from samsung 
- an active modding community

.. is just *70$!?* Sure, the phone has a low-tier CPU, only 3GB of RAM, a low-resolution screen, not a great camera, and not much built in storage. But, I'm not using this phone to take pictures, play games, run lots of programs, or do anything super intensive whatsoever. It's perfect for my use case. 

To ensure the minimality, I use Unlauncher as my Android launcher, which looks like this:

[[Jake's Phone w/ unlauncher]](/media/4s_unlauncher.jpg)

### About Firmware, Rooting, and Optimization
I won't get into the fine details of how I modified the firmware, as I'm not sure of the legality of doing so. Email me if you're curious about the details. At a high level, I used existing tools to extract and decompile the firmware, then made my modifications. Then, I just repacked everything. Knox, Samsung's pre-installed proprietary firmware security software, surprisingly didn't yell at me for this.

For xcover 4s-specific rooting advice, use this [xda-developers thread](https://forum.xda-developers.com/t/how-to-root-samsung-galaxy-x-cover-4s-enterprise-edition-sm-g398f.3948620/). 

Using root access, I trimmed my phone of as many unnecessary applications and processes as possible. Using the phone as an ssh server, running a hotspot, ssh-ing into the phone with my laptop, and running `top` yields the following process spread:  

[[Processes]](/media/4s_processes.png)

*note, I was running Signal and the SSH-server hosting software. org.thoughtcrime.securesms is Signal's main protocol process. How based.*
