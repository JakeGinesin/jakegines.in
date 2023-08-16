import os, json, shutil, re, yaml
from datetime import date, datetime
today = date.today()

def interpret(out, md):
    f, full, fullfc = False, "", 0
    p, fullp, fullpc = False, "", 0
    for linet in md:
        line = linet
        # line dominators (exclusive)
        # headers
        if (re.search("^```$", line) is not None or f) and not p:
            if f == False:
                fullf, fullfc = "", 0
                f = True
                out.write('        <figure class="highlight" style="margin-top:10px; margin-bottom:10px; padding-top:10px; padding-bottom:10px;"><pre><code class="language-sh" data-lang="sh"><table class="rouge-table"><tbody><tr><td class="gutter gl" style="width:17px;"><pre class="lineno">')
            elif "```" in line:
                f = False
                out.write('</pre></td><td class="code"><pre>')
                fullf+="</pre></td></tr></tbody></table></code></pre></figure>"
                # fullf = fullf.replace("<", "&#60;")
                # fullf = fullf.replace(">", "&#62;")
                
                out.write(fullf)
            else:
                fullfc+=1
                line = line.replace("<", "&#60;").replace(">", "&#62;")
                fullf+="<span style='padding-right:10px;'>" + str(line) + "</span>"

        elif re.search("^```[a-zA-Z]+\=$", line) is not None or p:
            if p == False:
                fullp, fullpc = "", 0
                p = True
                out.write('        <figure class="highlight" style="margin-top:10px; margin-bottom:10px; padding-top:10px; padding-bottom:10px;"><pre><code class="language-sh" data-lang="sh"><table class="rouge-table"><tbody><tr><td class="gutter gl"><pre class="lineno">')
            elif "```" in line:
                p = False
                out.write('</pre></td><td class="code"><pre>')
                fullp+="</pre></td></tr></tbody></table></code></pre></figure>"
                # fullp = fullp.replace("<", "&#60;")
                # fullp = fullp.replace(">", "&#62;")
                out.write(fullp)
            else:
                fullpc+=1
                out.write(str(fullpc) + "\n")
                line = line.replace("<", "&#60;").replace(">", "&#62;")
                fullp+="<span style='padding-right:10px;'>" + str(line) + "</span>"

        elif re.search("^#", line) is not None:
            try:
                q = line[line.index(" ")+1:].replace("\n","")
                out.write("<h2 class='header unselectable' style='margin-top:2px; margin-bottom:8px;' id='"+q.replace(" ","")+"'>"+q+"</h2> \n")
            except:
                print(line)
        # empty lines
        elif re.search("^$", line) is not None:
            out.write("<br> \n")
        elif re.search("^``[^`]", line) is not None:
            ## replacing text blocks
            tblocks = re.findall(r"``[^`]+``|^``[^`]+``|``[^`]+``$|^``[^`]+``$", line)
            for match in tblocks:
                text = match[match.index("``")+2:match[match.index("``")+1:].index("``")+1]
                tblock = '<figure class="highlight"><pre><code class="language-text" data-lang="text">'+text+'</code></pre></figure>'
                line = line.replace(match, tblock, 1)
                out.write(line)
        else: ## typical line replacements (nonexclusive)
            ## replacing lines that begin in "-" with "•"
            if re.search("^- ", line) is not None:
                line = line.replace("-","•", 1)

            if re.search("^--", line) is not None:
                line = line.replace("--","-", 1)

            ## replacing links with a tags
            links = re.findall(r"\[[^\[\]\(\)]+\]\([^\[\]\(\)]+\)", line)
            for match in links:
                text = match[match.index("[")+1:match.index("]")]
                l = match[match.index("(")+1:match.index(")")]
                link = None
                if "http" in l:
                    link = '<a href="'+l+'" target="_blank">'+text+'</a>'
                else:
                    link = '<a href='+l+'>'+text+'</a>'
                line = line.replace(str(match), str(link), 1)

            ## replacing images with img tags
            ## [[img title]](link)
            images = re.findall(r"\[\[[^\[\]\(\)]+\]\]\([^\[\]\(\)]+\)", line)
            for match in images:
                text = match[match.index("[[")+2:match.index("]]")]
                l = match[match.index("(")+1:match.index(")")]
                image = '<img src="'+l+'" alt="'+text+'" class="img">'
                line = line.replace(str(match), str(image), 1)

            ## replacing ids with id tags
            ## [[[id title]]](link)
            ids = re.findall(r"\[\[\[[^\[\]\(\)]+\]\]\]\([^\[\]\(\)]+\)", line)
            for match in ids:
                text = match[match.index("[[[")+3:match.index("]]]")]
                l = match[match.index("(")+1:match.index(")")]
                # remove hashtag
                # l = l[1:]
                idv = '<span id="'+ l +'">'+text+'</span>'
                line = line.replace(str(match), str(idv), 1)

            # replacing italics
            italics = re.findall(r"[^\*]\*[^\*]+\*[^\*]|^\*[^\*]+\*[^\*]|[^\*]\*[^\*]+\*$|^\*[^\*]+\*$", line)
            for match in italics:
                text = match[match.index("*")+1:match[match.index("*")+1:].index("*")+1+match.index("*")]
                tblock = '<i>'+text+'</i>'
                if match[0] == " " : tblock = " " + tblock
                if match[-1] == " " : tblock+= " "
                match = match[match.index("*"):match[match.index("*")+1:].index("*")+2+match.index("*")]
                line = line.replace(match, str(tblock), 1)

            # replacing bolds
            bolds = re.findall(r"[^\*]\*\*[^\*]+\*\*[^\*]|^\*\*[^\*]+\*\*[^\*]|[^\*]\*\*[^\*]+\*\*$|^\*\*[^\*]+\*\*$", line)
            for match in bolds:
                text = match[match.index("**")+2:match[match.index("**")+1:].index("**")+1+match.index("**")]
                tblock = '<span class="bold">'+text+'</span>'
                if match[0] == " " : tblock = " " + tblock
                if match[-1] == " " : tblock+= " "
                match = match[match.index("**"):match[match.index("**")+1:].index("**")+3+match.index("**")]
                line = line.replace(str(match), str(tblock), 1)

            ## replacing block quotes
            blocks = re.findall(r"`[^`]+`|^`[^`]+`|`[^`]+`$|^`[^`]+`$", line)
            for match in blocks:
                text = match[match.index("`")+1:match[match.index("`")+1:].index("`")+1]
                block = '<code class="highlighter-rouge" data-lang="text">'+text+'</code>'
                if match[0] == " " : block = " " + block
                if match[-1] == " " : block+= " "
                match = match[match.index("`"):match[match.index("`")+1:].index("`")+2+match.index("`")]
                line = line.replace(match, block, 1)

            out.write(line + "<br> \n")


