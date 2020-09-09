angular.module('topicControllersModule')
  .controller('questionsController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    const SERVER = 'https://simona30-enesimona30.c9users.io'

    let $constructor = () => {
      $http.get(SERVER + '/topics/' + $stateParams.id)
        .then((response) => {
          $scope.topic = response.data
          return $http.get(SERVER + '/topics/' + $stateParams.id + '/questions')
        })
        .then((response) => {
          $scope.questions = response.data
        })
         .catch((error) => console.log(error))
    }

    $scope.addQuestion = (question) => {
      $http.post(SERVER + '/topics/' + $stateParams.id + '/questions', question)
        .then((response) => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    }

    $scope.deleteQuestion = (question) => {
      $http.delete(SERVER + '/topics/' + $stateParams.id + '/questions/' + question.id)
        .then((response) => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    }

    $scope.selected = {}

    $scope.editQuestion = (question) => {
      $scope.selected = angular.copy(question)
    }

    $scope.cancelEditing = () => {
      $scope.selected = {}
    }

    $scope.getTemplate = (question) => {
      if (question.id == $scope.selected.id) {
        return 'edit'
      }
      return 'display'
    }

    $scope.saveQuestion = (question) => {
      $http.put(SERVER + '/topics/' + $stateParams.id + '/questions/' + question.id, question)
        .then((response) => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    }

    $constructor()
  }])
