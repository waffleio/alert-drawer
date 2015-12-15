angular.module('example', ['alertDrawer']);

angular.module('example')
.controller('ExampleController', function($rootScope) {
    var example = this;

    example.showSuccessAlert = function() {
      $rootScope.$emit('alert.success', "We're doing some work here!");
    };

    example.showInfoAlert = function() {
      $rootScope.$emit('alert.info', "We're doing some work here!");
    };

    example.showProcessingAlert = function() {
      $rootScope.$emit('alert.processing', "We're doing some work here!");
    };

    example.showDangerAlert = function() {
      $rootScope.$emit('alert.danger', "We're doing some work here!");
    };

    example.showWarningAlert = function() {
      $rootScope.$emit('alert.warning', "We're doing some work here!");
    };

    example.dismissAlerts = function() {
      $rootScope.$emit('alert.dismiss');
    };

  });
