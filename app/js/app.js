'use strict'
let app = angular.module('myApp', [
    'ui.router',
    'ngMessages',
    'topicControllersModule'
    ])

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/about')
    $stateProvider
        .state('about', {
            url : '/about',
            template : '<h2>This is Simona`s app!</h2>'
        })
        .state('topics', {
            url : '/topics',
            templateUrl : 'views/topics.html',
            controller : 'topicController'
        })
        .state('questions', {
            url : '/topics/:id',
            templateUrl : 'views/questions.html',
            controller : 'questionsController'
        })
}])
