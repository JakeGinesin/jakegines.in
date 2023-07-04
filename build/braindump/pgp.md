Pretty Good Privacy (PGP) is an encryption program that is used for signing, encrypting, and decrypting texts, emails, files, and the likes. It's powerful and widespread. 

### Setup
After installing gpg, run:
```
gpg --gen-key
```
The first key is your private or 'secret' key. Keep this key safe. Don't share it with anyone. The second key is your public key, which you should make public and share with as many people as you can.

My public PGP key is [here](/pgp)

### But how can I use PGP?
Your public key can be used to encrypt messages. Your private key can then be used to decrypt those messages. Very simple. Very effective.

This system can be used for another party to securely send messages or files to you.

```
# List public keys
gpg --list-keys

# Import to keyring
gpg --import someone.asc

# Export someone's key
gpg --export --armor > file

# Encrypts a file for a recipient
gpg --encrypt --recipient email@site.com file.txt

# Encrypts and signs the message with author's private key
gpg --encrypt --sign --recipient lasemi@nogmail.com file.txt

# Decrypt
gpg --decrypt file.gpg
```

### Further Reading
• "Signing PGP Keys", [carouth.com](https://carouth.com/articles/signing-pgp-keys/)
• "How To Use GPG to Encrypt and Sign Messages", [fedingo.com](https://fedingo.com/how-to-verify-pgp-signature-of-downloaded-software-in-linux/)
• "Key Signing Party", [Wikipedia.org](https://en.wikipedia.org/wiki/Key_signing_party)
• "PGP Web of Trust: Core Concepts Behind Trusted Communication" - Konstantin Ryabitsev, [Linux.com](https://www.linux.com/training-tutorials/pgp-web-trust-core-concepts-behind-trusted-communication/)
• "Asymmetric Algorithms", [Cryptography.io](https://cryptography.io/en/latest/hazmat/primitives/asymmetric/index.html)

### References
[1] "Difference between PGP and GPG", [askbuntu.com](https://askubuntu.com/questions/186805/difference-between-pgp-and-gpg/186814#186814)
[2] "How to Verify PGP Signature of Downloaded Software in Linux", [Digitalocean.com](https://www.digitalocean.com/community/tutorials/how-to-use-gpg-to-encrypt-and-sign-messages-on-an-ubuntu-12-04-vps)
