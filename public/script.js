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
    App.controller('mainController', function($scope) {
        // create a message to display in our view
        // $scope.message = 'Landing ... works? !';
        $(document).ready(function() {
          $(window).scrollTop(0);
          $(window).scroll(function() {

            if ($(this).scrollTop() > 2) {
              // console.log('pre grey');
              $('.search_n_find .pre').css({
                color: '#202020'
              });
            } else {
              // console.log('pre white');  
              $('.search_n_find .pre').css({
                color: '#FFFFFF !important'
              });
            }

            var scrollingMagic = function (className, scroll, scroll2) {
              if ($(window).scrollTop() > scroll && $(window).scrollTop() < 500) {
                $(className).css({
                  color: '#FFFFFF'
                });
              } else if ($(window).scrollTop() > 500) {
                $(className).css({
                  color: '#3E3D3E'
                });
              } else {
                $(className).css({
                  color: '#202020'
                });
              }

              if (className === ".search_c" || className === ".search_m" || className === ".search_y" || className === ".search_k") {
                if ($(window).scrollTop() > scroll || $(window).scrollTop() > scroll2 && $(window).scrollTop() < 499) {
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

              if ($(window).scrollTop() < 2) {
                $('.pre').css({
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
        $('#hello-image').delay(3000).fadeOut(1000);
    });

    App.controller('workController', function($scope) {
        $(window).scrollTop(0);
      $scope.message = 'Work';
    });

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
    });

    App.controller('careerController', function($scope) {
        $(window).scrollTop(0);
    });

    App.directive("navi", function() {
        return {
            restrict : "E",
            templateUrl: '/views/navigation.html'
        };
    });

    App.directive("fooder", function() {
        return {
            restrict : "E",
            templateUrl: '/views/footer.html'
        };
    });
