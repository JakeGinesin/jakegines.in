SSH stands for "secure shell." It's a cryptographic networking protocol used for operating network services over an unsecured network. 

### Troubleshooting Bad Character Input In Host
Running the command `stty -a` in the remote host will find what character codes are to be expected by the server from the given keying client. Pressing `Ctrl` `v` then pressing your given key will write the character codes recieved by the server. 

If your character codes are the same as the codes displayed using `stty -a`, the way to restore key functionality is ti produce your client's terminal's terminfo file using `infocmp > terminfo`. Copy `terminfo` to the server using `scp`, then from the server run `tic terminfo` in order to install your terminal's terminfo to the server. After a restart, the error should be gone. 

### Sources
1. [Secure Shell Wikipedia Page](https://en.wikipedia.org/wiki/Secure_Shell)
2. [Serverfault Message Board Discussion](https://serverfault.com/questions/90041/backspace-does-not-work-on-my-ssh-client)
