$(document).ready(function(){
  $('.main-slider').slick({
    arrows: false,
    infinite: true, 
    dots: true,
    autoplay: true, 
    autoplaySpeed: 2000,
  })
  
  $('.products__slide').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    lazyLoad: 'progressive',
    dots: true,
    adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 4
        }
      }
    ]
  })
})
