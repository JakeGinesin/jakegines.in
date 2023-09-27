In a world seemingly full of distactions, focusing on my work can be hard at times. Here are a few tricks I use to help myself focus - hopefully, they can help you too.

### Pomodoro
I structure my work sessions in intervals: 25 minutes of work, then a 5 minute break. This is called the [pomodoro technique](https://en.wikipedia.org/wiki/Pomodoro_Technique), and I've been using it for a while. I use a [computer-based timer](https://gnomepomodoro.org/), which integrates nicely with the rest of my workflow. 

When I begin a pomodoro 25-minute work session, I have a bash script to create a small popup so I can record my objective:
```
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
session_goal=$(echo "" | rofi -dmenu -p "session goal:")
echo "[$timestamp] - $session_goal" >> track.txt
```

I then use another script to kill and remove execution access rights to discord, signal, and whatsapp, as well as to change the hostname-IP mappings for distracting websites to `127.0.0.1` to keep me from accessing them.
```
chmod -x /usr/bin/discord
chmod -x /usr/bin/signal-desktop
chmod -x /usr/bin/whatsdesk

pkill -f discord
pkill -f whatsdesk
pkill -f signal

websites=("www.youtube.com" "youtube.com")

# Loop over array and add each website to /etc/hosts file
for website in ${websites[@]}; do
    echo "127.0.0.1 $website" | tee -a /etc/hosts > /dev/null
done

systemctl restart systemd-hostnamed
```

Once my 25 minute session is over and my break begins (or, I decide to end my work early), a script to restore everything runs:
```
chmod +x /usr/bin/discord
chmod +x /usr/bin/signal-desktop
chmod +x /usr/bin/whatsdesk

websites=("www.youtube.com" "youtube.com")

tempHosts=$(mktemp)

for website in ${websites[@]}; do
    grep -v "$website" /etc/hosts > "$tempHosts"
    mv "$tempHosts" /etc/hosts
done

systemctl restart systemd-hostnamed
```

### Phone
I keep on me a [pretty minimal phone](/blog/2023/dumb-phone), which is great for minimizing distractions while working. It runs a minimal android laucher, and only has a few select applications. 

### Music
I love music, and I'm almost always listening to something. However, when trying to focus, I exclusively listen to music void of lyrics, mostly classical, synthwave, and lofi. If I'm listening to music with lyrics, I find it's harder to keep the music in the background so to speak - I feel my brain naturally wants to stop interpretting my work and latch onto the lyrics instead.

To ensure I'm not reliant Youtube for music, I have downloaded several long mixes. I use [cmus](https://cmus.github.io/) as my primary music player, but I also like [ncmpcpp](https://github.com/ncmpcpp/ncmpcpp).
