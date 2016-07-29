angular
	.module('editeqMin')
	.controller('editeqMinController', editeqMinController);

function editeqMinController ($scope, $timeout, $q, $log, FetchService) {
    


    $scope.job = {};

  $scope.selectedEquityChange = selectedEquityChange;


  //
  init();

  function init() {
    FetchService.loadEquity()
    .then(function(data){
      var equityStack = data.map(function(equity){
        return { value: equity.display.toLowerCase(), display: equity.display }
      });
      $scope.EquityStack = [].concat(equityStack);
    });
  }

  function selectedEquityChange(equity) { 
    if(equity!== undefined) {
      $scope.job.equityMin = equity.display;
    
    }
   
    
  }
  }