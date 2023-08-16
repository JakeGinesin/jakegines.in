With university and all, I've been feeling the pressure to up my game professionally. So, I've created a *c o o l* virtual business card. To see it, simply type the following command into your command line:
```
curl https://jakegines.in/card
```
*curl comes with most linux distributions, windows versions, and macOS versions. you probably have it.*

If you did it correctly, you'll see this:
```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│    |       _____                _____                         |    │
│   /       (, /     /)         /         ,              ,       \   │
│  |          /  _  (/_   _    /   ___     __    _  _      __     |  │
│  |      ___/__(_(_/(___(/_  /     / ) _(_/ (__(/_/_)__(_/ (_    |  │
│  |    /   /                (____ /                              |  │
│   \  (__ /                                                     /   │
│    |         A CS Student At Northeastern University          |    │
│                                                                    │
│    hello@jakegines.in                            make mistakes     │
│      https://jakegines.in                   pls use unix           │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Setup 
This is pretty simple to set up since curl, by default, spits out inputted website's served HTML contents. So, all you'll need to do is fill the HTML page you wish to serve with your business card contents.

If your website uses a backend, you can choose to serve only curl user-agents:

```js=
app.get('/card', (req, res) => {
  if (req.headers['user-agent'].includes('curl')){
    res.sendFile(path.join(__dirname, 'public', 'card.html'));
  }
});
```

*idea inspired by Tom on the Internet*
