document.addEventListener('DOMContentLoaded', async function(){
  let location = window.location.href;
  let blogurl = location.toString().substring(location.indexOf('/archive/') + 9);

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

  let response = await fetch(window.location.origin + '/api/getblogbyurl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  let json = await response.json();

  json.forEach(blog=>{
    let title = document.createElement("h1");
    title.setAttribute("class", "post__title pt-6");
    let contentHolder = document.createElement("div")
    contentHolder.setAttribute("class","relative text-left max-w-full overflow-hidden h-full");
    contentHolder.style.cssText = 'width:75ch';

    let title2 = document.createElement("div");
    title2.setAttribute("class","text-3xl md:text-4xl font-bold pt-4 post__title");
    document.title = blog.title;
    title2.textContent = blog.title;

    let date = document.createElement("p");
    date.setAttribute("class","post__date");

    let d = new Date(blog.date);

    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
    date.textContent = `${mo} ${da}, ${ye}`;

    let content = document.createElement("div");
    content.setAttribute("class","post__content");

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
        link.setAttribute("class", "");
        content.appendChild(link);
      }
      else if(word == "/n"){
        content.appendChild(document.createElement("br"));
      }
      else{
        content.innerHTML += word + " ";
      }
    });

    document.getElementById("chold").appendChild(title2);
    document.getElementById("chold").appendChild(date);
    document.getElementById("chold").appendChild(content);

  });
}, false);

function share(){
 navigator.share({
   title: window.title,
   text: 'check out ' + window.title + ' at jakegines.in',
   url: window.location
 });
}
