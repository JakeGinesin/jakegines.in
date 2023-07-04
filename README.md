# jakegines.in

Jake's dark theme website. This website notably features a static webpage generation system as to streamline the process between writing and pushing new content here.

# Static Generation

The static site generation is structured as follows:

data folder:
```
.
| 
---about.md
---resources.md
--wiki
    |---file1.md
    |---file2.md
    |---file3.html
--blog
    |--folder 1
             |---data.json
             |---config.yaml
             |---content1.md
             |---content2.md
             |---content3.html
    |--folder 2
             |---data.json
             |---config.yaml
             |---content1.md
             |---content2.html
```

outputted public folder:
```
.
| 
---sitemap.txt
-- assets
-- media
       |
       |---(generated) pic1.png
       |---(generated) vid1.mp4
-- books
-- css
-- fonts
-- js
-- pages 
      |
      |---(generated) about.html
      |---(generated) wiki/braindump.html
      |---(generated) blog.html
      |---(generated) resources.html
      |--(generated) wiki/braindump
                                 |---file1.html
                                 |---file2.html
                                 |---file3.html
      |--(generated) blogs
                        |--folder 1
                                 |---index.html
                                 |---content1.html
                                 |---content2.html
                                 |---content3.html
                        |--folder 2
                                 |---index.html
                                 |---content1.html
                                 |---content2.html
```

format of config.yaml:
```
name: <name>
color: <hexcode of color>
order: <order>
icon: <icon>
```

format of data.json
```
{
    "blogs": [
        "year":
            [
            "blog (3 char name)": {
                "3-char-name": "",
                "full-title": "",
                "publication-timestamp": ""
                "url": ""
                }
            ]
    ]
}
```

