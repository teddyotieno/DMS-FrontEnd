describe('Welcome Controller Unit Tests', function() {
    var $scope, WelcomeCtrl;
    beforeEach(module('dms'));
    beforeEach(inject(function($injector, $controller) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope;
        WelcomeCtrl = $controller('WelcomeCtrl', {
            $scope: $scope,
            $rootScope: $rootScope
        });
    }));

    describe('Welcome Controller Unit Tests', function() {
      it('Should test that .header-content is defined', function() {
        expect($).toBeDefined();
        expect(typeof $).toBe('function');
        //$('.header-content').mousemove;
      });
    });

});
