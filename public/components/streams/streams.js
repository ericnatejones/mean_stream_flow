var app = angular.module("StreamFlowApp");

app.controller("StreamListController", ["$scope", "StreamService", function ($scope, StreamService) {
    $scope.StreamService = StreamService;
    $scope.editing = false;
    //    $scope.StreamList = StreamService.StreamList;

    StreamService.getStreams();

    $scope.addStream = function (newStream) {
        StreamService.addStream(newStream);
    }

    $scope.deleteStream = function (stream, index) {
        StreamService.deleteStream(stream, index)
    }

    // $scope.updateStream = function (stream, index) {
    //     StreamService.updateStream(stream, index).then(function() {
    //         stream.editing = false;
    //     });
    // }
}]);
