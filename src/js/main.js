$(document).ready(function(){
  $('.menu__burger').click(function(event){
    $('.menu').toggleClass('menu--active')
  })
  window.addEventListener('contextmenu', function(e){
    e.preventDefault();
  },false)
})
