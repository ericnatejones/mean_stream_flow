var app = angular.module("StreamFlowApp.Auth", []);

app.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
        .when("/signup", {
            templateUrl: "components/auth/signup/signup.html",
            controller: "SignupController"
        })
        .when("/login", {
            templateUrl: "components/auth/login/login.html",
            controller: "LoginController"
        })
        .when("/logout", {
            template: "",
            controller: "LogoutController"
        })
}]);


app.service("UserAndTokenService", [function () {
    var userToken = "token";

    this.saveUser = function (token, userObj) {
        localStorage[userToken] = token;
        localStorage["user"] = userObj;
    };

    this.getToken = function () {
        return localStorage[userToken];
    };

    this.getUser = function () {
      return localStorage[user]
    }

    this.removeUser = function () {
        localStorage.removeItem(userToken);
        localStorage.removeItem("user");
    };
}]);


app.service("UserService", ["$http", "UserAndTokenService", "$location", function ($http, UserAndTokenService, $location) {

    this.signup = function (user) {
        return $http.post("/users/signup", user);
    };

    this.login = function (userCreds) {
        return $http.post("/users/login", userCreds).then(function (response) {
            UserAndTokenService.saveUser(response.data.token, response.data.user);
            $location.path("/my-streams");
            return response;
        });
    };

    this.logout = function () {
        UserAndTokenService.removeUser();
    };

    this.isAuthenticated = function() {
        return !!UserAndTokenService.getToken();
    };
}]);


app.service("AuthInterceptor", ["$q", "$location", "UserAndTokenService", function ($q, $location, UserAndTokenService) {
    this.request = function (config) {
        var token = UserAndTokenService.getToken();

        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    };

    this.responseError = function (response) {
        if (response.status === 401) {
            UserAndTokenService.removeUser();
            $location.path("/login");
        }
        return $q.reject(response);
    };
}]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
}]);
