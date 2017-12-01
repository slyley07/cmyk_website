var App = angular.module('CMYKApp', ['ngRoute', 'ngTouch']);

//ROUTER------------------------------------------------------------------------
App.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider.when('/', {
    controller: 'mainController',
    templateUrl: '/views/landing.html'
  })

  .when("/work", {
    controller: "workController",
    templateUrl: "/views/work.html"
  })

  .when("/brand/:param", {
    controller: "brandController",
    templateUrl: "/views/brand.html"
  })

  .when("/about", {
    controller: "aboutController",
    templateUrl: "/views/about.html"
  })

  .when("/career", {
    controller: "careerController",
    templateUrl: "/views/career.html"
  })

  .when("/contact", {
    controller: "contactController",
    templateUrl: "/views/contact.html"
  }).otherwise({ redirectTo: '/'});

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

}]);


// create the controller and inject Angular's $scope
//CONTROLLERS-------------------------------------------------------------------
App.controller('globalController', function($scope, $window, $location) {
  var currentUrl = $window.location.href;
})

App.controller('mainController', function($scope) {

});

App.controller('aboutController', function($scope) {
  $(window).scrollTop(0);
  (function($){
    $.fn.extend({
      rotaterator: function(options) {
        var defaults = {
          fadeSpeed: 500,
          pauseSpeed: 1000,
          child:null
        };

        var options = $.extend(defaults, options);

        return this.each(function() {
          var o =options;
          var obj = $(this);
          var items = $(obj.children(), obj);

          items.each(function() {$(this).hide();})

          if(!o.child) {
            var next = $(obj).children(':first');
          } else {
            var next = o.child;
          }

          $(next).fadeIn(o.fadeSpeed, function() {
            $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
              var next = $(this).next();
              if (next.length == 0){
                next = $(obj).children(':first');
              }
              $(obj).rotaterator({child : next, fadeSpeed : o.fadeSpeed, pauseSpeed : o.pauseSpeed});
            })
          });
        });
      }
    });
  })(jQuery);

  $('#rotate').rotaterator({fadeSpeed:500, pauseSpeed:1000});
  $('#hello-image').delay(2400).fadeOut(800);


  // Team picture
  $('.name-tag').click(highlightPerson);

  function highlightPerson() {
    var text = $(this).text();
    var imgurl = './images/group-' + text + '.png'
    $('.name-tag').removeClass('active');

    // Using fadeIn and Out
    $('#group-pic').fadeOut(300, function(){
      $('#group-pic').attr('src', imgurl);
    }).fadeIn(700);

    $(this).addClass('active');
  }

  // Clear the selection
  $(document).click(function(){
    if(!$(event.target).is('.name-tag')) {
      $('.name-tag').removeClass('active');
      $('#group-pic').attr('src', './images/group-photo.png');
    }
  })

  $scope.isActive = function (route) {
    if(route === 'about') {return true} else { return false}
  };

});

App.controller('workController', function($scope, $window) {
  $(window).scrollTop(0);

  let windowWidth = $window.innerWidth;

  if (windowWidth < 768 && windowWidth >= 320) {
    $scope.size = 'mobile';
    $scope.initial = '';
    console.log($scope.size);
  } else if (windowWidth >= 768 && windowWidth < 900) {
    $scope.size = 'tablet';
    $scope.initial = 'T';
  }

  $scope.isActive1 = function (route) {
    if(route === 'work') {return true} else { return false}
  };
});

App.controller('brandController', function($scope, $route, $routeParams, $http) {
  var param = $routeParams.param;

  $scope.param = param;

  $http({
    method: 'GET',
    url: '/public/brands.json'
  }).then(function (success){
    $scope.brands = success.data;
    success.data.forEach(function(json) {
      if (json.class === param) {
        $scope.brandData = json;
      }
    });
  },function (error){
    console.log(error);
    console.log("there was an error");
  });
})

App.controller('contactController', function($scope, $http) {
  $(window).scrollTop(0);

  $scope.contactUs = function (user) {
    $(window).scrollTop(0);
    var googleURL = "https://script.google.com/macros/u/0/s/AKfycbz54PSGzLCWUZGmI2iHBkFXTFX5mlagA7STIP-v6_yjQe3sxNE/exec";

    // HTTP
    $.ajax({
      url: googleURL,
      data: user,
      type: "get",
      success: function(data) {
        console.log('Submission successful');
        $('#modal').show();
        $('input').val("");
        $scope.user = {};
      },
      error: function(xhr, status, error) {
        console.log('Submission failed: ' + error);
        $('#modal').show();
        $('input').val("");
        $scope.user = {};
      }
    });
  };

  $('#close').click(function(){
    $('#modal').hide();
  });

  $scope.isActive2 = function (route) {
    if(route === 'contact') {
      return true;
    } else { return false;}
  };

});

