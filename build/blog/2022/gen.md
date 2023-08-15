gen -> Static Website Generation

I restructured the backend of this website to feature a *self-built* [static HTML generator](https://www.cloudflare.com/learning/performance/static-site-generator/) and markdown parser, in addition to many other small changes. I did this not just to increase performance, but to ensure my website is [designed to last](https://web.archive.org/web/20220625161623/https://jeffhuang.com/designed_to_last/) and sufficiently [rugged](https://ruggedsoftware.org/). I eliminated many moving parts from my website stack—on top of now serving static content, I dropped MongoDB, many npm libraries, and all external APIs from my stack. In this post I'm going to briefly explain my static HTML generation system.

### Static HTML generator
A static HTML generator is a tool that generates HTML pages from raw data. Prebuilt tools exist to do this: *Next.js*, *Hugo*, *Gatsby*, and *Jekyll* are some examples. I've tried these tools out, and they're not for me. Too much bloat and not enough low-level control. So, I built my own. 

My initial file setup is something like this:
```
.
|-- raw
     |-- item1.html
     |-- item2.md
|-- templates
     |-- item_template.html
```

I want my static HTML generator to generate this:
```
.
|-- serve
     |-- item1.html
     |-- item2.html
```

Everything's in one python file - `build.py` - which is invoked through a script in my `package.json` file as shown below:
```
"main": "main.js",
"scripts": {
	"start": "python3 build.py && node main.js"
},
```

The formatting for the template files is the following:
```html=
HTML content
{{Data}}
HTML content
```

### Build Script
The code behind `build.py` is actually quite simple. Pseudocode below:
```python=
open template, item, out:
	if item is html : move file to serve
	elif item is md:
		for line in template:
			if "{{Data}}" in line : out.write(interpret(item))
			else : out.write(line)
```

### Interpreter
The interpreter is pretty simple as well—all I'm doing is looping through each line and using regular expressions to filter and replace markdown patterns with HTML. Pseudocode below:
```python=
def interpret(markdown):
	lines, out = all lines in markdown, ""
	for line in lines:
		if re.findall(case 1, line) is not None:
			out += formatted html
		elif re.findall(case 2, line) is not None:
			out += formatted html
	
	return out
```

### Implementation
The source code for my full implementation is on [hosted on Github](https://github.com/JakeGinesin/jakegines.in).

