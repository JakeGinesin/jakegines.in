function backtohome(){
  window.location = '/';
}
async function submitContactRequest(){
  let f = document.getElementById("first_name").value;
  let e = document.getElementById("last_name").value;
  let m = document.getElementById("message").value;

  let c;

  if(window.custom){
    c = document.getElementById("custom_message").value;
  }
  else{
    c = document.getElementById("subject").value;
  }

  let data = {
    firstname: f,
    email: e,
    message: m,
    contactReason: c
  }

  let response = await fetch('api/contactrequest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  let json = await response.json();

  if(json.res == "true"){
    // console.log("success");
    document.getElementById("content-hold").innerHTML = "";
    document.getElementById("submitted").classList.remove("hidden");
  }
  else if(json.res == "time"){
    document.getElementById("timealert").classList.remove("hidden");
  }
  else{
    console.log("something went wrong");
  }
}


function select(e){
  if(e.value == "custom"){
    document.getElementById("custom").classList.remove("hidden");
    window.custom = true;
  }
  else{
    document.getElementById("custom").classList.add("hidden");
    window.custom = false;
  }
}

function deleterequest(e){
  e.parentElement.classList.add("hidden");
}


// document.getElementById("subject").onchange = function(){
//   if(document.getElementById("subject").selectedIndex===3){
//     document.getElementById("custom").classList.remove("hidden");
//   }
//   else{
//     document.getElementById("custom").classList.add("hidden");
//   }
// };
