angular
.module('locationSelectionComponent')
.controller('locationSelectionController', locationSelectionController);

function locationSelectionController ($scope, $timeout, $q, $log, FetchService) {
  var self = this;

  // self.locations = loadLocations();
  self.selectedLocationChange = selectedLocationChange;
  self.searchLocationChange = searchLocationChange;


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
          self.locations = [].concat(allStates);
        });
  }
 

function selectedLocationChange(location) { self.job.location = location.display; $log.info('Location Selected', self.job.location); }
function searchLocationChange(newlocation) { $log.info('Location changed to ' + newlocation); }




  }