App.controller('careerController', function($scope) {
    $(window).scrollTop(0);
});

//DIRECTIVES--------------------------------------------------------------------
App.directive('navi', function() {
  return {
    restrict: 'E',
    templateUrl: '/views/navigation.html'
  };
});

App.directive('bavi', function() {
  return {
    restrict : 'E',
    scope: {
      param: '=param',
      brandData: '=brandData',
      brands: '=brands'
    },
    templateUrl: '/views/brand_navigation.html',
    link: function(scope, element) {

      scope.slideUp = function(brand) {
        if (brand === scope.param) {
          $('.brand_dd').slideUp()
        }
      }

      $('.openner').click(function() {
        $('.brand_dd').slideDown()
      });

      $('.slide_up').click(function() {
        $('.brand_dd').slideUp()
      });
    }
  };
});

App.directive('landing', function() {
  return {
    restrict: 'A',
    link: function(scope) {
      $(document).ready(function() {
        $(window).scrollTop(0);
        $(window).scroll(function() {

          if ($(this).scrollTop() > 2) {
            // console.log('pre grey');
            $('.search_n_find .pre').css({
              color: '#202020',
              transition: 'color 2s'
            });
          } else {
            console.log('pre white');
            $('.search_n_find .pre').css({
              color: '#FFFFFF !important',
              transition: 'color 2s'
            });
          }

          var scrollingMagic = function (className, scroll, scroll2) {
            if ($(window).scrollTop() > scroll && $(window).scrollTop() < 500) {
              $(className).css({
                color: '#FFFFFF',
                transition: 'color 2s'
              });
            } else if ($(window).scrollTop() > 500) {
              $(className).css({
                color: '#3E3D3E',
                transition: 'color 2s'
              });

            } else {
              $(className).css({
                color: '#202020',
                transition: 'color 2s'
              });
            }

            if (className === '.search_c' || className === '.search_m' || className === '.search_y' || className === '.search_k') {
              if ($(window).scrollTop() > scroll || $(window).scrollTop() > scroll2 && $(window).scrollTop() < 499) {
                $(className).css({
                  color: '#FFFFFF',
                  transition: 'color 2s'
                });
              }
            }

            if ($(window).scrollTop() < 2) {
              $(className).css({
                color: '#FFFFFF',
                transition: 'color 2s'
              });
            }

            if ($(window).scrollTop() < 2) {
              $('.pre').css({
                color: '#FFFFFF',
                transition: 'color 2s'
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
        });
      });
    }
  };
});

App.directive('parallax', function() {
  return {
    restrict: 'A',
    link: function(scope) {
      $('document').ready(function() {
        function parallax(page, speed, top) {
          var scrolled = $(window).scrollTop();
          $('.' + page).css('top', (scrolled * speed) + top + 'px');
        }

        $(window).scroll(function(e) {
          parallax('apa_1', 0.5, 695);
          parallax('apa_2', 0.3, 1050);
        });
      });
    }
  }
})

App.directive("footer", function() {
  return {
    restrict : "E",
    templateUrl: '/views/footer.html'
  };
});

App.directive("video", function() {
  return {
    restrict: "E",
    templateUrl: "/views/video.html"
  }
});

App.directive('carousel', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      links: '=',
      indy: '='
    },
    templateUrl: "/views/carousel.html",
    link: function(scope, element) {
      $timeout(function() {
        $('.indicators li .indicator',element).first().addClass('active');
        $('#carousel li.item',element).first().addClass('active');

        scope.changeItem = function(index, swipe, cara) {
          if (swipe === 'right' && index === -1) {
            return;
          }

          if (swipe === 'left' && index === $('#cara-' + cara + ' #carousel li.item').length) {
            return;
          }

          $('#cara-' + cara + ' #carousel li.item').each(function(ind) {
            if ($(this).hasClass('active') && ind !== index) {
              $(this).removeClass('active');
              $('#cara-' + cara + ' .indicators li .indicator:eq(' + ind + ')').removeClass('active');
              $('#cara-' + cara + ' #carousel li.item:eq(' + index + ')').addClass('active');
              $('#cara-' + cara + ' .indicators li .indicator:eq(' + index + ')').addClass('active');
            }
          })
        }
      });
    }
  }
});

$(document).ready(function(){
  $('.nav-link').click(function(){
    $('#nav').addClass('test-nav')
    $('.nav-link').removeClass('active-nav');
    $(this).addClass('active-nav');
  })
})
