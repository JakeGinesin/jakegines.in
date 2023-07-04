RSS stands for RDF Site Summary or Really Simle Syndication, and it's a distributed web feed that allows users and applications to access updates to websites in a standardized, computer-readable format.

A user can subscribe to a website's RSS "feed", allowing the user to keep track of the latest updates and new content. Therefore, news aggregators titled "RSS readers" allows the user to keep track of many different websites' updates without needing to manually check them.

### Format
RSS is XML-formatted plain text. The RSS format itself is easy to read both by automated processes and humans. Here's an example:
  
```
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>RSS Title</title>
  <link>http://www.example.com/main.html</link>
  <pubDate>Sun, 06 Sep 2009 16:20:00 +0000</pubDate>

  <item>
    <title>Example Entry</title>
    <description>A brief description</description>
    <link>http://www.example.com/blog/post/1</link>
    <pubDate>Sun, 06 Sep 2009 16:20:00 +0000</pubDate>
  </item>
</channel>
</rss>
```

### References
[1] "RSS", [wikipedia.org](https://en.wikipedia.org/wiki/RSS)
[2] "It's time for an RSS Revival" - Wired, [wired.com](https://www.wired.com/story/rss-readers-feedly-inoreader-old-reader/)
