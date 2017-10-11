$(document).ready(function() {
  $(window).scrollTop(0);
  $(window).scroll(function() {

    if ($(this).scrollTop() > 2) {
      $('.search_n_find pre').css({
        color: '#202020'
      });
    } else {
      console.log('pre white');
      $('.search_n_find pre').css({
        color: '#FFFFFF !important'
      });
    }

    var scrollingMagic = function (className, scroll, scroll2) {


      if ($(window).scrollTop() > scroll && $(window).scrollTop() < 500) {
        console.log(className + ' white');
        // $(className).animate({
        //   color: '#FFFFFF'
        // }, 'fast');

        $(className).css({
          color: '#FFFFFF'
        });
      } else if ($(window).scrollTop() > 500) {
        // $(className).animate({
        //   color: '#202020'
        // }, 'fast');

        $(className).css({
          color: '#202020'
        });
      } else {
        // console.log(className + ' grey');
        $(className).css({
          color: '#202020'
        });
      }

      if (className === ".search_c" || className === ".search_m" || className === ".search_y" || className === ".search_k") {
        if ($(window).scrollTop() > scroll || $(window).scrollTop() > scroll2 && $(window).scrollTop() < 499) {
          // console.log(className + ' white');
          $(className).css({
            color: '#FFFFFF'
          });
        }
      }

      if ($(window).scrollTop() < 2) {
        $(className).css({
          color: '#FFFFFF'
        });
      }
    }

    scrollingMagic('.search_brand', 50);
    scrollingMagic('.search_create', 100);
    scrollingMagic('.search_unique', 150);
    scrollingMagic('.search_make', 200);
    scrollingMagic('.search_passion', 250);
    scrollingMagic('.search_style', 300);
    scrollingMagic('.search_design', 350);
    scrollingMagic('.search_think', 400);
    scrollingMagic('.search_solution', 450);
    scrollingMagic('.search_c', 500, 100);
    scrollingMagic('.search_m', 550, 200);
    scrollingMagic('.search_y', 600, 300);
    scrollingMagic('.search_k', 650, 400);
  })
})