os.remove("public/pages/resources.html")
os.remove("public/pages/about.html")
os.remove("public/pages/braindump.html")

# remove already existing directories
try:
    dirs = ["public/pages/braindump","public/pages/blog"]
    for dirv in dirs:
        for f in os.listdir(os.path.join(dirv)):
    	       os.remove(os.path.join(dirv, f))
except:
    print("no dirs needed clearing")

# remove already existing index files
try:
    files = ["public/pages/index.html","public/pages/braindump.html"]
    for file in files:
        continue
#        os.remove(file)
except:
    print("no files needed clearing")

# remove first-level files build directory from public
try:
    for f in os.listdir("build"):
        if not os.path.isdir(f):
            # remove extension from file
            f = f[:f.index(".")] + ".html"
            print(f)
            os.remove("public/pages/"+f)
except:
    print("no files needed clearing")

# remove all files and folders from blog directory
try:
    for f in os.listdir("public/pages/blog"):
        shutil.rmtree("public/pages/blog/"+f)
except:
    print("no files needed clearing")

# create folders
if not os.path.exists("public/pages/braindump"): os.mkdir("public/pages/braindump")
if not os.path.exists("public/pages/blog"): os.mkdir("public/pages/blog")

for d in os.listdir("build/blog"):
    if not os.path.exists("public/pages/blog/"+d): os.mkdir("public/pages/blog/"+d)

# create about
with open("templates/about.html") as temp, open ("build/about.md") as about:
    out = open("public/pages/about.html", "a")
    for line in temp:
        lt = line
        if "{{data}}" in lt:
            interpret(out, about)
        else : out.write(lt)

# create resources
with open("templates/resources.html") as temp, open ("build/resources.md") as resources:
    out = open("public/pages/resources.html", "a")
    for line in temp:
        lt = line
        if "{{data}}" in lt:
            interpret(out, resources)
        else : out.write(lt)


# move braindump html file from template to public
shutil.copyfile("templates/braindump.html", "public/pages/braindump.html")

