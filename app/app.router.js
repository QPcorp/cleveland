// configure our routes
app.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'app/templates/login.html',
            controller  : 'mainController'
        })

        .when('/activate', {
            templateUrl : 'app/templates/activate.html',
            controller  : 'mainController'
        })        

        .when('/find-employee', {
            templateUrl : 'app/templates/find-employee.html'
        })

        .when('/employees', {
            templateUrl : 'app/templates/employees.html',
            controller  : 'employeesController'
        })

        .when('/add-employee', {
            templateUrl : 'app/templates/add-employee.html'
        })

        .when('/user-profile', {
            templateUrl : 'app/templates/user-profile.html',
            controller  : 'userProfileController'
        })

        .when('/support', {
            templateUrl : 'app/templates/support.html'
        });

});