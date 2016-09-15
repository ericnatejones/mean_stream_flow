var app = angular.module("StreamFlowApp", ["ngRoute", "StreamFlowApp.Auth"]);

app.config(["$routeProvider", function($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "components/streams/streams.html",
            controller: "StreamListController"
        });
}]);