# go through build/braindump and create html files
with open("templates/braindump.html", 'r') as temp:
    filedata = temp.read()
    breplace = ""

    ar = os.listdir("build/braindump")
    ar.sort()
    for f in ar:
        f = f[:f.index(".")]
        breplace += '<a class="ll" href="/notes/'+f+'">'+f+'</a>'

    filedata = filedata.replace("{{data}}", breplace)
    with open("public/pages/braindump.html", 'w') as out:
        out.write(filedata)

# go through build/braindump and create html files
for f in os.listdir("build/braindump"):
    with open("templates/braindump_individual.html") as temp, open("build/braindump"+"/"+f) as braindump:
        out = open("public/pages/braindump/"+f[:f.index(".")] + ".html", "a")
        for line in temp:
            lt = line
            if "{{data}}" in lt:
                interpret(out, braindump)
            elif "{{title}}" in lt:
                out.write(lt.replace("{{title}}", f[:f.index(".")]))
            else : out.write(lt)

# go through build/blog and add to index 
with open("templates/index.html") as temp:
    index_content = ""

    items = os.listdir("build/blog")
    items.sort(reverse=True)
    for d in items:
        # open config file
        with open("build/blog/"+d+"/config.yaml") as config:
            config = yaml.load(config, Loader=yaml.FullLoader)
            # add to index file
            index_content += '<td style="text-align:center;"> <a class="ico" style="color:'+config["color"]+';" href="/blog/'+config["name"]+'">'+config["icon"]+'</a><div style="color:'+config["color"]+';">'+config["name"]+'</div></td> \n'

    filedata = temp.read()
    filedata = filedata.replace("{{content}}", index_content)
    with open("public/pages/index.html", 'w') as out:
        out.write(filedata)

# go through build/blog and create index html files for each blog
for d in os.listdir("build/blog"):
    with open("templates/blog.html") as temp, open("build/blog/"+d+"/config.yaml") as config:
        config = yaml.load(config, Loader=yaml.FullLoader)
        # make dir
        if not os.path.exists("public/pages/blog/"+config["name"]): os.mkdir("public/pages/blog/"+config["name"])
        out = open("public/pages/blog/"+config["name"]+"/index.html", "a")
        # we want to add blog posts to the index file in even columns 
        data1, data2, data3, data4 = True, True, True, True
        data1max, data2max, data3max, data4max = 3, 4, 4, 4
        # create list of all blog posts
        posts = []
        for f in os.listdir("build/blog/"+d):
            if f != "config.yaml":
                posts.append(f)

        for line in temp:
            lt = line
            if "{{color}}" in lt:
                lt = lt.replace("{{color}}", config["color"])
            if "{{icon}}" in lt:
                lt = lt.replace("{{icon}}", config["icon"])
            if "{{name}}" in lt:
                lt = lt.replace("{{name}}", config["name"])
            if "{{data1}}" in lt and data1:
                appr = ""
                while posts:
                    try:
                        post = posts.pop()
                        v = post[:post.index(".")]
                        appr += '<a style="text-decoration: none !important; color:'+config["color"]+'" href="/blog/'+d+'/'+v+'" title="'+v+'">'+v+'</a><br> \n'
                        data1max -= 1
                    except:
                        data1max -= 1
                        # do nothing

                lt = lt.replace("{{data1}}", appr)
                """
            if "{{data2}}" in lt and data2:
                appr = ""
                while data2max > 0:
                    try:
                        post = posts.pop()
                        v = post[:post.index(".")]
                        vr = v[0:3]
                        appr += '<td><a style="text-decoration: none !important; color:'+config["color"]+'" href="/blog/'+d+'/'+v+'" title="'+v+'">'+vr+'</a></td> \n'
                        data2max -= 1
                    except Exception as e:
                        data2max -= 1

                if (data2max == 0):
                    appr += '<td><a style="text-decoration: none !important"></a></td> \n'

                lt = lt.replace("{{data2}}", appr)
            if "{{data3}}" in lt and data3:
                appr = ""
                while data3max > 0:
                    try:
                        post = posts.pop()
                        v = post[:post.index(".")]
                        vr = v[0:3]
                        appr += '<td><a style="text-decoration: none !important; color:'+config["color"]+' " href="/blog/'+d+'/'+v+'" title="'+v+'">'+vr+'</a></td> \n'
                        data3max -= 1
                    except:
                        data3max -= 1
                if (data3max == 0):
                    appr += '<td><a style="text-decoration: none !important"></a></td> \n'

                lt = lt.replace("{{data3}}", appr)
            if "{{data4}}" in lt and data4:
                appr = ""
                while data4max > 0:
                    try:
                        post = posts.pop()
                        v = post[:post.index(".")]
                        vr = v[0:3]
                        appr += '<td><a style="text-decoration: none !important; color:'+config["color"]+' " href="/blog/'+d+'/'+v+'" title="'+v+'">'+vr+'</a></td> \n'
                        data4max -= 1
                    except:
                        data4max -= 1
                if (data4max == 0):
                    appr += '<td><a style="text-decoration: none !important"></a></td> \n'

                lt = lt.replace("{{data4}}", appr)
            """
            out.write(lt)

