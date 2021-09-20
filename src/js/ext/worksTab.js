$('.works__list-item').click(function(e){
  e.preventDefault();
  $(this).addClass('active').siblings().removeClass('active');
  $($(this).children().attr('href')).addClass('active').siblings().removeClass('active');
  $('.works__info').slick('refresh');
})

$('.works__info').slick({
  arrows: false,
  infinite: true, 
  dots: true,
  cover: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  slidesPerRow: 4,
  rows: 2,
  responsive: [
    {
      breakpoint: 579, 
      settings: {
        slidesPerRow: 3,
        rows: 2,
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 440,
      settings: {
        slidesPerRow: 2,
        rows: 2,
        slidesToScroll: 1
      }
    }
  ]
})
