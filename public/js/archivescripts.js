document.addEventListener('DOMContentLoaded', async function(){
  init();
  grabposts();
}, false);

function init(){window.loc = 1;}

async function grabposts(min, max, status){
  console.log(window.location);

  document.getElementById("blogs").innerHTML="";

  let data = {
    "min": 0,
    "numOfPosts": 10000
  };

  let response = await fetch('api/getblogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  let json = await response.json();

  let title = document.createElement("h1");
  title.setAttribute("class","title pt-6");
  title.textContent = "Archive";

  document.getElementById("chold").appendChild(title);

  json.forEach(blog=>{
    let base = document.createElement("li");

    let link = document.createElement("a");
    link.setAttribute("href", "archive/" + blog.url);
    if(blog.title.slice(blog.title.length-5, blog.title.length) == ".html"){
      blog.title = blog.title.slice(0, blog.title.length-5);
    }
    blog.title = blog.title.replace(/_/g, " ");

    link.textContent = blog.title;

    let date = document.createElement("span");
    date.setAttribute("class", "date");
    let d = new Date(blog.date);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    date.textContent = `${mo}-${da}-${ye}`;

    base.appendChild(link);
    base.appendChild(date);
    document.getElementById("chold").appendChild(base);
  });
}