# go through build/blog and create html files for each blog post
for d in os.listdir("build/blog"):
    for f in os.listdir("build/blog/"+d):
        if f != "config.yaml":
            with open("templates/blogpost.html") as temp, open("build/blog/"+d+"/"+f) as blog, open("build/blog/"+d+"/config.yaml") as config:
                config = yaml.load(config, Loader=yaml.FullLoader)
                out = open("public/pages/blog/"+d+"/"+f[:f.index(".")] + ".html", "a")
                data1, data2, data3, data4 = True, True, True, True
                data1max, data2max, data3max, data4max = 3, 4, 4, 4
                # create list of all blog posts
                posts = []
                for f in os.listdir("build/blog/"+d):
                    if f != "config.yaml":
                        posts.append(f)
                for line in temp:
                    lt = line
                    if "{{data}}" in lt:
                        interpret(out, blog)
                    else:
                        if "{{color}}" in lt:
                            lt = lt.replace("{{color}}", config["color"])
                        if "{{icon}}" in lt:
                            lt = lt.replace("{{icon}}", config["icon"])
                        if "{{name}}" in lt:
                            lt = lt.replace("{{name}}", config["name"])
                        if "{{title}}" in lt:
                            # get path from blog
                            qq = blog.name.split("/")[blog.name.split("/").index("blog")+2:][0]
                            qq = qq[:qq.index(".")]
                            lt = lt.replace("{{title}}", qq)
                        if "{{data1}}" in lt and data1:
                            appr = ""
                            while posts:
                                try:
                                    post = posts.pop()
                                    v = post[:post.index(".")]
                                    appr += '<td><a style="text-decoration: none !important; color:'+config["color"]+'" href="/blog/'+d+'/'+v+'" title="'+v+'">'+v+'</a></td> \n'
                                    data1max -= 1
                                except:
                                    data1max -= 1
                                    # do nothing
                            lt = lt.replace("{{data1}}", appr)
                        """
                        if "{{data2}}" in lt and data2:
                            appr = ""
                            while data2max > 0:
                                try:
                                    post = posts.pop()
                                    v = post[:post.index(".")]
                                    vr = v[0:3]
                                    appr += '<td><a style="text-decoration: none !important; color:'+config["color"]+'" href="/blog/'+d+'/'+v+'" title="'+v+'">'+vr+'</a></td> \n'
                                    data2max -= 1
                                except:
                                    data2max -= 1
                            if (data2max == 0):
                                appr += '<td><a style="text-decoration: none !important"></a></td> \n'

                            lt = lt.replace("{{data2}}", appr)
                        if "{{data3}}" in lt and data3:
                            appr = ""
                            while data3max > 0:
                                try:
                                    post = posts.pop()
                                    v = post[:post.index(".")]
                                    vr = v[0:3]
                                    appr += '<td><a style="text-decoration: none !important; color:'+config["color"]+'" href="/blog/'+d+'/'+v+'" title="'+v+'">'+vr+'</a></td> \n'
                                    data3max -= 1
                                except:
                                    data3max -= 1
                            if (data3max == 0):
                                appr += '<td><a style="text-decoration: none !important"></a></td> \n'

                            lt = lt.replace("{{data3}}", appr)
                        if "{{data4}}" in lt and data4:
                            appr = ""
                            while data4max > 0:
                                try:
                                    post = posts.pop()
                                    v = post[:post.index(".")]
                                    vr = v[0:3]
                                    appr += '<td><a style="text-decoration: none !important; color:'+config["color"]+'" href="/blog/'+d+'/'+v+'" title="'+v+'">'+vr+'</a></td> \n'
                                    data4max -= 1
                                except:
                                    data4max -= 1
                            if (data4max == 0):
                                appr += '<td><a style="text-decoration: none !important"></a></td> \n'

                            lt = lt.replace("{{data4}}", appr)
                        """
                        out.write(lt)

# rss feed
