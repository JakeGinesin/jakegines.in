function init(){window.loc = 1;}

async function grabposts(min, max, status){

  document.getElementById("blogs").innerHTML="";

  let data = {
    "min": min,
    "numOfPosts": max
  };

  let response = await fetch('api/getblogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  let json = await response.json();

  json.forEach(blog =>{
    let base = document.createElement("div");
    base.setAttribute("class","text-center max-w-full break-words bg-gray-100");

    let padding = document.createElement("div");
    padding.setAttribute("class", "py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8");

    let inline = document.createElement("div");
    inline.setAttribute("class","inline-block max-w-full p-4 pb-0 sm:p-5 sm:pb-0 md:p-12 md:pb-0 lg:p-16 lg:pb-0 xl:p-20 xl:pb-0 bg-white shadow-lg md:text-lg lg:text-xl");
    inline.style.cssText = 'height:35em';

    let contentHolder = document.createElement("div")
    contentHolder.setAttribute("class","relative text-left max-w-full overflow-hidden h-full");
    contentHolder.style.cssText = 'width:65ch';

    let title = document.createElement("div")
    title.setAttribute("class","w-5/6 text-3xl md:text-4xl font-bold");
    title.textContent = blog.title;
    title.appendChild(document.createElement("br"));

    contentHolder.appendChild(title);

    let subtitleHolder = document.createElement("div");
    subtitleHolder.appendChild(document.createElement("br"));
    let subtitle = document.createElement("div");
    subtitle.setAttribute("class","w-3/4 font-medium");
    subtitle.textContent = blog.subtitle;
    subtitle.appendChild(document.createElement("br"));
    subtitleHolder.appendChild(subtitle);

    contentHolder.appendChild(subtitleHolder);

    let extraInfoHolder = document.createElement("div");
    extraInfoHolder.setAttribute("class","text-gray-500 mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5 xl:mt-3");
    let date = document.createElement("p");
    date.setAttribute("class","float-left");

    let d = new Date(blog.date)

    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    date.textContent = `${mo} ${da}, ${ye}`;
    extraInfoHolder.appendChild(date);

    let length = document.createElement("p");
    length.setAttribute("class","float-right text-right");
    length.textContent = blog.readlength + " min read";
    length.appendChild(document.createElement("br"));
    extraInfoHolder.appendChild(length);
    extraInfoHolder.appendChild(document.createElement("br"));
    extraInfoHolder.appendChild(document.createElement("br"));
    extraInfoHolder.appendChild(document.createElement("br"));

    contentHolder.appendChild(extraInfoHolder);

    let chold = document.createElement("div");
    chold.setAttribute("class","prose md:prose-lg lg:prose-xl");
    let content = document.createElement("div");

    let contentArray = blog.content.split(" ");

    contentArray.forEach(word=>{
      if(word.includes("[-") && word.includes("-]")){
        let linkurl;
        let tword = word.substring(0, word.indexOf("[-"));
        let link = document.createElement("a");
        link.setAttribute("target", "_blank");
        let linktemp = word.substring(word.indexOf("[-") + 2, word.indexOf("-]"));
        if(linktemp.includes("http://") || linktemp.includes("https://")){
          linkurl = linktemp;
        }
        else{
          linkurl = "https://" + linktemp;
        }
        link.setAttribute("href", linkurl);
        link.textContent = tword + " ";
        link.setAttribute("class", "text-blue-500 hover:text-blue-600 transition");
        content.appendChild(link);
      }
      else if(word == "/n"){
        content.appendChild(document.createElement("br"));
      }
      else{
        content.innerHTML += word + " ";
      }
      // console.log(word);
      // console.log(word);
    });

    // content.innerHTML = blog.content;

    content.style.cssText="line-height:1.8em; color: #374151;";

    chold.appendChild(content);

    contentHolder.appendChild(chold);

    let bottom = document.createElement("div");
    bottom.setAttribute("class","absolute bottom-0 w-full pointer-events-none");
    let gradient = document.createElement("div")
    gradient.setAttribute("class","h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18");
    gradient.style.cssText="background: linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)";
    bottom.appendChild(gradient);
    let readmoreHolder = document.createElement("div");
    readmoreHolder.setAttribute("class","leading-none bg-white text-center pointer-events-auto py-3.5 sm:py-4 md:py-5 lg:py-6 xl:py-8");
    let readmore = document.createElement("a");
    readmore.setAttribute("class","text-blue-500 hover:text-blue-600 transition");
    let rmtg = readmore.setAttribute("target", "_self");
    // rmtg.value="_self";
    let rmhref = readmore.setAttribute("href", "blog/" + blog.url);
    // rmhref = "blog/" + blog.url;
    readmore.textContent = "Read More";
    readmoreHolder.appendChild(readmore);
    bottom.appendChild(readmoreHolder);

    contentHolder.append(bottom);

    inline.appendChild(contentHolder);

    padding.appendChild(inline);

    base.appendChild(padding);

    document.getElementById("blogs").appendChild(base);

    if(status == "init"){
      document.getElementById("switch").classList.remove("hidden");
    }

  });
}

function chooser(e){
  let val = e.innerHTML;
  let chs = document.getElementsByClassName("chooser");
  Array.from(chs).forEach(element=>{
    element.className = 'chooser hover:bg-gray-100 border border-r-0 w-10 sm:w-11 md:w-12 lg:w-14 xl:w-16 py-1 md:py-1.5 transition';
  });
  e.className='chooser border-blue-500 bg-blue-500 hover:bg-blue-600 hover:border-blue-600 text-white border border-r-0 w-10 sm:w-11 md:w-12 lg:w-14 xl:w-16 py-1 md:py-1.5 transition';
  grabposts((val-1)*4, 4, "e");
}
