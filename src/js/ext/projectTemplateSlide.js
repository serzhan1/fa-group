document.addEventListener( 'DOMContentLoaded', function () {
  var secondarySlider = new Splide('#secondary-slider', {
    rewind      : false,
    arrows      : false,
    fixedWidth  : 100,
    fixedHeight : 64,
    isNavigation: true,
    focus       : 5,
    gap         : 3,
    direction   : 'ltr',
    pagination  : false,
    cover       : true,
    breakpoints : {
      '600': {
        fixedWidth  : 66,
        fixedHeight : 40,
        focus       : 'center'
      }
    }
  } ).mount();
  
  // Create the main slider.
  var primarySlider = new Splide( '#primary-slider', {
    type       : 'slide',
    heightRatio: 0.66,
    pagination : false,
    arrows     : false,
    cover      : true,
  } );
  
  // Set the thumbnails slider as a sync target and then call mount.
  primarySlider.sync(secondarySlider).mount();
  
  $('.related-proj-list').slick({
    arrows: false,
    autoplay: true, 
    autoplaySpeed: 2000,
    infinite: true,
    lazyLoad: 'progressive',
    infinite: true, 
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 550, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 5
        }
      }
    ]
  })
} );

$(function () {

    $('#primary-slider').on('click', function(e) {
      
      $('body > *').hide();
      $('body').addClass('modal_active');
      $('.slider--modal').show();
      
      $('.modal-content').slick({
        arrows: false,
        infinite: true, 
        dots: false,
        autoplay: false, 
        adaptiveHeight: 'auto',
        responsive: [
          {
            breakpoint: 767,
            settings: {
              centerMode: true,
              variableWidth: true
            }
          }
        ]
      })
    })

    $('.close').on('click', function(e){
      $('body > *').show();
      $('body').removeClass('modal_active');
      $('.slider--modal').hide()
    })
});


