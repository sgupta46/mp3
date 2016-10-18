/* Sample Controller */

app.controller('listController', ['$scope', '$http', function($scope, $http) {
      $http.get('data/imdb250.json').success(function(data) {
          $scope.movieDat = data;
      }).error(function (error) {
          console.log(error);
      })
      $scope.sortUpDown = "+";
      $scope.sortBy = "title";
      $scope.sortOrder = $scope.sortUpDown + $scope.sortBy;
      $scope.sort = function() {
        $scope.sortOrder = $scope.sortUpDown + $scope.sortBy;
      }
    }
]);

app.controller('galleryController', ['$scope', '$http', function($scope, $http) {
    $http.get('data/imdb250.json').success(function(data) {
          $scope.movieDat = data;
          var sorted = $.unique($.map($scope.movieDat.map(function(d) {return d.genre}), function(c) {return c}));
          $scope.genres = $.map(['All', sorted], function(c) {return c});
    }).error(function (error) {
        console.log(error);
    });
    var selected = 0;
    $scope.filterGenre = '';
    $scope.changeGenre = function(x) {
            if (x === 'All'){
              $scope.filterGenre = ''
            }else if(selected == 1){
              $scope.filterGenre = '';
              selected = 0;
            }else{
              selected = 1;
              $scope.filterGenre = x;
            }
    }
}]);

app.controller('detailsController', ['$scope', '$http', '$routeParams', '$filter', '$location', function($scope, $http, $routeParams, $filter, $location) {
      $scope.imdbID = $routeParams.imdbID;
      $http.get('data/imdb250.json').success(function(data) {
              $scope.movieDat = data;
              $scope.movie = $filter('filter')($scope.movieDat, { imdbID : $scope.imdbID});

              var next, prev;
              if($scope.movie[0].rank < 250) {
                next = $scope.movie[0].rank + 1
              }else next = 250;
              if($scope.movie[0].rank > 1) {
                prev = $scope.movie[0].rank -1
              }else prev = 250;

              $scope.next = $filter('filter')($scope.movieDat, { rank : next});
              $scope.prev = $filter('filter')($scope.movieDat, { rank : prev});
      }).error(function (error) {
          console.log(error);
      });
}]);
