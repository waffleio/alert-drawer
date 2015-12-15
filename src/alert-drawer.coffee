angular.module 'alertDrawer', ['ngSanitize']
.directive 'alertDrawer', [
  '$rootScope'
  '$timeout'

  ($rootScope, $timeout) ->
    restrict: 'E'
    replace: true
    templateUrl: 'alert-drawer.html'
    scope: {}

    link: ($scope, element, attrs) ->
      promise = null

      showAlert = (type, message, {keepAround}={}) ->
        $scope.type = type
        $scope.message = message

        $timeout.cancel promise if promise

        unless keepAround
          promise = $timeout $scope.dismissAlert, 5000

      $scope.dismissAlert = ->
        $timeout.cancel promise if promise
        promise = null
        delete $scope.message

      unbindFns = []
      unbindFns.push $rootScope.$on('alert.success', (scope, message, options) -> showAlert 'success', message, options)
      unbindFns.push $rootScope.$on('alert.info', (scope, message, options) -> showAlert 'info', message, options)
      unbindFns.push $rootScope.$on('alert.processing', (scope, message, options) -> showAlert 'processing', message, options)
      unbindFns.push $rootScope.$on('alert.danger', (scope, message, options) -> showAlert 'danger', message, options)
      unbindFns.push $rootScope.$on('alert.warning', (scope, message, options) -> showAlert 'warning', message, options)
      unbindFns.push $rootScope.$on('alert.dismiss', $scope.dismissAlert)
      $scope.$on '$destroy', ->
        unbindFns.forEach (fn) -> fn()

      $rootScope.$emit 'alert-drawer-ready'
]
