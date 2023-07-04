cURL stands for client URL. cURL is a commandline utility used for interacting with various network protocols. It's incredibly powerful, and very useful in a lot of circumstances.

cURL supports HTTPS and performs SSL certificate verification by default. It will also ensure CA certs sent by web servers are valid.

### Basic Usage
The most basic use of cURL is below:

```
$ curl www.example.com
```

cURL defaults to displaying the output it recieves in the terminal window the command is called in. On most systems, the command above will display the www.example.html source-code.

### Outpitting to a file
The -o flag can be used to store the output in a file instead:

```
$ curl -o site.html www.example.com
```

### Further Reading
• [curl.se](https://github.com/curl/curl)
• [cURL man page](https://curl.se/docs/manpage.html)
• [Example Commands](https://www.hostinger.com/tutorials/curl-command-with-examples-linux/)
• [cURL Github Repo](https://github.com/curl/curl)

