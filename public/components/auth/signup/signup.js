var app = angular.module("StreamFlowApp.Auth");

app.controller("SignupController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {
    $scope.passwordMessage = "";
    $scope.emailMessage = "";
    $scope.signup = function (user) {
        if ($scope.user.password !== $scope.passwordRepeat) {
            $scope.passwordMessage = "Passwords do not match.";
        } else {
            UserService.signup(user).then(function (response) {
                $location.path("/login");
            }, function (response) {
                console.log(response);
                $scope.emailMessage = response.data.message;
            });
        }
    }
}]);
