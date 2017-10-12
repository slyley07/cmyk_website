var App = angular.module('CMYKApp', ['ngRoute']);

App.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
                controller: 'mainController',
                templateUrl: '/views/landing.html'
            })

            .when("/work", {
                controller: "workController",
                templateUrl: "/views/work.html"
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
    App.controller('mainController', function($scope) {
        // create a message to display in our view
        // $scope.message = 'Landing ... works? !';
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
    });

    App.controller('workController', function($scope) {
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
    });

    App.controller('contactController', function($scope) {
        $scope.message = 'COntact';
    });

    App.directive("navi", function() {
        return {
            restrict : "E",
            templateUrl: '/views/navigation.html'
        };
    });