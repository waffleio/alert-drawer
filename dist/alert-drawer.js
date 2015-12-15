(function() {
  angular.module('alertDrawer', ['ngSanitize']).directive('alertDrawer', [
    '$rootScope', '$timeout', function($rootScope, $timeout) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'alert-drawer.html',
        scope: {},
        link: function($scope, element, attrs) {
          var promise, showAlert, unbindFns;
          promise = null;
          showAlert = function(type, message, arg) {
            var keepAround;
            keepAround = (arg != null ? arg : {}).keepAround;
            $scope.type = type;
            $scope.message = message;
            if (promise) {
              $timeout.cancel(promise);
            }
            if (!keepAround) {
              return promise = $timeout($scope.dismissAlert, 5000);
            }
          };
          $scope.dismissAlert = function() {
            if (promise) {
              $timeout.cancel(promise);
            }
            promise = null;
            return delete $scope.message;
          };
          unbindFns = [];
          unbindFns.push($rootScope.$on('alert.success', function(scope, message, options) {
            return showAlert('success', message, options);
          }));
          unbindFns.push($rootScope.$on('alert.info', function(scope, message, options) {
            return showAlert('info', message, options);
          }));
          unbindFns.push($rootScope.$on('alert.processing', function(scope, message, options) {
            return showAlert('processing', message, options);
          }));
          unbindFns.push($rootScope.$on('alert.danger', function(scope, message, options) {
            return showAlert('danger', message, options);
          }));
          unbindFns.push($rootScope.$on('alert.warning', function(scope, message, options) {
            return showAlert('warning', message, options);
          }));
          unbindFns.push($rootScope.$on('alert.dismiss', $scope.dismissAlert));
          $scope.$on('$destroy', function() {
            return unbindFns.forEach(function(fn) {
              return fn();
            });
          });
          return $rootScope.$emit('alert-drawer-ready');
        }
      };
    }
  ]);

}).call(this);
