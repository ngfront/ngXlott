angular
.module('editlocationSelectionComponent')
.controller('editlocationSelectionController', editlocationSelectionController);

function editlocationSelectionController ($scope, $timeout, $q, $log, FetchService) {
  //var $scope = this;

  //$scope.job = {};

console.log('sdfcdsfchdsvajhcvsadhjcvsajhdavdhsavdaksjvdk', $scope.ej.editjob);

  //$scope.locations = loadLocations();
  $scope.selectedLocationChange = selectedLocationChange;
  //$scope.searchLocationChange = searchLocationChange;


  //
  init();

  function init() {
      FetchService.loadLocations()
        .then(function(data){
          var allStates = data.map(function(location){
            return {
              value: location.display.toLowerCase(),
              display: location.display
            }
          });
          $scope.locations = [].concat(allStates);
        });
  }
 
function selectedLocationChange(location) { 
  console.log(location);
  if(location!==null) {
    $scope.job.location = location.display; 
  console.log('Location Selected', $scope.job.location); 
  }
  
}
// function searchLocationChange(newlocation) { 
//   $log.info('Location changed to ' + newlocation); 
// }




  }