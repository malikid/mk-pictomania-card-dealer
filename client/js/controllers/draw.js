angular
  .module('app')
  .controller('DrawController', ['$scope', '$state', 'Round', function($scope,
      $state, Round) {
    $scope.gifs = Gifffer({
      playButtonStyles: {
        'display': 'none'
      }
    });
    $scope.loading = false;
    $scope.data = {
      lot: '☟',
      error: '',
      code: ''
    };
    $scope.submit = () => {
      $scope.gifs[0].click();
      $scope.loading = true;
      $scope.reset();
      setTimeout(() => {
        Round.draw({roundId: $scope.data.code})
        .$promise
          .then(data => {
            $scope.data.lot = data.result;
            $scope.data.error = $scope.data.lot ? '' : 'ERR';
          })
          .catch(response => {
            $scope.data.error = 'ERR';
            $scope.data.lot = '';
          })
          .finally(() => {
            $scope.gifs[0].click();
            $scope.loading = false;
          });
      }, 4000);
    };
    $scope.reset = () => {
      $scope.data.lot = '　';
      $scope.data.error = '';
    };
  }]);