document.addEventListener('scroll', function(e){

  var h = document.documentElement,
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';

  var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
  document.getElementById("topbardark").style.width = percent + "%";

  // console.log(percent);

});
