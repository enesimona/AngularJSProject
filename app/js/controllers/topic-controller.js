'use strict'
let ctrl = angular.module('topicControllersModule', ['ui.router'])

const SERVER = 'https://simona30-enesimona30.c9users.io'

ctrl.controller('topicController', ['$scope', '$http', '$state', function($scope, $http, $state) {

    let $constructor = () => {
        $http.get(SERVER + '/topics')
            .then((response) => {
                $scope.topics = response.data
            })
            .catch((error) => console.log(error))
    }

    $scope.addTopic = (topic) => {
        $http.post(SERVER + '/topics', topic)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.deleteTopic = (topic) => {
        $http.delete(SERVER + '/topics/' + topic.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $scope.selected = {}

    $scope.editTopic = (topic) => {
        $scope.selected = angular.copy(topic)
    }

    $scope.cancelEditing = () => {
        $scope.selected = {}
    }

    $scope.getTemplate = (topic) => {
        if (topic.id == $scope.selected.id) {
            return 'edit'
        }
        return 'display'
    }

    $scope.saveTopic = (topic) => {
        $http.put(SERVER + '/topics/' + topic.id, topic)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $constructor()
}])
