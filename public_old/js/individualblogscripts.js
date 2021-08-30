async function grabpost(){
  let location = window.location.href;
  let blogurl = location.toString().substring(location.indexOf('/blog/') + 6);

  let data = {
    url : blogurl
  }

  let loc = window.location.host;

  if(loc.includes("localhost")){
    loc = "http://" + loc;
  }
  else{
    loc = "https://" + loc;
  }

  let response = await fetch(loc + '/api/getblogbyurl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  let json = await response.json();

  json.forEach(blog=>{
    let contentHolder = document.createElement("div")
    contentHolder.setAttribute("class","relative text-left max-w-full overflow-hidden h-full");
    contentHolder.style.cssText = 'width:75ch';

    let title = document.createElement("div")
    title.setAttribute("class","text-3xl md:text-4xl font-bold");
    title.textContent = blog.title;
    window.title = blog.title;
    document.title = blog.title;
    title.appendChild(document.createElement("br"));

    contentHolder.appendChild(title);

    let subtitleHolder = document.createElement("div");
    subtitleHolder.setAttribute("class","mx-auto max-w-full break-words md:text-lg lg:text-xl")
    subtitleHolder.appendChild(document.createElement("br"));
    let subtitle = document.createElement("div");
    subtitle.setAttribute("class","font-medium");
    subtitle.textContent = blog.subtitle;
    subtitle.appendChild(document.createElement("br"));
    subtitleHolder.appendChild(subtitle);

    contentHolder.appendChild(subtitleHolder);

    let extraInfoHolder = document.createElement("div");
    extraInfoHolder.setAttribute("class","text-gray-500 mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5 xl:mt-3");
    let date = document.createElement("p");
    date.setAttribute("class","w-1/4 float-left");

    let d = new Date(blog.date)

    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    date.textContent = `${mo} ${da}, ${ye}`;
    extraInfoHolder.appendChild(date);

    let length = document.createElement("p");
    length.setAttribute("class","w-1/4 float-right text-right mr-2");
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
      console.log(word);

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


    document.getElementById("bloghold").appendChild(contentHolder);
  });

}

function share(){
 navigator.share({
   title: window.title,
   text: 'check out ' + window.title + ' at jakeginesin.io',
   url: window.location
 });
}
