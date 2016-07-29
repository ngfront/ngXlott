angular
.module('editctcMin')
.controller('editctcMinController', editctcMinController);

function editctcMinController ($scope,$timeout, $q, $log, $http, FetchService) {
 


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
    
    console.log('package got', package);
   

if( package!== undefined ) { 

  $scope.job.ctcMin = package.display;
  console.log('$scope.job.ctcMin', $scope.job.ctcMin);
}
 
  }



}
