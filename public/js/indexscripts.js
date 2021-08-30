document.addEventListener('DOMContentLoaded', async function(){
  console.log(window.location);
  let data = {
    "min": 0,
    "numOfPosts": 3
  };

  let response = await fetch(window.location.origin + '/api/getblogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  let json = await response.json();

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
    document.getElementById("blogs").appendChild(base);

  });

  let b = document.createElement("li");
  let l = document.createElement("a");
  l.setAttribute("href","/archive");
  l.textContent = "More →";
  b.appendChild(l);
  document.getElementById("blogs").appendChild(b);


}, false);
