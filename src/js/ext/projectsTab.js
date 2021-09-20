$('.projects__menu-item').click(function(e){
  e.preventDefault();
  $(this).addClass('active').siblings().removeClass('active');
  $($(this).children().attr('href')).addClass('active').siblings().removeClass('active');
})



