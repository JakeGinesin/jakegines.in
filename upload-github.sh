#!/bin/bash

dir="/home/synchronous/code/jakeginesin-site-github/"

for item in "$dir"*; do
    base_item=$(basename "$item")
    if [[ ! $base_item =~ ^(.git|.buildpacks|.gitignore)$ ]]; then
        rm -rvf "$item"
    fi
done

#rm -v !(".git"|".buildpacks"|".gitignore") -r /home/synchronous/code/jakeginesin-site-github/*
cp /home/synchronous/code/jake_dark_site/build.py /home/synchronous/code/jakeginesin-site-github
# cp /home/synchronous/code/jake_dark_site/server.js
cp -r /home/synchronous/code/jake_dark_site/routes /home/synchronous/code/jakeginesin-site-github
cp -r /home/synchronous/code/jake_dark_site/templates /home/synchronous/code/jakeginesin-site-github
cp /home/synchronous/code/jake_dark_site/README-prod.md /home/synchronous/code/jakeginesin-site-github/README.md
mkdir /home/synchronous/code/jakeginesin-site-github/public
cp -r /home/synchronous/code/jake_dark_site/public/pages /home/synchronous/code/jakeginesin-site-github/public 
cp /home/synchronous/code/jake_dark_site/package.json /home/synchronous/code/jakeginesin-site-github
cp -r /home/synchronous/code/jake_dark_site/build /home/synchronous/code/jakeginesin-site-github

dt=$(date +"%D %T")
lol="site update pushed: ${dt}"

git --git-dir /home/synchronous/code/jakeginesin-site-github/.git add .
git --git-dir /home/synchronous/code/jakeginesin-site-github/.git commit -am "$lol" 
git --git-dir /home/synchronous/code/jakeginesin-site-github/.git push --set-upstream origin master


