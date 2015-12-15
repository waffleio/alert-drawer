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

angular.module('alertDrawer').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('alert-drawer.html',
    "<div class=\"alert-drawer {{type}}\" ng-class=\"{slide: message}\">\n" +
    "    <div class=\"message\">\n" +
    "        <i class=\"fa fa-spinner\" ng-show=\"type == 'processing'\"/>\n" +
    "        <i class=\"fa fa-check\" ng-show=\"type == 'success'\"/>\n" +
    "        <i class=\"fa fa-bolt\" ng-show=\"type == 'info'\"/>\n" +
    "        <i class=\"fa fa-exclamation-triangle js-danger\" ng-show=\"type == 'danger'\"/>\n" +
    "        <i class=\"fa fa-exclamation-triangle js-warning\" ng-show=\"type == 'warning'\"/>\n" +
    "        <span ng-bind-html=\"message\"></span>\n" +
    "    </div>\n" +
    "    <a class=\"dismiss\" href=\"#\" ng-click=\"dismissAlert()\"></a>\n" +
    "</div>\n"
  );

}]);
