var app = angular.module("StreamFlowApp.Auth");

app.controller("LoginController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {

    $scope.login = function (user) {
        UserService.login(user).then(function (response) {
            $location.path("/");
        }, function (response) {
            alert(response.data.message);
        });
    };
}]);
