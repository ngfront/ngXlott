angular
	.module('editctcMax')
	.controller('editctcMaxController', editctcMaxController);

function editctcMaxController ($scope, $timeout, $q, $log, $http, FetchService) {




  $scope.selectedCtcChange = selectedCtcChange;


  //
  init();

  function init() {
    FetchService.loadCTC()
    .then(function(data){
      var ctcStack = data.map(function(ctc){
        return { value: ctc.display.toLowerCase(), display: ctc.display }
      });
      $scope.ctcStack = [].concat(ctcStack);
    });
  }

  function selectedCtcChange(package) { 
    // $scope.job.ctc = {};
    if( package!== undefined ) {
    //$scope.job.ctc = { max : '' };
    $scope.job.ctcMax = package.display;
    console.log('Selected Ctc Max', $scope.job.ctcMax);
    }
    
  }


   
  }











    