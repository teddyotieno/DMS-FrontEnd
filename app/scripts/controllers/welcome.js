angular.module('dms.controllers')
    .controller('WelcomeCtrl', [function() {

        // Slightly move the Image on mouseover
        $('.header-content').mousemove(function(event) {
            var containerWidth = $(this).innerWidth(),
                containerHeight = $(this).innerHeight(),
                mousePositionX = (event.pageX / containerWidth) * 10,
                mousePositionY = (event.pageY / containerHeight) * 10;

            $(this).css('background-position', mousePositionX + '%' +
                ' ' + mousePositionY + '%');
        });

        // Dynamically generate text in typewritter effect
        $(function() {
            $('.dynamic-text-right').typed({
                strings: ['Create^2000', 'Manage^1000', 'Organize^1000'],
                typeSpeed: 0,
                loop: true,
            });
        });
    }]);
