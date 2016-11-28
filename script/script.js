var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
      $scope.uploadFile = function(file) {
            file.upload = Upload.upload({
                  url: 'upload',
                  method: 'POST',
                  data: {
                        username: $scope.username,
                        upfilename: $('#upfilename').val(),
                        uploadfile: file
                  },
            });

            file.upload.then(function (response) {
                  if (response.data.status) {
                        $scope.downloadUrl = response.data.downloadUrl;
                  }
                  $timeout(function () {
                        file.result = response.data.status;
                  });},
                  function (response) {
                        if (response.status > 0)
                              $scope.errorMsg = response.status + ': ' + response.message;
                  },
                  function (evt) {
                         // Math.min is to fix IE which reports 200% sometimes
                         file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                   });
             }
      }]
);
