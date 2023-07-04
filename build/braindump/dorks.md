"Dorking" is a technique that involves issuing specific commands into a given search engine to discover vulnerable applications or to harvest data. 

### Google Dorks
Google, being the most popular search engine, is the most well-known type of dorking. Use [Google search operators](https://static.semrush.com/blog/uploads/files/39/12/39121580a18160d3587274faed6323e2.pdf) to do so.

Some cool examples:

```
inurl:"ViewerFrame?Mode=" 
```
^ This will find public webcams. 

```
db_password filetype:env
```
^ .env files define environment variables. These files aren't meant to be public, and here we're taking advantage of that by searching public indexed .env files passwords.

```
intitle:"index of" "contacts.txt"
```
^ "index of" in a page's title indicates a directory. Here, we're searching for "contacts.txt" within those public directories.

```
intitle:HP LASERJET PRO MFP inurl:/SSI/index.htm
```
^ This searches for indexed pages that manage HP's laserjet pro printers. If you're feeling particularly brave, the default user/password is "admin" & "password" ;)

### Shodan
While google is a general search engine, Shodan is a search engine explicitly for internet-connected devices. Shodan makes dorking incredibly powerful, as it makes finding potentially vulnerable devices almost trivial.

### Further Reading
• "Top 40 Shodan Dorks", [https://securitytrails.com/](https://securitytrails.com/blog/top-shodan-dorks)
• "Google Hacking Database", [explot-db.com](https://www.exploit-db.com/google-hacking-database?)
• "Google Advanced Search Operators", [ahrefs.com](https://ahrefs.com/blog/google-advanced-search-operators/)
	
