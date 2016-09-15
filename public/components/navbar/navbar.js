var app = angular.module("StreamFlowApp");

app.directive("navbar", ["UserService", function(UserService) {
    return {
        templateUrl: "components/navbar/navbar.html",
        link: function(scope) {
            scope.isAuthenticated = UserService.isAuthenticated;
        }
    }

}]);
