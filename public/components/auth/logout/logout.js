var app = angular.module("StreamFlowApp.Auth");

app.controller("LogoutController", ["$location", "UserService", function($location, UserService) {
    UserService.logout();
    $location.path("/login");
}]);
