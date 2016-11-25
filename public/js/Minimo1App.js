
var Minimo1App = angular.module('Minimo1App', ['ngRoute']);

Minimo1App.config(['$routeProvider', function($routeProvider){

    $routeProvider
        .when('/students', {
            templateUrl: './views/students.html',
            controller: 'ApiCtrl'
        })
        .otherwise({
            redirectTo: '/students'
        })
        .when('/subjects', {
            templateUrl: './views/subjects.html',
            controller: 'ApiCtrl'
        })
        .otherwise({
            redirectTo: '/students'
        });

    }]);


