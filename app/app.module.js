//Configuration
var config = {
    proxy : "http", //https
	api: "api",
	reports: "reports",
	domain: "cleveland-api.dev" //"partner-cleveland.locomobi.com",
};

//Starting the Angular app
var app = angular.module('cleveland', ['ngRoute','ngCookies']);

//Sets the App Configuration
app.constant("appConfig", config);

//Cookie & Login Check
app.run(function ($rootScope, $location, $cookieStore, $http, locationService) {
    // keep user logged in after page refresh
    //console.log($cookieStore.get('user'));
    $rootScope.user = $cookieStore.get('user') || {};
    if ($rootScope.user.basicAuth) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.user.basicAuth; // jshint ignore:line
        // locationService.getLocations().then(function (data){
        //     $rootScope.user.locations = data;
        //     console.log(data);
        //     console.log($rootScope.user);
        // });
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        //console.log($rootScope.user.login);

        // redirect to login page if not logged in           
        if ($location.path() != '/' && $location.path() != '/activate' && !$rootScope.user.login) {
            $location.path('/');
        }

        //Automatic Login based on Cookie
        if ($rootScope.user.login && $location.path() == '/') {
            $location.path('/find-employee');
        }
    });
});