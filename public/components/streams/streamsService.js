var app = angular.module("StreamFlowApp");

app.service("StreamService", ["$http", function($http) {
    var self = this;
    this.streamList = [];

    this.getStreams = function() {
        return $http.get("/streams").then(function(response) {
            self.streamList = response.data;
            return response.data;
        });
    };

    this.addStream = function(newStreamId) {


        return $http.post("/streams", newStream).then(function(response) {
            self.streamList.push(response.data);
        });
    };

    this.deleteStream = function(stream, index) {
        return $http.delete("/streams/" + stream._id).then(function(response) {
            self.streamList.splice(index, 1);
        });
    };

    // this.updateStream = function(stream, index) {
    //     return $http.put("/streams/" + stream._id, stream).then(function(response) {
    //         self.streamList[index] = response.data;
    //     });
    // };

}]);
