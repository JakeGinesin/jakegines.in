async function login(){
  let u = document.getElementById('username').value;
  let p = document.getElementById('password').value;

  let data = {
    username : u,
    password : p
  }

  let response = await fetch(window.location.origin + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if(response.status == "201"){
    window.location = '/admin';
    // console.log('success!!!');
  }
  else if(response.status == "401"){
    document.getElementById("fail").classList.remove("hidden");
  }
  else if(response.status == "501"){
    // console.log('server error');
  }
  console.clear();
}

document.addEventListener("keyup", function(event){
  if(event.keyCode === 13 && document.getElementById("username").value!="" && document.getElementById("password").value!=""){
    event.preventDefault();
    login();
  }
});
