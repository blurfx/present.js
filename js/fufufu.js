(function($){
  $.fufufu = function(options){
    var fufu = $('.slide');
    var index = 0;
    
    var settings = $.extend({
      animate: false,
      slideSpeed: 400,
      pageNumber: false,
      opacityTransition: true,
      bgColorTransition: false,
    }, options);

    $('.slide').parent().css({
      overflow: 'hidden',
      width:'100%',
      height:'100%',
    });
    $('.slide').each(function() {
      $(this).css({
        position: 'absolute',
        width:'100%',
        height:'100%',
        top:0,
        left:index*100 + '%'
      });
      if(index==0)$(this).addClass('current');
      index++;
    });
    $(window).keydown(function(event){
      if(event.which == 37){
        if($('.slide.current').prev('.slide').length){
          var dummy = $('.slide.current').prev('.slide');
          if(settings.animate){
            $(fufu).animate({
              left:'+=100%'
            }, settings.slideSpeed);
          }else{
            $(fufu).animate({
              left:'+=100%'
            },0);
          }

          $('.slide.current').removeClass('current');
          $(dummy).addClass('current');
        }
      }else if(event.which == 39){
        if($('.slide.current').next('.slide').length){
          var dummy = $('.slide.current').next('.slide');
          if(settings.animate){
            $(fufu).animate({
              left:'-=100%'
            }, settings.slideSpeed);
          }
          else{
            $(fufu).animate({
              left:'-=100%'
            }, 0);
          }
          $('.slide.current').removeClass('current');
          $(dummy).addClass('current');
        }
      }
    });
  };
})(jQuery);