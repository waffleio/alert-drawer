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
