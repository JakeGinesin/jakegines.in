if you're trying to connect to Northeastern's 8021x network with iwd, you want to: 
1. navigate to `/var/lib/iwd/`
2. create a file, `NUwave.8021x`
3. write the following content in the aformentioned file:
```
[Security]
EAP-Method=PEAP
EAP-Identity=[your username]
EAP-PEAP-Phase2-Method=MSCHAPV2
EAP-PEAP-Phase2-Identity=[your username]
EAP-PEAP-Phase2-Password=[your password]

[Settings]
AutoConnect=True
```

Your username is the first part of your email, so if you had the email "pog.gers@northeastern.edu" your username would just be "pog.gers"
